import { create } from "zustand";

interface ServiceActivity {
  category_id: number | null;
  exp_level_id: number | null;
  country_id: number | null;
  region_id: number | null;
  district_id: number | null;
  price: number | null;
  tag_ids: number[];
}

interface ChangeDataState {
  first_name: string;
  last_name: string;
  father_name: string;
  passport_number: string;
  birth_date: string; // YYYY-MM-DD format
  about: string;
  phone_number: string;
  service_activity: ServiceActivity;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setFatherName: (value: string) => void;
  setPassportNumber: (value: string) => void;
  setBirthDate: (value: string) => void;
  setAbout: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setServiceActivity: (field: keyof ServiceActivity, value: any) => void;
  reset: () => void;
}

export const useChangeDataStore = create<ChangeDataState>((set) => ({
  first_name: "",
  last_name: "",
  father_name: "",
  passport_number: "",
  birth_date: "",
  about: "",
  phone_number: "",
  service_activity: {
    category_id: null,
    exp_level_id: null,
    country_id: null,
    region_id: null,
    district_id: null,
    price: null,
    tag_ids: [],
  },

  setFirstName: (value) => set({ first_name: value }),
  setLastName: (value) => set({ last_name: value }),
  setFatherName: (value) => set({ father_name: value }),
  setPassportNumber: (value) => set({ passport_number: value }),
  setBirthDate: (value) => set({ birth_date: value }),
  setAbout: (value) => set({ about: value }),
  setPhoneNumber: (value) => set({ phone_number: value }),
  setServiceActivity: (field, value) =>
    set((state) => ({
      service_activity: {
        ...state.service_activity,
        [field]: value,
      },
    })),
  reset: () =>
    set({
      first_name: "",
      last_name: "",
      father_name: "",
      passport_number: "",
      birth_date: "",
      about: "",
      phone_number: "",
      service_activity: {
        category_id: null,
        exp_level_id: null,
        country_id: null,
        region_id: null,
        district_id: null,
        price: null,
        tag_ids: [],
      },
    }),
}));