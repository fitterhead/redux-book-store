import api from "../../apiService.js";
// import { fetchBooks } from "./bookAPI";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//step 1: import createAsyncThunk
import { fetchBooks } from "./bookAPI.js";
const initialState = {
  status: "",
  pageNum: 1,
  // pageNum: "ilde",
  totalPage: 10,
  books: [],
  singleBook: "",
  savedBooks: [],
  query: null,
  // loading: "false",
  // errorMessage: "",
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

export const setBooksTo = createAsyncThunk(
  "books/setBooksTo",
  async (pageNum, limit, query) => {
    const response = await fetchBooks(pageNum, limit, query);
    console.log(response.data, "returnedData");
    return response.data;
  }
);
// export const setBooksTo = createAsyncThunk(
//   "books/setBooksTo",
//   async (pageNum, limit, query) => {
//     let url = `/books?_page=${pageNum}&_limit=${limit}`;
//     if (query) url += `&q=${query}`;
//     const response = await api.get(url);
//     console.log(response.data, "aaaaaa");
//     return response.data;
//   }
// );

// setBooksTo: (state, action) => {
//   state.books = action.payload;
//   state.errorMessage = "";
// },

export const removeThisBook = createAsyncThunk(
  "books/removeThisBook",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
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
        .addCase(setBooksTo.fulfilled, (state, action) => {
          // toast.success("The book has been removed");
          state.status = "working";
          console.log(action.payload, "inside Settbooks");
          state.books = action.payload;
          // state.books.push(action.payload)
          state.errorMessage = "got book";
        })
        .addCase(setBooksTo.pending, (state) => {
          // state.loading = "true";
          // state.status = "loading";
          state.errorMessage = "getting books";
        })
        .addCase(setBooksTo.rejected, (state, action) => {
          toast.error(action.error.message);
          state.loading = "false";
          // state.status = "failed";
          state.errorMessage = "cant get books";
        });

      builder
        .addCase(addThisToReadingList.pending, (state) => {
          // state.status = "loading";
          // state.loading = "true";
        })
        .addCase(addThisToReadingList.fulfilled, (state, action) => {
          toast.success("The book has been added to the reading list!");
          // state.status = "null";
        })
        .addCase(addThisToReadingList.rejected, (state, action) => {
          toast.error(action.error.message);
          state.status = "failed";
        });
      builder
        .addCase(removeThisBook.pending, (state) => {
          // state.loading = "true";
          // state.status = "loading";
        })
        .addCase(removeThisBook.fulfilled, (state, action) => {
          // state.books = action.payload;
          // state.errorMessage = "";
        })
        .addCase(removeThisBook.rejected, (state, action) => {
          // toast.error(action.error.message);
          // state.loading = "false";
          // state.status = "failed";
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
export const {
  // setBooksTo,
  setSingleBookTo,
  setErrorMessageTo,
  setLoadingTo,
  setPageNumTo,
  setQueryTo,
} = booksSlice.actions;
