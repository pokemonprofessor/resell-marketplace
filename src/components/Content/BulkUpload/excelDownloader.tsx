import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import TemplateData from "utils/data/templateData/data";
import snack from "components/wrapper/snack";

export const ExcelDownloader = (props: any) => {
  const download = () => {
    if (!props.categoryName) {
      snack.error("Please select a category");
      return;
    }
    var data = props.onBeforeDownload(props.categoryName);
    let header = [...TemplateData.product];
    const ws = XLSX.utils.book_new();
    const ws2 = XLSX.utils.json_to_sheet(TemplateData.Instructions);
    const ws3 = XLSX.utils.json_to_sheet(TemplateData.Example);

    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
    // data sheet
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    // Instruction sheet
    XLSX.utils.book_append_sheet(wb, ws2, "Instructions");
    // Example sheet
    XLSX.utils.book_append_sheet(wb, ws3, "Example");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const finalData = new Blob([excelBuffer], { type: "xlsx" });
    FileSaver.saveAs(finalData, "ProductTemplate.xlsx");
  };

  return (
    <>
      <button className="btn btn-primary" onClick={download}>
        DOWNLOAD EXCEL SHEET
      </button>
    </>
  );
};
