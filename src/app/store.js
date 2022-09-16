//import combineReducer, configureStore
//import bookSlideReducer
import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import bookSliceReducer  from "../service/books/slice.js";


export const store = configureStore({
  reducer: {
    books: bookSliceReducer,
  },
});