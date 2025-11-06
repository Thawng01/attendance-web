// // utils/exportToExcel.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { History } from "@/pages/BranchUser";
import { formatDuration } from "../utils/index";
// Adjust the import path as needed

export const exportHistoryToExcel = (
    data: History[],
    filename: string = "history_export.xlsx"
) => {
    // Transform the data into the desired format
    const excelData = data.map((item, index) => ({
        "No.": index + 1,
        Username: item.user.name,
        Email: item.user.email || "No provided",
        Branch: item.Branch.name,
        Date: new Date(item.createdAt).toLocaleDateString(),
        "Clock In": new Date(item.session.startTime).toLocaleTimeString(),
        "Clock Out": new Date(item.session.endTime).toLocaleTimeString(),
        Duration: formatDuration(item.session.duration), // Convert seconds to minutes
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "History Data");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    // Create blob and save
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, filename);
};

// utils/exportToExcel.ts
// @ts-ignore - xlsx-style types might not be available
// import * as XLSXStyle from "xlsx-style";
// import { saveAs } from "file-saver";
// import type { History } from "@/pages/BranchUser";
// import { formatDuration } from "../utils/index";

// export const exportHistoryToExcel = (
//     data: History[],
//     filename: string = "history_export.xlsx"
// ) => {
//     if (data.length === 0) {
//         alert("No data to export");
//         return;
//     }

//     // Transform the data
//     const excelData = data.map((item, index) => ({
//         "No.": index + 1,
//         Username: item.user.name,
//         Email: item.user.email || "No provided",
//         Branch: item.Branch.name,
//         Date: new Date(item.createdAt).toLocaleDateString(),
//         "Start Time": new Date(item.session.startTime).toLocaleTimeString(),
//         "End Time": new Date(item.session.endTime).toLocaleTimeString(),
//         Duration: formatDuration(item.session.duration),
//     }));

//     // Create workbook
//     const workbook = XLSXStyle.utils.book_new();

//     // Create worksheet with data
//     const worksheet = XLSXStyle.utils.json_to_sheet(excelData);

//     // Add title rows
//     const title = "User Session History Report";
//     const exportDate = `Exported on: ${new Date().toLocaleDateString()}`;

//     // Add title and date at the top
//     XLSXStyle.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
//     XLSXStyle.utils.sheet_add_aoa(worksheet, [[exportDate]], { origin: "A2" });
//     XLSXStyle.utils.sheet_add_aoa(worksheet, [[""]], { origin: "A3" }); // Empty row

//     // Move data down
//     const dataRange = XLSXStyle.utils.decode_range(
//         worksheet["!ref"] || "A1:A1"
//     );
//     dataRange.s.r += 3; // Shift data down by 3 rows
//     dataRange.e.r += 3;
//     worksheet["!ref"] = XLSXStyle.utils.encode_range(dataRange);

//     // Apply styles to title
//     worksheet["A1"].s = {
//         font: { bold: true, sz: 16, color: { rgb: "000000" } },
//         alignment: { horizontal: "center" },
//         fill: { fgColor: { rgb: "DDEBF7" } },
//     };

//     worksheet["A2"].s = {
//         font: { italic: true, sz: 12, color: { rgb: "666666" } },
//         alignment: { horizontal: "center" },
//     };

//     // Merge cells for title
//     if (!worksheet["!merges"]) worksheet["!merges"] = [];
//     worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } });
//     worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 7 } });

//     // Style header row
//     const headerRange = XLSXStyle.utils.decode_range(
//         worksheet["!ref"] || "A1:A1"
//     );
//     headerRange.e.r = headerRange.s.r;

//     for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//         const cellAddress = XLSXStyle.utils.encode_cell({
//             r: headerRange.s.r,
//             c: C,
//         });
//         if (worksheet[cellAddress]) {
//             worksheet[cellAddress].s = {
//                 font: { bold: true, color: { rgb: "FFFFFF" } },
//                 fill: { fgColor: { rgb: "4472C4" } },
//                 alignment: { horizontal: "center" },
//             };
//         }
//     }

//     XLSXStyle.utils.book_append_sheet(workbook, worksheet, "History Data");

//     // Generate file
//     const excelBuffer = XLSXStyle.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//     });
//     const blob = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(blob, filename);
// };
