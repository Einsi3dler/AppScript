//This function compares two columns, if a data that exists on Column A is found in a row on Column B, it is deleted from both columns(note: I have no Idea why I wrote this)
function compareAndDelete() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SHEETNAME");

  // Get data in column I
  var columnIData = sheet.getRange("I:I").getValues().flat();

  // Get data in column C
  var columnCData = sheet.getRange("C:C").getValues().flat();

  // Iterate through column I data
  for (var i = 0; i < columnIData.length; i++) {
    var dataI = columnIData[i];

    // Check if data in column I exists in column C
    var indexInC = columnCData.indexOf(dataI);

    if (indexInC !== -1) {
      // Remove data from column C
      sheet.getRange(indexInC + 1, 3).setValue("");

      // Remove data from column I
      sheet.getRange(i + 1, 9).setValue("");
    }
  }
}
