import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ExpenseImage = {
  name: string;
  url?: string;
  file?: File;
};

type State = {
  images: ExpenseImage[];
};

type Actions = {
  addImages: (files: File[]) => void;
  removeImage: (name: string) => void;
  clearImages: () => void;
  reset: () => void;
};

const initialState: State = {
  images: [],
};

const useExpenseImagesStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,
    addImages: (files) =>
      set((state) => {
        state.images.push(...files.map((file) => ({ name: file.name, file })));

        // 중복 제거
        state.images = state.images.filter(
          (img: ExpenseImage, index: number, self: ExpenseImage[]) =>
            index === self.findIndex((t) => t.name === img.name)
        );
      }),
    removeImage: (name) =>
      set((state) => {
        state.images = state.images.filter(
          (img: ExpenseImage) => img.name !== name
        );
      }),
    clearImages: () =>
      set((state) => {
        state.images = [];
      }),
    reset: () => set(initialState),
  }))
);

export default useExpenseImagesStore;
