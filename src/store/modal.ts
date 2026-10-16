"use client";

import { create } from "zustand";
import type { Service } from "@/lib/i18n";

type ModalState = {
  open: boolean;
  service: Service | null;
  selIdx: number;
  openModal: (s: Service) => void;
  closeModal: () => void;
  setSelIdx: (i: number) => void;
};

export const useServiceModal = create<ModalState>((set) => ({
  open: false,
  service: null,
  selIdx: 0,
  openModal: (s) => set({ open: true, service: s, selIdx: 0 }),
  closeModal: () => set({ open: false }),
  setSelIdx: (i) => set({ selIdx: i }),
}));
