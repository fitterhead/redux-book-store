import { configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "../service/books/slice.js";

const rootReducer = {
  books: bookSliceReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
