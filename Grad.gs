function parseGradRates(ids2) {

  var regexCDC = /\d{9}/g
  var stem = /DISTRICT|\d{9}/g
  var regexRow = /(DISTRICT|\(\d{9}\))?[A-Za-z\.\s]{3,14}\s[\d,]+\s[\d,]+\s[\d\.]+/g
  var groups = /All students|Afr\. Amer\.|Amer\. Ind\.|Asian|Hispanic|Pac\. Isl\.|White|Multiracial|Econ\. disadv\.|Ever ELL in HS|Spec\. ed\./
  var yearsTitle = /CLASS OF O?F? ?201\d/
  var domainOneValues = /[A-Z0-9]+\)? All students\s[\d,]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d,]+\s[\d\.]+/g
  var aeaValues = /[A-Z0-9]+\)? All students\s[\d,]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+\s[\d,]+\s[\d\.]+/g
  
  var gradRates = [], aeaGradRates = [], gradRow = [], dataArray = []
  
for (var y in ids2) {
var file = DriveApp.getFileById(ids2[y]);
   var filename = file.getName();
   Logger.log('Now parsing filename: '+filename);
   var blob = file.getBlob();
   var resource = {
    title: blob.getName(),
    mimeType: blob.getContentType()
  };
  
  try{var file2 = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: "en"})}
  catch(err){var file2 = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: "en"})}
  
  var doc = DocumentApp.openById(file2.id);   // Extract Text from PDF file
  var fileid = doc.getId();
  var pdfText = doc.getBody().getText(); //Logger.log(pdfText)
   Drive.Files.remove(fileid);//removes the newly created google doc
  //file.setTrashed(true);//this trashes the original PDF

  var cdcs = pdfText.match(regexCDC), rows = pdfText.match(regexRow) //rows = pdfText.match(regexRow)
  var matches = pdfText.match(domainOneValues)
  var aeaMatches = pdfText.match(aeaValues)  
  var thisYear = pdfText.match(yearsTitle), thisYear = thisYear.toString().substr(thisYear.length-5) // Logger.log('thisYear: '+thisYear)
  
  function makeObjects(sourceArray,targetArray){
  for (var i in sourceArray){
  var newObject = {
  code:sourceArray[i].slice(0,9).trim(),
  year:thisYear,
  rate:sourceArray[i].slice(-5).trim()
  }
  targetArray.push(newObject)
  }
  }
  
  makeObjects(matches,gradRates)
  makeObjects(aeaMatches,aeaGradRates)
  
  if(thisYear==2017){
  var domainThreeValues = []
  for(var i in rows){
    if(rows[i].match(stem)!=null) var school = rows[i].match(stem)
    var numbers = rows[i].split(/\s/);
    if(groups.test(rows[i])==false) {var group = null}
      else {var group = rows[i].match(groups)[0]};
    domainThreeValues[i] = {
      school:school[0], 
      group:group,
      percent:numbers[numbers.length-1],
      numerator:numbers[numbers.length-2],
      denominator:numbers[numbers.length-3]
   }}}}
 


function bestRate(array, code) {
function filterBy(element) { return element.code == code }
var rates = array.filter(filterBy).map(function(a) {return a.rate;})
return Math.max.apply(null, rates)
}

function onlyTheBest(a){
var bestRates = []
bestRates.push(['DISTRICT',bestRate(a,'DISTRICT')])
for (var i in cdcs){
  var rateRow = []
  rateRow.push(cdcs[i])
  rateRow.push(bestRate(a,cdcs[i]))
  bestRates.push(rateRow)
  }
  return bestRates
}

var bestGradRates = onlyTheBest(gradRates)
var aeaBestRates = onlyTheBest(aeaGradRates)


 for (var i in bestGradRates){dataArray.push(bestGradRates[i])}
 for (var i in domainThreeValues){dataArray.push(domainThreeValues[i])}
 for (var i in aeaBestRates){dataArray.push(aeaBestRates[i])} 
 //for (var i in dataArray){
 //Logger.log('dataArray ['+i+'] : '+dataArray[i])}
 return dataArray
}