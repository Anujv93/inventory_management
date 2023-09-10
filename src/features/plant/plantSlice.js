import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "plant",
  storage,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState: {
    plant: null,
  },
  reducers: {
    updatePlant: (state, action) => {
      state.plant = action.payload;
    },
  },
});

export const { updatePlant } = plantSlice.actions;

export const selectPlant = (state) => state.plant.plant;

const persistedPlantReducer = persistReducer(persistConfig, plantSlice.reducer);

export default persistedPlantReducer;
