import { Button, Chip } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadStart } from "redux/reducers/bulkUpload";
import snack from "components/wrapper/snack";
import * as XLSX from "xlsx";
import { updateProductQtyStart } from "redux/reducers/updateProductQty";
import { RootState } from "redux/store";

export const ExcelToJson = () => {
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch();
  const seller = useSelector(
    (state: RootState) => state.seller.seller
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(e.target.files)
    setFile(e.target.files);
  };

  const createProductData = (productData: any) => {
    let data: any[] = [];
    let _productData: any[] = [];
    productData = JSON.parse(productData);

    productData.forEach(function (item: any) {
      var existing = data.filter(function (v, i) {
        return v["parentSellerSKU"] == item["Parent Seller SKU"];
      });

      if (existing.length) {
        var existingIndex = data.indexOf(existing[0]);
        //1. Seller SKU
        data[existingIndex]["SellerSKU"] = [
          ...data[existingIndex]["SellerSKU"],
          item["Seller SKU"],
        ];
      
        //4. Sale Price
        data[existingIndex]["saleprice"] = [
          ...data[existingIndex]["saleprice"],
          item["Sale Price"],
        ];
       
        // 12. Price
        data[existingIndex]["price"] = [
          ...data[existingIndex]["price"],
          item["Price"],
        ];
        // 13. Quantity
        data[existingIndex]["Quantity"] = [
          ...data[existingIndex]["Quantity"],
          item["Quantity"],
        ];
        // 14. Listing Status
        data[existingIndex]["ListingStatus"] = [
          ...data[existingIndex]["ListingStatus"],
          item["Listing Status"],
        ];

        
      } else {
        data.push({
          saleprice: [item["Sale Price"]],
          parentSellerSKU: item["Parent Seller SKU"],
          price: [item["Price"]],
          Quantity: [item["Quantity"]],
          SellerSKU: [item["Seller SKU"]],
          ListingStatus: [item["Listing Status"]],
        });
      }
    });

    for (let i =0; i < data.length-1; i++) {
      _productData.push(data[i]);
    }

    data = _productData;
    console.log('datatatatatatatta',{data})
    dispatch(updateProductQtyStart({ data }));
  };

  const readFile = () => {
    if (!file) {
      snack.error("Please select a file to upload");
      return;
    }
    var f = file.file;
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data: any = XLSX.utils.sheet_to_csv(ws);
      /* Update state */
      let _products = convertToJson(data);
      console.log(_products); // shows data in json format
      const products = createProductData(_products);
    };
    reader.readAsBinaryString(f);
  };

  const convertToJson = (csv: any) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result);
  };

  const uploadDocument = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!seller.firstName || !seller.lastName || !seller.email) {
      snack.error(
        "Seller Inforamtion not available, please Login again"
      );
    }

    if (!file?.length) {
      alert("Please select documents to upload");
    } else {
      dispatch(
        updateProductQtyStart({ 
          documents: file,
          firstName: seller.firstName,
          lastName: seller.lastName,
          email: seller.email,
          sellerId:seller.sellerId
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
