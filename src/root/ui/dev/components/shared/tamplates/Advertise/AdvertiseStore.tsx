// AdvertiseStore.ts
import { create } from 'zustand';

interface AdvertiseState {
  workTitle: string;
  setWorkTitle: (title: string) => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  description: string;
  setDescription: (description: string) => void;
  contactName: string;
  setContactName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  location: string;
  setLocation: (location: string) => void;
  pictures: File[];
  setPictures: (pictures: File[]) => void;
  clientType: 'individual' | 'business' | null;
  setClientType: (type: 'individual' | 'business' | null) => void;
  paymentType: 'step_by_step' | 'prepayment' | 'postpayment' | null;
  setPaymentType: (type: 'step_by_step' | 'prepayment' | 'postpayment' | null) => void;
  price: string;
  setPrice: (price: string) => void;
  currency: 'UZS' | 'USD';
  setCurrency: (currency: 'UZS' | 'USD') => void;
  reset?: () => void; // Optional reset function
}

export const useAdvertiseStore = create<AdvertiseState>((set) => ({
  workTitle: '',
  setWorkTitle: (title) => set({ workTitle: title }),
  dateFrom: undefined,
  setDateFrom: (date) => set({ dateFrom: date }),
  dateTo: undefined,
  setDateTo: (date) => set({ dateTo: date }),
  selectedCategory: null,
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  description: '',
  setDescription: (description) => set({ description }),
  contactName: '',
  setContactName: (name) => set({ contactName: name }),
  phone: '',
  setPhone: (phone) => set({ phone }),
  location: '',
  setLocation: (location) => set({ location }),
  pictures: [],
  setPictures: (pictures) => set({ pictures }),
  clientType: null,
  setClientType: (type) => set({ clientType: type }),
  paymentType: null,
  setPaymentType: (type) => set({ paymentType: type }),
  price: '',
  setPrice: (price) => set({ price }),
  currency: 'UZS',
  setCurrency: (currency) => set({ currency }),
  reset: () =>
    set({
      workTitle: '',
      dateFrom: undefined,
      dateTo: undefined,
      selectedCategory: null,
      description: '',
      contactName: '',
      phone: '',
      location: '',
      pictures: [],
      clientType: null,
      paymentType: null,
      price: '',
      currency: 'UZS',
    }),
}));