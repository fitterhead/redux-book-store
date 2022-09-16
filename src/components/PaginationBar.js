import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//import {useSelector} ...
//import {useDispatch} ...
//const dispatch = useDispatch()

//const books = useSelector((state) => state.books)
//const pageNum = useSelector((state) => state.pageNum)
//const query = useSelector((state) => state.query)
//const totalPageNum = useSelector((state) => state.limit)
//const pageNum = useSelector((state) => state.pageNum)
//const setPageNum = (value) => {dispatch(setPageNumTo(value))}

const PaginationBar = ({ pageNum, setPageNum, totalPageNum }) => {
  const handleChange = (event, value) => {
    setPageNum(value);
    //
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
