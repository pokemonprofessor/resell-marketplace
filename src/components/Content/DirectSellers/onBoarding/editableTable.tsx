import React, { SyntheticEvent, useEffect, useState } from "react";
import { Create, DeleteOutline, AddBox, Done, Clear } from '@mui/icons-material';
import {
  Box, Button, Table,
  TableBody, TableCell, TableHead, TableRow, TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

function EditableTable(props: any) {
  const { seller, setSeller } = props;
  const classes = useStyles();
  const [isEdit, setEdit] = React.useState(true);
  const [disable, setDisable] = React.useState(true);

  const [rows, setRows] = useState([{ id: 1, marketplaceName: "", sellerName: "", url: "" }]);

  useEffect (() => {
    let _seller = seller.marketPlace;
    if (_seller && Object.entries(_seller).length) {
      setRows(Array(_seller));
    }
  }, []);

  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1, marketplaceName: "",
        sellerName: "", url: ""
      },
    ]);
    
    setEdit(true);
  };

  const handleEdit = (i: any) => setEdit(!isEdit);

  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    setDisable(true);
    setSeller({ ...seller, marketPlace: [ ...rows ] })
  };

  const handleInputChange = (e: SyntheticEvent, index: number) => {
    setDisable(false);
    const { name, value }: any = e.target;
    const list: any = [...rows.flat(1)];
    list[index][name] = value;
    setRows(list);
    setSeller({ ...seller, marketPlace: [ ...list ] })
  };

  const handleRemoveClick = (i: any) => {
    const list = [...rows.flat(1)];
    list.splice(i, 1);
    setRows(list);
    setSeller({ ...seller, marketPlace: [ ...list ] })
  };

  return (
    <TableBody>
      <Box margin={1}>
        <div>
          <div>
            {isEdit ? (
              <div className="row">
                <Button onClick={handleAdd}>
                  <AddBox onClick={handleAdd} />
                  Add More Information
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled onClick={handleSave}>
                        <Done />
                        SAVE
                      </Button>
                    ) : (
                      <Button onClick={handleSave}>
                        <Done />
                        SAVE
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button onClick={handleAdd}>
                  <AddBox onClick={handleAdd} />
                  ADD
                </Button>
                <Button onClick={handleEdit}>
                  <Create />
                  EDIT
                </Button>
              </div>
            )}
          </div>
        </div>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Market Place Name</TableCell>
              <TableCell>Market Seller Name</TableCell>
              <TableCell>Website URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.flat(1).map((row, i) => {
              return (
                <TableRow>
                  {isEdit ? (
                    <>
                      <TableCell padding="none">
                        <TextField
                          className={'mui-text-field'}
                          value={row.marketplaceName}
                          name="marketplaceName"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <TextField
                          className={'mui-text-field'}
                          value={row.sellerName}
                          name="sellerName"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <TextField
                          className={'mui-text-field'}
                          style={{ width: "100px" }}
                          name="url"
                          value={row.url}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell component="th" scope="row">
                        {row.marketplaceName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.sellerName}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.url}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></TableCell>
                    </>
                  )}
                  <>
                    {isEdit ? (
                      <Button className="mr10" onClick={() => handleRemoveClick(i)}>
                        <Clear />
                      </Button>
                    ) : (
                      <Button className="mr10" onClick={() => handleRemoveClick(i)}>
                        <DeleteOutline />
                      </Button>
                    )}
                  </>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}

export default EditableTable;
