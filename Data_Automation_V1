function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName("Sheet 1")
// total number of tokens
  let brandName = "Louis Vuitton"
  let base_number = 1
  let contra_add = "0xc6d279804841dd00df8d1b9af085c6cb30474a89"
  let date = "2023-11-06"
  let report_num = "Report #488"
  let report_url = "https://admin.yakoa.io/reports/RnJhdWRDYXNlOnsiaWQiOiAiMTk0YWUxOTAtNzZhYy00ZDY4LWI2YmUtOTMxMTg2OTk5NjdiIn0="
  let report = '=HYPERLINK("' + report_url+ '", "' + report_num + '")'
  let count = 1
  let chain = "eh"
  let name_cont = 1
  var oneName = "Cryptochibz";
  var tokenSourceRange = sheet.getRange("O1:O" + base_number);
  var tokens = tokenSourceRange.getValues();
  const marketName = [
                //"Opensea",
                "Rarible",
                //"OKX",
                //"Nifty Gateway",
                "Element",
                "NFTrade",
                //"Foundation"
  ]

  var collectionName = {
                "Opensea" : "	Rarible",
                "Rarible": "	Aavegotchi",
                "OKX": "Aavegotchi Official - Polygon",
                "Element": "Rarible - pwlVGKdPaW",
                "NFTrade": "Aavegotchi",
                "Nifty Gateway": "Rarbs",
                "Foundation": "Foundation"
                }

  if (name_cont === 1)
  { 
    for (var key in collectionName) {
      collectionName[key] = oneName;
}
  } 
  
 
  
  let polylinks = {
                "Opensea" : "https://opensea.io/assets/matic/"+contra_add+"/",
                "Rarible": "https://rarible.com/token/polygon/"+contra_add+":",
                "OKX": "https://www.okx.com/web3/marketplace/nft/asset/polygon/"+contra_add+"/",
                "Element": "https://element.market/assets/polygon/"+contra_add+"/",
                "NFTrade": "https://nftrade.com/assets/polygon/"+contra_add+"/"
  }

  let ethlinks = {
                "Opensea": "https://opensea.io/assets/ethereum/"+contra_add+"/",
                "Rarible": "https://rarible.com/token/"+contra_add+":",
                "OKX": "https://www.okx.com/web3/marketplace/nft/asset/eth/"+contra_add+"/",
                "Nifty Gateway" :"https://www.niftygateway.com/marketplace/item/"+contra_add+"/",
                "Element": "https://element.market/assets/ethereum/"+contra_add+"/",
                "NFTrade": "https://nftrade.com/assets/eth/"+contra_add+"/",
                "Foundation": "place"
}

  var links = {}

  if (chain === "eth")
  {
    links = ethlinks
  }
  else
  {
    links = polylinks
  }

/*
The algo below does create a google function but it is very fundametal
wethere it works or it breaks actually depends wholly on market name and collection name being right and following the same order

Note to self: Improve this, maybe use a 3 dimensional array instead of the 1d rubbish, I wonder if javascript can do 3d
*/

/// Creating google drive Folders
  let googleUrl = {}
  
  var parentFolder = DriveApp.getFolderById('1i-oLQ8qzEYCMgXEO74yGmlPo5-isiUBe'); // Parent Folder ID
  for (var mark of marketName) {
    var folderName = collectionName[mark]+ "-" + mark + "-" + date;
    var newFolder = parentFolder.createFolder(folderName) 
    url = "https://drive.google.com/drive/folders/" + newFolder.getId()
    googleUrl[mark] = url;
  }

/// Creating google drive Folders
 
var tokenArray = tokens.map(function (row)// storing the token in an array so I can create the address
{
  return row[0];
});

////////////////////////////////////////////////////////////////////////// Ignore
// Clearing the sheet to remove any clutter from last use
var dataRange = sheet.getDataRange(); 
// Get the last column of the data range
var lastColumn = dataRange.getLastColumn();
// Get the last row of the data range
var lastRow = dataRange.getLastRow();
// Clear the data in the sheet (excluding columns A and M)
for (var i = 1; i <= lastColumn; i++) { // Start from column B (index 2) and end before column M
  // Column M corresponds to index 13 (column A is 1, column B is 2, and so on)
  var rangeToClear = sheet.getRange(1, i, lastRow, 1);
  rangeToClear.clearContent();
}
/////////////////////////////////////////////////////////////////////////////// Ignore
var j = 0 // this variable here is a relic from an old function, so the algo I can't remember does not break
for(var val of marketName) {
  // j is the number iteration of the links, marketplace and names
  for(let i = (base_number*j)+1; i <= base_number*(j+1); i++) {
    var value = tokenArray[i-(base_number*j)-1] // Tokens are stored in an array
    
    sheet.getRange("A" + i).setValue(collectionName[val])// Collection Name
    sheet.getRange("B" + i).setValue(brandName) //Brand name
    sheet.getRange("C" + i).setValue(links[val]+ value) // Marketplace link
    sheet.getRange("H" + i).setValue(contra_add) // Contract Address
    sheet.getRange("I" + i).setValue(value) // Tokens
    sheet.getRange("J" + i).setValue(val) // Marketplace Name
    sheet.getRange("K" + i).setValue(date) // Date of Discovery
    sheet.getRange("L"+ i).setValue(googleUrl[val]) // Google drive url
    sheet.getRange("M" + i).setValue(count) // How many 
    sheet.getRange("N" + i).setValue(report) // Report URL and Number
    
    
  }
  j++ // part of the old function, improve as soon as possible
}
}
