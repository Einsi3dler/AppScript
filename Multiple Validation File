//This code is what Helps the Multiple Select Validation Work do not delete it, well do whatever you want but don't touch it hahahaha
function onOpen(e) {								
SpreadsheetApp.getUi()								
.createMenu('Multiple Select Data Validation')								
.addItem('Show dialog', 'showDialog')								
.addToUi();								
}								
function showDialog() {								
var html = HtmlService.createTemplateFromFile('Page').evaluate();								
SpreadsheetApp.getUi()								
.showSidebar(html);								
}								
var valid = function(){								
try{								
return SpreadsheetApp.getActiveRange().getDataValidation().getCriteriaValues()[0].getValues();								
}catch(e){								
return null								
}								
}								
function fillCell(e){								
var s = [];								
for(var i in e){								
if(i.substr(0, 2) == 'ch') s.push(e[i]);								
}								
if(s.length) SpreadsheetApp.getActiveRange().setValue(s.join(', '));								
}								
