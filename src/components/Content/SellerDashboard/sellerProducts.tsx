import "../../../styles/common.css";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerProductsStart } from "redux/reducers/sellerProducts";
import { RootState } from "redux/store";
import { Pagination } from "@mui/material";

export const SellerProducts = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<any[]>([]);

  const sellerProductsData = useSelector(
    (state: RootState) => state.sellerProducts.sellerProducts
  );
  const userState = useSelector(
    (state: RootState) => state?.seller?.seller
  );
  useEffect(() => {
    dispatch(sellerProductsStart({ sellerId: userState?.sellerId }));
  }, [userState?.sellerId]);

  useEffect(() => {
    const rows: any[] = [];
    if (sellerProductsData && sellerProductsData.sellerProductsResponse) {
      sellerProductsData.sellerProductsResponse.forEach((item: any) => {
        rows.push({
          title: item.title,
          description: item.description,
          price: item.price,
        });
      });
      console.log(
        "sellerProductsDatasellerProductsData",
        sellerProductsData.sellerProductsResponse
      );
      setRows(rows);
    }
  }, [sellerProductsData]);
  return (
    <>
      <div>
        <h2>Total Products: &nbsp;&nbsp;&nbsp;&nbsp;{rows.length}</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Title</h4>
              </TableCell>
              <TableCell>
                <h4>Description</h4>
              </TableCell>
              <TableCell>
                <h4>price</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <>
                {console.log("erererererer", row)}
                <TableRow key={row.title}>
                  <TableCell style={{ maxWidth: "200px" }}>
                    {row.title}
                  </TableCell>
                  <TableCell style={{ maxWidth: "200px" }}>
                    {row.description}
                  </TableCell>
                  <TableCell align="right">{`$ ${row.price}`}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
  component="div"
  count={100}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/> */}
    </>
  );
};
