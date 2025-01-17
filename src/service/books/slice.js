import api from "../../apiService.js";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  status: "",
  pageNum: 1,
  loading: null,
  errorMessage: "",
  addingBook: "",
  removedBookId: "",
  totalPage: 10,
  books: [],
  singleBook: "",
  savedBooks: [],
  limit: 12,
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
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    console.log(response.data, "aaaaaa");
    return response.data;
  }
);

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const getReadingList = createAsyncThunk(
  "book/getReadingList",
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
  }
);

export const removeThisBook = createAsyncThunk(
  "books/removeThisBook",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);

    // const sumResponse = {

    //   removedBookId: removedBookId,
    // };

    console.log(removedBookId, "sumResponse");

    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setBooksTo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setBooksTo.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
        state.loading = null;
      })
      .addCase(setBooksTo.rejected, (state, action) => {
        state.status = "failed";
        state.loading = null;
      });
    builder
      .addCase(addThisToReadingList.pending, (state) => {
        state.status = "loading";
        state.loading = "true";
      })
      .addCase(addThisToReadingList.fulfilled, (state, action) => {
        toast.success("The book has been added to the reading list!");
        console.log(action, "add Fullfill");
        state.savedBooks.push(action.payload);
        state.status = "null";
        state.loading = null;
      })
      .addCase(addThisToReadingList.rejected, (state, action) => {
        console.log(action, "add Failed");
        toast.error(action.error.message);
        state.status = "failed";
        state.loading = null;
      });
    builder
      .addCase(removeThisBook.pending, (state) => {
        state.loading = "true";
        state.status = "loading";
      })
      .addCase(removeThisBook.fulfilled, (state, action) => {
        state.removedBookId = action.payload;
        state.errorMessage = "";
        state.loading = null;
      })
      .addCase(removeThisBook.rejected, (state, action) => {
        toast.error(action.error.message);
        state.loading = null;
        state.status = "failed";
      });

    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "pending";
        state.loading = "true";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.singleBook = action.payload;
        state.loading = null;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "Failed to remove book";
        state.loading = null;
      });

    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.savedBooks = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export default booksSlice.reducer;
export const {
  setSingleBookTo,
  setErrorMessageTo,
  setLoadingTo,
  setPageNumTo,
  setQueryTo,
} = booksSlice.actions;
