import { create } from "zustand";

interface OfferWorkState {
  files: File[];
  activeTopButton: "individual" | "business" | null;
  activeBottomButton: "step_by_step" | "prepayment" | "postpayment" | null;
  priceFrom: string;
  currency: "UZS" | "USD";
  workTitle: string;
  selectedCategory: number | null;
  definition: string;
  contactPerson: string;
  phone: string;
  location: string;
  locationLat: number | null;
  locationLng: number | null;
  isPublic: boolean;
  agreedToTerms: boolean;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;

  setFiles: (files: File[]) => void;
  setActiveTopButton: (value: "individual" | "business" | null) => void;
  setActiveBottomButton: (value: "step_by_step" | "prepayment" | "postpayment" | null) => void;
  setPriceFrom: (value: string) => void;
  setCurrency: (value: "UZS" | "USD") => void;
  setWorkTitle: (value: string) => void;
  setSelectedCategory: (id: number) => void;
  setDefinition: (value: string) => void;
  setContactPerson: (value: string) => void;
  setPhone: (value: string) => void;
  setLocation: (value: string) => void;
  setDateFrom: (date: Date | undefined) => void;
  setDateTo: (date: Date | undefined) => void;
  setLocationLat: (value: number) => void;
  setLocationLng: (value: number) => void;
  setIsPublic: (value: boolean) => void;
  setAgreedToTerms: (value: boolean) => void;
  reset: () => void;
}

export const useOfferWorkStore = create<OfferWorkState>((set) => ({
  files: [],
  activeTopButton: null,
  activeBottomButton: null,
  priceFrom: "",
  currency: "UZS",
  workTitle: "",
  selectedCategory: null,
  definition: "",
  contactPerson: "",
  phone: "",
  location: "",
  locationLat: null,
  locationLng: null,
  isPublic: true,
  agreedToTerms: true,
  dateFrom: undefined,
  dateTo: undefined,

  setFiles: (files) => set({ files }),
  setActiveTopButton: (value) => set({ activeTopButton: value }),
  setActiveBottomButton: (value) => set({ activeBottomButton: value }),
  setPriceFrom: (value) => set({ priceFrom: value }),
  setCurrency: (value) => set({ currency: value }),
  setWorkTitle: (value) => set({ workTitle: value }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setDefinition: (value) => set({ definition: value }),
  setContactPerson: (value) => set({ contactPerson: value }),
  setPhone: (value) => set({ phone: value }),
  setLocation: (value) => set({ location: value }),
  setDateFrom: (date) => set({ dateFrom: date }),
  setDateTo: (date) => set({ dateTo: date }),
  setLocationLat: (value) => set({ locationLat: value }),
  setLocationLng: (value) => set({ locationLng: value }),
  setIsPublic: (value) => set({ isPublic: value }),
  setAgreedToTerms: (value) => set({ agreedToTerms: value }),
  reset: () =>
    set({
      files: [],
      activeTopButton: null,
      activeBottomButton: null,
      priceFrom: "",
      currency: "UZS",
      workTitle: "",
      selectedCategory: null,
      definition: "",
      contactPerson: "",
      phone: "",
      location: "",
      locationLat: null,
      locationLng: null,
      isPublic: true,
      agreedToTerms: true,
      dateFrom: undefined,
      dateTo: undefined,
    }),
}));
