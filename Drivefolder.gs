/*
Checks the drive Folders to see how many contents are inside, if it;s less than 3 it puts number one on Column B in that row for that url
*/
function checkDriveFolders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet67");
  var folderUrls = sheet.getRange("A:A").getValues();
  var resultColumn = sheet.getRange("B:B");

  for (var i = 0; i < folderUrls.length; i++) {
    var folderUrl = folderUrls[i][0];
    if (folderUrl !== "") {
      try {
        var folderId = extractFolderId(folderUrl);
        var folder = DriveApp.getFolderById(folderId);
        var files = folder.getFiles();

        var itemCount = 0;
        while (files.hasNext()) {
          itemCount++;
          files.next();
        }

        // Mark with 1 if less than 3 items
        resultColumn.getCell(i + 1, 1).setValue(itemCount < 3 ? 1 : "");
      } catch (error) {
        // Write "NOT_ACCESSIBLE" if there's an error accessing the folder
        resultColumn.getCell(i + 1, 1).setValue("NOT_ACCESSIBLE");
      }
    }
  }
}

// Helper function to extract folder ID from folder URL
function extractFolderId(folderUrl) {
  var regex = /folders\/(.+)$/; // Extract the folder ID from the URL
  var match = folderUrl.match(regex);
  return match ? match[1] : null;
}
