
/*
This Appscript code acesses two spreadsheet, it compares two colums with similar data and takes action for a specific row, where it has found a match
*/
function monthlyReport() {
  var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_NUMBER');
  var ss2 =  SpreadsheetApp.openById('YOUR_SPREADSHEET_NUMBER')
  var main_sheet = ss.getSheetByName("SHEETNAME");
  var monthlyReport = ss2.getSheetByName("SHEETNAME");

  var originalData = main_sheet.getRange("F2:F" + main_sheet.getLastRow()).getValues();
  var takedownData = monthlyReport.getRange("I2:I" + monthlyReport.getLastRow()).getValues();

  originalData.forEach(function (row, k) {
    var originalValue = row[0];

    if (originalValue !== "") {
      var index = takedownData.findIndex(function (takedownRow) {
        return takedownRow[0] === originalValue && takedownRow[0] !== "";
      });

      if (index !== -1) {
        main_sheet.getRange(k + 2, 22).setValue(monthlyReport.getRange(index + 2, 11).getValue());// Image url
        main_sheet.getRange(k + 2, 10).setValue(monthlyReport.getRange(index + 2, 4).getValue()); //date time stamp
      }
    }
  });
}
