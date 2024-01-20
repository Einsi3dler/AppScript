function urlCreatorFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName("Sheet70")

  for (var a=1; a<1675; a++)
  {
    sheet.getRange("B" + a).setValue("https://opensea.io/assets/zora/0x211e278bc28dc9d452ee0fd86bddb4bc849cdc5d/" + a)
  }
}
