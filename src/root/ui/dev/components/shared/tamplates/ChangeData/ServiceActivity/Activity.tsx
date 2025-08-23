"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import FilterBar from "../PersonalDetails/FilterBar/FilterBar";
import axios from "axios";
import { useChangeDataStore } from "../ChangeDataStore";
import Cookies from "js-cookie"; // ✅ qo‘shildi

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  catalogs: Option[];
  experience: Option[];
  tags: Option[];
  countries: Option[];
  token: string | any;
}

export default function ActivityPage({
  catalogs,
  experience,
  tags,
  countries,
  token,
}: Props) {
  const t = useTranslations("");
  const router = useRouter();
  const [regions, setRegions] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const {
    setServiceActivity,
    first_name,
    last_name,
    father_name,
    passport_number,
    birth_date,
    about,
    phone_number,
    setFirstName,
    setLastName,
    setFatherName,
    setPassportNumber,
    setBirthDate,
    setAbout,
    setPhoneNumber,
    service_activity,
  } = useChangeDataStore();

  console.log("📌 Initial props (from ChangeData.tsx):", {
    catalogs,
    experience,
    tags,
    countries,
    token,
  });

  // Fetch master/me data on component mount
  useEffect(() => {
    const fetchMasterData = async () => {
      if (!token) {
        console.log("❌ No token provided");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.results;

        console.log("📌 Fetched master/me data:", data);

        // Populate store with master/me data
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setFatherName(data.father_name || "");
        setPassportNumber(data.passport_number || "");
        setBirthDate(data.birth_date || "");
        setAbout(data.about || "");
        const phone = data.phone_number || "";
        setPhoneNumber(phone.startsWith("+") ? phone : `+${phone}`);

        // Populate activity data if available
        if (data.activity) {
          setServiceActivity("category_id", data.activity.category?.id || null);
          setServiceActivity("exp_level_id", data.activity.experience?.id || null);
          setServiceActivity(
            "tag_ids",
            data.activity.tags?.map((tag: any) => tag.id) || []
          );
          setServiceActivity("country_id", data.activity.country?.osm_id || null);
          setServiceActivity("region_id", data.activity.region?.osm_id || null);
          setServiceActivity("district_id", data.activity.district?.osm_id || null);

          if (data.activity.country?.osm_id) {
            await handleCountrySelect(data.activity.country.osm_id);
          }
          if (data.activity.region?.osm_id) {
            await handleRegionSelect(data.activity.region.osm_id);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching master/me:", err);
      }
    };

    fetchMasterData();
  }, [
    token,
    setFirstName,
    setLastName,
    setFatherName,
    setPassportNumber,
    setBirthDate,
    setAbout,
    setPhoneNumber,
    setServiceActivity,
  ]);

  // Handle country selection to fetch regions
  const handleCountrySelect = async (osm_id: number) => {
    console.log("🌍 Country selected osm_id:", osm_id);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/locations/regions/?parent_osm_id=${osm_id}`
      );
      const mappedRegions = res.data.results.map((r: any) => ({
        label: r.name,
        value: r.osm_id,
      }));
      console.log("📌 Regions fetched:", mappedRegions);

      setRegions(mappedRegions);
      setDistricts([]);
    } catch (err) {
      console.error("❌ Error fetching regions:", err);
    }
  };

  // Handle region selection to fetch districts
  const handleRegionSelect = async (osm_id: number) => {
    console.log("🏙️ Region selected osm_id:", osm_id);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/locations/districts/?parent_osm_id=${osm_id}`
      );
      const mappedDistricts = res.data.results.map((d: any) => ({
        label: d.name,
        value: d.osm_id,
      }));
      console.log("📌 Districts fetched:", mappedDistricts);

      setDistricts(mappedDistricts);
    } catch (err) {
      console.error("❌ Error fetching districts:", err);
    }
  };

  // Handle save
  const handleSave = async () => {
    try {
      if (!token) {
        alert("❌ Token topilmadi. Iltimos, qayta login qiling.");
        return;
      }

      if (!service_activity.category_id || service_activity.category_id === 0) {
        alert("❌ Xizmat turi tanlanmagan!");
        return;
      }
      if (!service_activity.exp_level_id || service_activity.exp_level_id === 0) {
        alert("❌ Ish tajribasi tanlanmagan!");
        return;
      }
      if (!service_activity.country_id || service_activity.country_id === 0) {
        alert("❌ Mamlakat tanlanmagan!");
        return;
      }

      const payload = {
        first_name: first_name || "",
        last_name: last_name || "",
        father_name: father_name || "",
        passport_number: passport_number || "",
        birth_date: birth_date || "",
        about: about || "",
        service_activity: {
          category_id: service_activity.category_id,
          exp_level_id: service_activity.exp_level_id,
          country_id: service_activity.country_id,
          region_id: service_activity.region_id || null,
          district_id: service_activity.district_id || null,
          price: service_activity.price || 0,
          tag_ids: service_activity.tag_ids || [],
        },
      };

      console.log("🚀 Saving payload to API:", payload);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/register_master/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", res);

      if (res.status >= 200 && res.status < 300) {
        alert("✅ Ma'lumotlar saqlandi!");

        // ✅ Cookie-dan locale va region olish
        const locale = Cookies.get("locale") || "uz";
        const region = Cookies.get("region") || "tashkent";

        router.push(`/${locale}/${region}/myprofile`);
      }
    } catch (err: any) {
      console.error("❌ Error during save:", err);
      if (err.response) {
        console.error("❌ Error response:", err.response.data);
        alert(`❌ Saqlashda xatolik: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("❌ Saqlashda xatolik!");
      }
    }
  };

  return (
    <div className="mx-auto px-2 mb-6 space-y-4">
      <div className="bg-white p-6 rounded-xl mt-8 shadow-sm">
        <h1 className="text-2xl font-bold">
          {t("ChangeData.ServiceActivity.title")}
        </h1>

        <div className="grid mt-4 grid-cols-1 md:grid-cols-3 gap-4">
          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.serviceType")}
            options={catalogs}
            placeholder={t("ChangeData.ServiceActivity.Inputs.serviceTypeplaceholder")}
            onChange={(val) => {
              console.log("📌 Category selected:", val);
              setServiceActivity("category_id", Number(val));
            }}
          />

          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.workExperience")}
            options={experience}
            placeholder={t("ChangeData.ServiceActivity.Inputs.workExperienceplaceholder")}
            onChange={(val) => {
              console.log("📌 Experience selected:", val);
              setServiceActivity("exp_level_id", Number(val));
            }}
          />

          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.Tags")}
            options={tags}
            placeholder={t("ChangeData.ServiceActivity.Inputs.Tagsplaceholder")}
            onChange={(val) => {
              console.log("🏷️ Tag selected:", val);
              setServiceActivity("tag_ids", [Number(val)]);
            }}
          />

          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.Country")}
            options={countries}
            placeholder={t("ChangeData.ServiceActivity.Inputs.Countryplaceholder")}
            onChange={(val: number) => {
              console.log("🌍 Country selected:", val);
              handleCountrySelect(val);
              setServiceActivity("country_id", val);
            }}
          />

          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.region")}
            options={regions}
            placeholder={t("ChangeData.ServiceActivity.Inputs.regionplaceholder")}
            onChange={(val: number) => {
              console.log("🏙️ Region selected:", val);
              handleRegionSelect(val);
              setServiceActivity("region_id", val);
            }}
          />

          <FilterBar
            label={t("ChangeData.ServiceActivity.Inputs.District")}
            options={districts}
            placeholder={t("ChangeData.ServiceActivity.Inputs.Districtplaceholder")}
            onChange={(val: number) => {
              console.log("📍 District selected:", val);
              setServiceActivity("district_id", val);
            }}
          />
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-center rounded-xl bg-white sm:justify-end gap-4 py-4 px-6 mt-6">
            <button
              className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer"
              onClick={() => window.history.back()}
            >
              {t("ChangeData.ServiceActivity.Btn.cancelbtn")}
            </button>

            <button
              className="w-full sm:w-auto py-[12px] px-[52px] bg-[#001D55] text-white rounded-[16px] cursor-pointer"
              onClick={handleSave}
            >
              {t("ChangeData.ServiceActivity.Btn.savebtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
