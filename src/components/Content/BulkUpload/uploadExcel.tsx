import { Button, Chip } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadStart, startLoading } from "redux/reducers/bulkUpload";
import snack from "components/wrapper/snack";
import * as XLSX from "xlsx";
import { RootState } from "redux/store";

export const ExcelToJson = () => {
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch();
  const seller = useSelector(
    (state: RootState) => state.seller.seller
  );
  const user = useSelector(
    (state: RootState) => state.user.user
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(e.target.files)
    setFile(e.target.files);
  };

 

  const uploadDocument = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!file?.length) {
      alert("Please select documents to upload");
    } else {
      dispatch(
        bulkUploadStart({
          documents: file,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          userId:user["_id"]
        })
      );
    }
  };
  return (
    <>
      <div className="form-group">
        <div className="upload-btn-wrapper">
          <div className="d-flex upload-btn-wrapper-content-wrap">
            <div className="upload-btn-wrapper-content d-flex align-items-center">
              <Button color="primary" size="large">
                <i className="fas fa-paperclip"></i> Add Attachements{" "}
              </Button>
              {file ? null : <p>Or drop files</p>}
              <input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                multiple
                name="myfile"
                onChange={onChange}
              />
              {file ? <Chip label={file[0].name} /> : null}
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={uploadDocument}>
          UPLOAD
        </button>
      </div>
    </>
  );
};

export default ExcelToJson;
