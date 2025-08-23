import React from "react";
import { Title } from "./Title/Title";
import { DetailsPage } from "./PersonalDetails/Details";
import ActivityPage from "./ServiceActivity/Activity";
import { MobileBackTab } from "./Title/MobileTabBar";
import axios from "axios";
import { cookies } from "next/headers";

const Categories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/category/search/`
  );
  return res.data.results;
};

const ExperienceLevels = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/experience-levels/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.experience_levels;
};

const Tags = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/tags/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.results;
};

const Countries = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/locations/countries/`
  );
  return res.data.results;
};

export const ChangeData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const catalogs = await Categories();
  const experience = await ExperienceLevels();
  const tags = await Tags();
  const countries = await Countries();
  

  return (
    <div>
      <Title className="px-2" />
      <MobileBackTab />
      <div className="px-2">
        <DetailsPage token={token}/>
        <ActivityPage
          catalogs={catalogs.map((c: any) => ({ label: c.name, value: c.id }))} // id
          experience={experience.map((e: any) => ({ label: e.name, value: e.id }))} // id
          tags={tags.map((t: any) => ({ label: t.name, value: t.id }))} // id
          countries={countries.map((c: any) => ({ label: c.name, value: c.osm_id }))} // osm_id
          token={token}
        />
      </div>
    </div>
  );
};
