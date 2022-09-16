import api from "../../apiService.js";
// import { fetchBooks } from "./bookAPI";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//step 1: import createAsyncThunk
const initialValue = {
  status: "",
  pageNum: "number",
  // pageNum: "ilde",
  totalPage: 10,
  books: [],
  singleBook:"",
  savedBooks: [],
  query: "null",
  loading: "false",
  errorMessage:"null",
  // addingBook: "",
  // removedBookId: "",
  limit: 10,
};


export const addThisToReadingList = createAsyncThunk(
  "books/addThisToReadingList",
  async (addingBook) => {
    const response = await api.post(`/favorites`, addingBook);
    return response.data;
  }
);

export const removeThisBook = createAsyncThunk(
  "books/removeThisBook",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialValue,

  reducers: {
    setBooksTo: (state, action) => {
      state.books = action.payload;
      state.errorMessage = "";
    },
    setSingleBookTo: (state, action) => {
      state.singleBook = action.payload;
      state.errorMessage = "";
    },

    setErrorMessageTo: (state, action) => {
      state.ErrorMessage = action.payload;
    },

    setLoadingTo: (state, action) => {
      state.loading = action.payload;
    },

    setQueryTo: (state, action) => {
      state.query = action.payload;
    },

    setPageNumTo: (state, action) => {
      state.pageNum = action.payload;
    },

    extraReducers: (builder) => {
      builder
        .addCase(addThisToReadingList.pending, (state) => {
          state.status = "loading";
          state.loading = "true";
        })
        .addCase(addThisToReadingList.fulfilled, (state, action) => {
          toast.success("The book has been added to the reading list!");
          state.status = "null";
        })
        .addCase(addThisToReadingList.rejected, (state, action) => {
          toast.error(action.error.message);
          state.status = "failed";
        })

        .addCase(removeThisBook.pending, (state) => {
          state.loading = "true";
          state.status = "loading";
        })
        .addCase(removeThisBook.fulfilled, (state, action) => {
          toast.success("The book has been removed");
          state.status = null;
        })
        .addCase(removeThisBook.rejected, (state, action) => {
          toast.error(action.error.message);
          state.loading = "true";
          state.status = "failed";
        });

      //   },

      //khi dung createAsycThunk thi savedbook functioned bi xoa di
      //state.savedBook = action.payload
      //}
      //setAddingBook: (state,action) => {
      //state.addingBook = action.payload
      //}
      //setRemovedBookIdTo: (state,action) => {
      //state.removeBookId = action.payload
    },
  },
});
// const {actions} = createSlice
export default booksSlice.reducer;
export const {setBooksTo,setSingleBookTo, setErrorMessageTo, setLoadingTo,setPageNumTo,setQueryTo} = booksSlice.actions
