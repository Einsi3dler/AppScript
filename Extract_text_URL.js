/*
This program pulls out Rich text which is url embedings into abother column, useful for veryfing reports that have been documented
*/
function extractLinksInColumn() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  for (var i = 1; i <= lastRow; i++) {
    var cellA = sheet.getRange("A" + i);
    var richTextValue = cellA.getRichTextValue();

    var link;
    var runs = richTextValue.getRuns();
    for (var j = 0; j < runs.length; j++) {
      var run = runs[j];
      if (run.getLinkUrl()) {
        link = run.getLinkUrl();
        break;
      }
    }

    if (link) {
      // If a link is found, set it in the corresponding cell in Column B
      var cellB = sheet.getRange("B" + i);
      cellB.setValue(link);
    }
  }
}
