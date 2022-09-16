import { setBooksTo,setSingleBookTo, setErrorMessageTo, setLoadingTo, setPageNumTo, setQueryTo } from "../service/books/slice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
//import {postData}
import { addThisToReadingList,removeThisBook } from "../service/books/slice";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

//const pageNum = useSelector((state) => state.pageNum)
//const query = useSelector((state) => state.query)
//const limit = useSelector((state) => state.limit)
//const addingBook = useSelector((state) => state.addingBook)

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading)
  const book = useSelector((state) => state.singleBook)

  // const [loading, setLoading] = useState(false);
  // const [book, setBook] = useState(null);
  // const [addingBook, setAddingBook] = useState(false);
  const params = useParams();
  const bookId = params.id;

  //setErrorMessage = () => {dispatch(setErrorMessageTo(error.message))}
  const setLoading = () => {dispatch(setLoadingTo())}
  //setAddingBook = () => {dispatch(setAddingBookTo())}
  const setBook = (book) => {dispatch(setSingleBookTo(book))}



  // const addToReadingList = (book) => {
  //   setAddingBook(book);


  //   //dispatch(setAddingBook(book))
  //   //in slice.js:
  //   //setAddingBook: (state,action) => {...}
  // };
  const addToReadingList = (book) => dispatch(addThisToReadingList(book))

  // useEffect(() => {
  //   const postData = async () => {
  //     if (!addingBook) return;
  //     setLoading(true);
  //     //dispatch(setLoading(true))

  //     try {
  //       await api.post(`/favorites`, addingBook);
  //       toast.success("The book has been added to the reading list!");
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //     setLoading(false);
  //     //dispatch(setLoadingTo(false))}
  //   };
  //   postData();
  // }, [addingBook]);



//keep this
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/books/${bookId}`);
        setBook(res.data);
        //in slice.js:
        //setBook: (state,action) => {...}
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
      //dispatch(setLoading(false))
    };
    fetchData();
  }, [bookId]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
