function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName("Sheet 1")
// total number of tokens
  let brandName = sheet.getRange('R2').getValue();
  let subs = sheet.getRange('V2').getValue();
  let contra_add = sheet.getRange('W2').getValue();
  let date = sheet.getRange('T2').getValue();
  let report_num = "Report #"+ sheet.getRange('Y2').getValue();
  let report_url = sheet.getRange('X2').getValue();
  let report = '=HYPERLINK("' + report_url+ '", "' + report_num + '")'
  let count = sheet.getRange('U2').getValue();
  let chain = sheet.getRange('S2').getValue();
  
  var tokenSourceRange = sheet.getRange("Q2:Q");
  var tokens = tokenSourceRange.getValues();
  var tokenArray = [];

/// THis is how the array gets created
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i][0]; // Assuming a single-column range

    // Check if the current cell is null
    if (token === "" || token === null) {
      break; // Stop the loop when encountering the first null value
    }

    // Process the non-null value (token) and store it in the array
    // ...
    tokenArray.push(token);
  }
/// this is how the token array gets made
let base_number = tokenArray.length;
 var marketNamesString = sheet.getRange('AA2').getValue();
 var marketName = marketNamesString.split(',').map(function(item) {
    return item.trim();
  }).filter(function(item) {
    return item !== ''; // Filter out empty elements
  });

 ///this Section Creates the collection name

var range = sheet.getRange("AB2:AC" + marketName.length+1);

  // Get the values in the range
var values = range.getValues();

  // Initialize an empty dictionary
var collectionName = {};

  // Set the default value based on B1
var defaultValue = values[0][1];

  // Loop through the rows to set values in the dictionary
for (var i = 0; i < values.length; i++) {
  var key = values[i][0];
  var value = values[i][1].trim();

    // If value is empty or null, use the default value from B1
    // Otherwise, use the value from the corresponding cell in B
  collectionName[key] = value !== "" && value !== null ? value : defaultValue;
}
 ///  
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
                "Nifty Gateway":"https://www.niftygateway.com/marketplace/item/"+contra_add+"/",
                "Element": "https://element.market/assets/ethereum/"+contra_add+"/",
                "NFTrade": "https://nftrade.com/assets/eth/"+contra_add+"/",
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
  
  var parentFolder = DriveApp.getFolderById('DRIVEPARENTID'); // Parent Folder ID
  for (var mark of marketName) {
    var folderName = collectionName[mark]+ "-" + mark + "-" + date;
    var newFolder = parentFolder.createFolder(folderName) 
    url = "https://drive.google.com/drive/folders/" + newFolder.getId()
    googleUrl[mark] = url;
  }
/// Creating google drive Folders

////////////////////////////////////////////////////////////////////////// Ignore
// Clearing the sheet to remove any clutter from last use
var dataRange = sheet.getDataRange();
var lastColumn = dataRange.getLastColumn();
var lastRow = dataRange.getLastRow();

for (var i = 1; i <= lastColumn; i++) {
  // Skip clearing columns from P to the end
  if (i >= 16) {
    continue;
  }

  // Skip rows below Q2
  if (i === 16) {
    var rangeToClear = sheet.getRange(2, i, lastRow - 1, 1); // Exclude the first row
  } else {
    var rangeToClear = sheet.getRange(1, i, lastRow, 1); // Include the first row
  }

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
    console.log(val)
    sheet.getRange("D" + i).setValue(subs)
    if (chain === "eth")
    {
      sheet.getRange("G" + i).setValue("Ethereum")
    }
    else
    {
      sheet.getRange("G" + i).setValue("Polygon")///////
    }
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
console.log(marketName.length)
}
