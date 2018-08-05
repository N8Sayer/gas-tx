function test_onFormSubmit() {
  var dataRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Uploads').getDataRange();
  var data = dataRange.getValues();
  var headers = data[0];
  for (var row=514; row < data.length; row++) {
    var e = {};
    e.values = data[row];  
//    data[row].forEach(function(cell) {
//      if (cell.toString().match(',')) {
//        cell = new Array(cell);
//      }
//       e.values.push(cell); 
//    });
    e.range = dataRange.offset(row,0,1,data[0].length);
    e.namedValues = {};
    for (var col=0; col<headers.length; col++) {
      e.namedValues[headers[col]] = [data[row][col]];
    }
//Logger.log(e);              
    onFormSubmit(e);
  }  
}

function newTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet("10nOYEtlwKa_cIikHUJQkZTZxqnjqvrKU0YC_Xrw_Poc")
    .onFormSubmit()
    .create();
}

function test() {
  function maxIndex(arr) { return arr.indexOf(Math.max.apply(Math, arr));} 
  Logger.log(maxIndex([NaN,3000,2000]));
}

function moveFile(fileId, dest_folder) {
  var file = DriveApp.getFileById(fileId);
  dest_folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);
}
    
function onFormSubmit(e) { // When form gets submitted
  Logger.log(e.values); //Get information from form and set as variables
  var url = e.values[1], 
      to = e.values[3], 
      saveData = e.values[6], 
      url2 = e.values[7], 
      url3 = e.values[8];
  Logger.log(e.values[7]);
  function getIdFromUrl(url) { Logger.log(url); return url.match(/[-\w_]{25,}/g); }
  var ids = getIdFromUrl(url), 
      ids2 = getIdFromUrl(url2), 
      ids3 = getIdFromUrl(url3);
  var regexes = [/05180[3-8][0-2]\d{10}[\w\s-']{56}[\w\s]{9}[MF\s][0-1]\d[0-3]\d[12][90]\d{2}\s.{6}[A-Z\s].{3}\s{4}.{3}\s.\s{5}.{2}\s{3}.(<122 fieldcheck 123>)?.{34}[\w\s]{6}.{2}\s{25}.[\d\s]{10}(<200    fieldcheck    201>)?.{20}[\d\s]{25}[01\s][01\s][01\s][01\s]\s{2}.{3}\s.\s{2}.\s{2}.\s{9}.{3}\s.\s{2}.\s{2}.\s{9}.{6}\s{2}.{2}\s{10}.{3}\s.\s{2}.\s{2}.\s{9}.{3}\s.\s{2}.\s{2}.\s{8}(<350  fieldcheck  351>)?.{10}\s{40}.{12}[ES\s][S\s][OP\s]\s{7}.{4}\s{2}.{10}\s.\s.{3}\s{6}.{44}\s{8}.{44}\s{8}.{44}\s{8}.{8}\s{136}.{8}\s{2}.{6}[ES\s][S\s][OP\s]\s{7}.{4}\s.{10}\s.\s.{3}\s{3}.{42}\s{14}.{42}\s{14}.{42}\s{14}.{8}\s{124}.{12}[ES\s][S\s][OP\s]\s{7}.{4}\s{74}.{30}\s{10}.{30}\s{10}.{33}\s{187}.{14}[ES\s][S\s][OP\s]\s{7}.{3}\s{73}.{44}\s{8}.{44}\s{8}.{44}\s{8}.{3}\s{141}.{14}[ES\s][S\s][OP\s]\s{7}.{3}\s{73}.{42}\s{12}.{42}\s{12}.{42}\s{12}.{3}\s{85}.{19}\s.{9}\s.{18}.\s.{9}\s.{19}\s.{9}\s.{19}\s.{9}\s.{18}\s.{4}\s{7}.{18}\s.{4}\s{7}.{8}\s{2}.{8}\s{2}.{10}\s{2}.{10}\s{28}.{52}\s.{92}\s{5}.{22}\s.{3}\s{4}.{25}\s{5}.{25}\s{5}.{24}\s{6}.{24}\s{6}.{24}\s{15}.\s{60}.{30}\s{25}.{30}\s{1014}/,
                  /0418[01][K\d][0-2]\d{10}[\w\s-']{56}[\w\s]{9}[MF\s][0-1]\d[0-3]\d[12][90]\d{2}\s.{6}[A-Z\s].{3}\s{4}.{3}\s.\s{5}.{2}\s{3}.(<122 fieldcheck 123>)?.{9}\s{12}.{21}\s{25}.{11}(<200         fieldcheck    201>)?.{45}\s{105}(<350                                                                                      fieldcheck                                                              351>)?.{5}\s{45}.{12}\s[T\s]\s.\s{7}.{3}\s{2}.{9}\s{2}.{5}\s{206}..\s.{13}\s{84}.{8}\s{2}.{6}\s[T\s]\s.\s{7}.{3}\s.{9}\s{2}.{5}\s{203}..\s.{13}\s{84}.{6}.{2}.{4}\s[T\s]\s.\s{7}..\s{275}..\s.{13}\s{84}.{14}\s[T\s]\s.\s{7}..\s{273}..\s.{13}\s{84}.{14}\s[T\s]\s.\s{7}..\s{273}..\s.{13}\s{314}.{9}\s{2}.{9}\s{2}..\s{96}.{9}\s{2}.{9}\s{2}..\s{66}.{9}\s{2}.{9}\s{10}.{9}\s{2}.{9}\s{10}.{9}\s{2}.{9}\s{1179}/,
                  /1518[01][\d][0-2]\d.{74}[MF\s][0-1]\d[0-3]\d[12][09]\d{2}\s[01\s]{6}[\w\s][\d\s]{2}[01\s]\s{4}.{3}\s.\s{5}[01\s]{2}\s{3}.{19}\s{2}.{23}\s{24}[01\s].{10}(<200                            fieldcheck    201>)?[ABEU\s][123IS\s].{4}\s{8}.{5}\s{10}.{2}[01\s]\s{19}[01\s][01\s][01\s]\s[01\s]\s[01\s]\s{2}[01\s]{2}\s{28}[AOS\s]\s{4}.\s{4}[OP\s]\s{4}[S\s][FR\s]\s{43}(<350  fieldcheck   351>)?.{12}\s{2}.{6}\s{2}.{12}\s{2}.\s.{5}\s{6}[012\s]\s.{15}\s{14}.{207}\s{185}.{10}\s{168}.{35}\s{14}.\s.{3}\s{46}.{35}\s{16}.{3}\s{46}.{38}\s{13}.{3}\s{46}.{38}\s{11}.\s.{3}\s{46}.{33}\s{18}.{3}\s{44}.{44}\s{20}.{36}\s{401}/,
                  /1518[01][\d][0-2]\d.{74}[MF\s][0-1]\d[0-3]\d[12][09]\d{2}\s[01\s]{6}[\w\s][\d\s]{2}[01\s]\s{4}.{3}\s.\s{5}[01\s]{2}\s{3}.{10}\s{12}.{20}\s.\s{24}[01\s].{10}(<200                        fieldcheck    201>)?[ABEU\s][12IS\s].{4}\s{8}.{5}\s{71}[AMNOS\s]\s{14}[T\s]\s[01\s]\s{42}(<350                                                  fieldcheck                                         351>)?.{12}\s{2}.{6}\s{19}[01\s]{2}\s{8}[012\s][01\s].{8}\s[AMNOS\s]\s.{4}\s{284}[01\s]{2}\s[01\s]{13}\s{1283}/,
                  /0318[01][K\d][0-2]\d{10}[\w\s-']{56}[\w\s]{9}[MF\s][0-1]\d[0-3]\d[12][90]\d{2}\s.{6}[A-Z\s].{3}\s{4}.{3}\s.\s{5}.{2}\s{3}.{5}\s{4}.{2}.{5}\s{3}.\s{2}..{9}\s.{9}\s{10}.{5}\s{6}.{16}(<200  fieldcheck  201>)?\d\s{9}.\s{9}.{2}\s{18}.{3}\s{17}.\s.\s{7}.\s.\s{7}.\s.\s{7}.\s.\s{7}.{13}\s{17}.{90}\s{80}.{11}\s{19}.{120}\s{50}.{13}\s{17}.{40}\s{40}.{40}\s{51}.{7}\s{92}.{11}\s{15}.{6}\s{2}.{12}\s{15}.{6}\s{2}.{12}\s{15}.{6}\s{2}.{12}\s{15}.{6}\s{2}.{12}.\s{14}.{6}\s{2}.\s{24}/,
                  /1317[01][\d][0-2]\d.{74}[MF\s][0-1]\d[0-3]\d[12][09]\d{2}\s[01\s]{6}[\w\s][\d\s]{2}[01\s]\s{4}.{3}\s.\s{5}[01\s]{2}\s{3}.{19}\s{2}.{23}\s{24}[01\s].{10}[ABEU\s][12IS\s].{4}\s{8}.{5}\s{10}.{2}.\s{19}.{3}\s.\s.{3}\s{30}.\s{4}.\s{4}.\s{4}.{2}\s{43}.{12}\s{2}.{6}\s{2}.{11}\s{3}.\s.{5}\s{6}.\s.{28}\s.{207}\s{162}.{3}\s{198}.{35}\s{14}.{8}\s{43}.{35}\s{15}.{7}\s{43}.{38}\s{12}.{7}\s{43}.{38}\s{11}.{8}\s{43}.{33}\s{17}.{7}\s{542}/,
                  /1617[01][\d][0-2]\d.{74}[MF\s][0-1]\d[0-3]\d[12][09]\d{2}\s[01\s]{6}[\w\s][\d\s]{2}[01\s]\s{4}.{3}\s.\s{5}[01\s]{2}\s{3}.{19}\s{2}.{23}\s{24}[01\s].{10}[ABEU\s][12IS\s].{4}\s{8}.{5}\s{10}.{2}.\s{19}.{3}\s.\s.{3}\s{30}.\s{4}.\s{4}.\s{4}.{2}\s{43}.{12}\s{2}.{6}\s{2}.{11}\s{3}.\s.{5}\s{6}.\s.{28}\s.{207}\s{162}.{3}\s{198}.{35}\s{14}.{8}\s{43}.{35}\s{15}.{7}\s{43}.{38}\s{12}.{7}\s{43}.{38}\s{11}.{8}\s{43}.{33}\s{17}.{7}\s{542}/,
                  /04180[3-8][0-2]\d{10}[\w\s-']{56}[\w\s]{9}[MF\s][0-1]\d[0-3]\d[12][90]\d{2}\s.{6}[A-Z\s].{3}\s{4}.{3}\s.\s{5}.{2}\s{3}.(<122 fieldcheck 123>)?.{34}[\w\s]{6}.{2}\s{25}.[\d\s]{10}(<200    fieldcheck    201>)?.{20}[\d\s]{25}[01\s][01\s][01\s][01\s]\s{2}.{3}\s.\s{2}.\s{2}.\s{9}.{3}\s.\s{2}.\s{2}.\s{9}.{6}\s{2}.{2}\s{10}.{3}\s.\s{2}.\s{2}.\s{9}.{3}\s.\s{2}.\s{2}.\s{8}(<350  fieldcheck  351>)?.{10}\s{40}.{12}[ES\s][S\s][OP\s]\s{7}.{4}\s{2}.{10}\s.\s.{3}\s{6}.{44}\s{8}.{44}\s{8}.{44}\s{8}.{8}\s{136}.{8}\s{2}.{6}[ES\s][S\s][OP\s]\s{7}.{4}\s.{10}\s.\s.{3}\s{3}.{42}\s{14}.{42}\s{14}.{42}\s{14}.{8}\s{124}.{12}[ES\s][S\s][OP\s]\s{7}.{4}\s{74}.{30}\s{10}.{30}\s{10}.{33}\s{187}.{14}[ES\s][S\s][OP\s]\s{7}.{3}\s{73}.{44}\s{8}.{44}\s{8}.{44}\s{8}.{3}\s{141}.{14}[ES\s][S\s][OP\s]\s{7}.{3}\s{73}.{42}\s{12}.{42}\s{12}.{42}\s{12}.{3}\s{85}.{19}\s.{9}\s.{18}.\s.{9}\s.{19}\s.{9}\s.{19}\s.{9}\s.{18}\s.{4}\s{7}.{18}\s.{4}\s{7}.{8}\s{2}.{8}\s{2}.{10}\s{2}.{10}\s{28}.{52}\s.{92}\s{5}.{22}\s.{3}\s{4}.{25}\s{5}.{25}\s{5}.{24}\s{6}.{24}\s{6}.{24}\s{15}.\s{60}.{30}\s{25}.{30}\s{1014}/
                ]; //consider removing (fieldcheck)?... too bad comments aren't allowed within regex in GAS
  const schemaNames = ['STAAR','ALT','EOC','EOC ALT','TELPAS','EOC2','EOC3', 'Early STAAR']
  const testCodes = ['A1','E1','E2','BI','US']
  const subgroups = ['All students','Afr. Amer.','Hispanic','White','Asian','Amer. Ind.','Pac. Isl.','Multiracial','Econ. disadv.','Spec. ed.','Former Sped','Ever ELL in HS']
  const readingCYApproachesStart = [423,2262,2292]
  const readingCYMeetsStart = [422,2275,2305]
  const readingCYMastersStart = [424,2263,2293]
  const readingCYProgressStart = [425,2268,2298]
  const readingPYApproachesStart = [2512,2542,2572]
  const readingPYMeetsStart = [2529,2839,2589]
  const readingPYMastersStart = [2513,2543,2573]
  const readingCYScaleScoreStarts = [408,2264,2294], readingCYScaleScoreEnds = [412,2268,2298];
  const readingPYScaleScoreStarts = [2514,2544,2574], readingPYScaleScoreEnds = [2518,2548,2578];
  const mathCYApproachesStart = [777,2322,2352]
  const mathCYMeetsStart = [776,2330,2360]
  const mathCYMastersStart = [778,2323,2353]
  const mathCYProgressStart = [779,2328,2358]
  const mathPYApproachesStart = [2632,2662,2692]
  const mathPYMeetsStart = [2644,2675,2704]
  const mathPYMastersStart = [2633,2663,2693]
  const mathCYScaleScoreStarts = [762,2324,2354], mathCYScaleScoreEnds = [766,2328,2358];
  const mathPYScaleScoreStarts = [2634,2664,2694], mathPYScaleScoreEnds = [2638,2668,2698];
  
  var saveRegex = /save/, scoreCodeRegex = /S/, testVersionsRegex = /T/;
  var save = saveRegex.test(saveData); 
  Logger.log('save: '+save);
  var identified = [], blobs = [], zipBlobs = [];
  var year = '2018';
  var template = SpreadsheetApp.openById('1FomO7vP6Gn3H3zmR2PhyyKrF0gAZEvnZ0pBR-AnQ59Q'); //1_LoqK07w5w7LWJatuZV7mQUTiga6bkvZDTqo4T7UZ9Q //unoptimized
  var isdTemplate = SpreadsheetApp.openById('1EzAqGmoPQWxccK10FmO0W_PEGRoPx1SjPUn1baLXkhg');

  function pushArray(arr, arr2) { arr.push.apply(arr, arr2); }
  function extractSchool(row) { return row.substr(32,15); }
  function getIds(row) { return row.substr(73,9); }
  function checkExempt(row) {return TELPAS.indexOf(row.substr(73,9)) === -1; }
  function maxIndex(arr) { return arr.indexOf(Math.max.apply(Math, arr));} // Parsing an array as parameters into Math.max which doesn't process arrays natively
  function checkEarly(row) { return aboveGradeTesters.indexOf(row.substr(73,9)) >= 0; }
  function checkSchool(element) { return element[5] == uniqueSchools[k].trim(); }
  function ccmrCheckSchool(element) { return typeof element[1] === 'string' ? element[1].replace(/^'/g,'') == schoolId : element[1] == schoolId; } // Nate: Replaced original if/else with a ternary operator 
  function checkTest(row) { return row.substr(200, 2) == testCode; }
  function isBest(value, index, array) {
    var id = getIds(value);
    return idIndex.indexOf(id) === index;
  }  
  for (var i in ids) {
    var text = DriveApp.getFileById(ids[i]).getAs('text/plain').getDataAsString().trim(), 
        rows = text.split(/\n/);
//    if (rows.length>5000){Logger.log('More than 5000 students.')};
//    if (save == false) Drive.Files.remove(ids[i])  //turned off for testing
    for (var r in regexes) {
      if (identified[r] != undefined) { continue; }     //identify and place  // Nate: Why do these If statements exist? It makes more sense to nest with this
      if (regexes[r].test(rows[0]) == true) {
        Logger.log('File '+ i +' matches '+ schemaNames[r]);
        identified[r]=rows;
        break; // NOTE FOR NATE - This might not be working. GAS is weird when it comes to breaking out of loops
      }
    }
  }
  var parsedGradRates = parseGradRates(ids2);
 
  var ccmrData = [];
  for (var i in ids3) {
    var ccmrDataResponse = Drive.Files.copy({}, ids3[i], { convert: true });
    DriveApp.getFileById(ids3[i]).setTrashed(true);
    var ccmrId = ccmrDataResponse.id;
    var ccmrSourceSheet = SpreadsheetApp.openById(ccmrId).getSheets()[0];
    var ccmrSourceRange = ccmrSourceSheet.getRange(14,1,ccmrSourceSheet.getLastRow(),14); //check processing time on getLastRow call! Nate: Not a huge deal unless you're calling it repeatedly. Then you might as well save it
    pushArray(ccmrData,ccmrSourceRange.getValues());
    Logger.log('ccmrData total cases:'+ ccmrData.length);
    if (save == false) {
      Drive.Files.remove(ccmrId);
    }
 
    //Log the schema matches from the uploaded txt files
    for (var s in schemaNames) {
      if (identified[s] == undefined) {
        Logger.log(schemaNames[s]+' file not found.');
        continue
      }
      Logger.log(schemaNames[s]+' cases: '+identified[s].length);
    }
   
    //build TELPAS exemptions list
    var TELPAS = []
    try {
      for (var t in identified[4]) {
        var row = identified[4][t];
        if (row.substr(4,2) < 3) {
          continue;
        }
        var telpasData = {unschooled:row[130], sife:row[131], years:row[140]};
        if(telpasData.years == 1){
          TELPAS.push(row.substr(73,9));
          continue;
        }
        if((telpasData.sife == 1 || telpasData.unschooled == 1) && telpasData.years < 6) {
          TELPAS.push(row.substr(73,9));
          continue;
        }
      }
      Logger.log('TELPAS Exempt: '+ TELPAS);
    } catch(err) {
      Logger.log('No valid TELPAS file found.');
    }

    // merge in early STAAR above grade testers 
    if (identified[0] !== undefined && identified[7] !== undefined) {
      var aboveGradeTesters = [];
      for (var i in identified[0]) {
        var row = identified[0][i];
        var aboveGrade = {
          reading:row[245], 
          math:row[246], 
          socstudies:row[247], 
          science:row[248]
        };
        if (aboveGrade.reading == 1 || aboveGrade.math == 1 || aboveGrade.socstudies == 1 || aboveGrade.science == 1) {
          aboveGradeTesters.push(row.substr(73,9));
        }
      }
      Logger.log('aboveGradeTesters: '+ aboveGradeTesters);
      var earlyTests = identified[7].filter(checkEarly);
      Logger.log('earlyTests.length: '+earlyTests.length);
      pushArray(identified[0],earlyTests);
      Logger.log('identified[0].length: '+identified[0].length);
    }
    
    //merge multiple EOC files
    if (identified[2] !== undefined) {
      pushArray(identified[2],identified[5]);
      pushArray(identified[2],identified[6]);
    }
    
    //remove TELPAS exempt
    if (identified[0] !== undefined) {
      var staarData = identified[0].filter(checkExempt);
      Logger.log('Non-Exempt STAAR Cases: '+staarData.length);
    }
    if (identified[2] !== undefined) {
      var eocData = identified[2].filter(checkExempt);
      Logger.log('Non-Exempt EOC Cases: '+eocData.length);
    }
    
    //remap ALT
    function replaceAt(string, index, replacement) { return string.substr(0, index) + replacement + string.substr(index + 1); }
    if (identified[1] !== undefined) {
      var altFix = [[422,423],[776,777],[1122,1123],[1524,1525],[1924,1925],[2675,2662],[2839,2542]];  //
      
      for (var i in identified[1]) {
        for (var j in altFix) {
          identified[1][i] = replaceAt(identified[1][i], altFix[j][0], identified[1][i][altFix[j][1]]);
        }
      }
    }
    if (identified[3] !== undefined) {
      var altFix = [[388,389]];
      for (var i in identified[3]) {
        for (var j in altFix) {
          identified[3][i] = replaceAt(identified[3][i], altFix[j][0], identified[3][i][altFix[j][1]]);
        }
      }
    }
    
    //append ALT
    if (identified[0] !== undefined) { pushArray(staarData,identified[1]); }
    if (identified[2] !== undefined) { pushArray(eocData,identified[3]); }
    // sort EOC array
    var mapped = eocData.map(function(row, i) {
      return {index: i, value: row.substr(366,4)};
    });  // temporary array holds objects with position and sort-value
    
    mapped.sort(function(a, b) {   // sorting the mapped array containing the reduced values
      if (a.value > b.value) { return -1; }
      if (a.value < b.value) { return 1; }
      return 0; 
    });
    var eocSorted = mapped.map(function(row){ return eocData[row.index]; });  // container for the resulting order
  }
  
  // get array of unique schools
  var districtName = staarData[0].substr(17, 15); //Logger.log('districtName: '+districtName)
  var schoolList = [];
  if(staarData !== undefined) {
    var staarSchoolList = staarData.map(extractSchool);
    pushArray(schoolList,staarSchoolList);
  }
  if(eocSorted !== undefined) {
    var eocSchoolList = eocSorted.map(extractSchool);
    pushArray(schoolList,eocSchoolList);
  }
  
  function onlyUnique(value, index, array) { return array.indexOf(value) === index; }
  var uniqueSchools = schoolList.filter(onlyUnique);
  Logger.log('Unique schools found: '+ uniqueSchools.length);
  Logger.log('uniqueSchools: '+ uniqueSchools);
  if (uniqueSchools.length > 10) { Logger.log('More than 10 schools.'); }
  var zip = uniqueSchools.length > 5 ? true : false;
  
  //get Keys
  var keySpreadSheet = SpreadsheetApp.openById('1TaAwbd5TyXcl45I9NPwQ6QqX1SurVM49serZ63xf7cg');
  var staarKey = keySpreadSheet.getSheetByName(year +' '+'STAAR').getDataRange().getValues();
  var eocKey = keySpreadSheet.getSheetByName(year +' '+'EOC').getDataRange().getValues();
  
  //District report
  Logger.log('Now parsing district: '+ districtName);
  var newSpreadSheet = isdTemplate.copy(districtName), 
      id = newSpreadSheet.getId();
  // moveFile(id,districtFolder)
  
  var districtCountSheet = newSpreadSheet.getSheetByName('Counts');
  var districtGradRange = districtCountSheet.getRange('B27');
  var districtGradCountRange = districtCountSheet.getRange('C27:N28');
  var districtGradCounts = [], 
      districtGradRate = parsedGradRates[0][1]; 
  Logger.log('districtGradRate: '+ districtGradRate);
  districtGradRange.setValue([districtGradRate]);
  
  //find and write district graduation rates
  var districtGradCounts = parsedGradRates.filter(function(el) { return el.school == 'DISTRICT'; });
  var numerators = [], 
      denominators = [];
  for (var i in subgroups) {
    numerators.push(districtGradCounts.filter(function(el) { return el.group == subgroups[i]; }).map(function(a) { return a.numerator; }))
    denominators.push(districtGradCounts.filter(function(el) { return el.group == subgroups[i]; }).map(function(a) { return a.denominator; }))
  }
  var gradResults = []; 
  gradResults.push(numerators); 
  gradResults.push(denominators); // Nate: This could be gradResults.push(numerators, denominators);
  var range = districtCountSheet.getRange(27,3,gradResults.length,gradResults[0].length);
  range.setValues(gradResults);
  
  //write CCMR data to sheet
  try {
    var ccmrTargetRange = newSpreadSheet.getSheetByName('CCMRData').getRange(2,1,ccmrData.length,ccmrData[0].length);
    ccmrTargetRange.setValues(ccmrData);
  } catch(err) {
    Logger.log('No CCMR Data for District');
  }

  //push STAAR data to array
  var staarArray = [];
  for (var i in staarData) {
    var rowData = [], 
        superslice = staarData[i].toString();
    for (var j = 1; j < staarKey.length; j++) {
      if (staarKey[j][5] === 'X') { continue; }
      var subslice = superslice.slice(staarKey[j][0] - 1, staarKey[j][1]).trim();
      rowData.push(subslice);
    }
    //get reading score codes
    var readingCYScoreCode = [];
    readingCYScoreCode = [superslice[350].trim(),superslice[2261].trim(),superslice[2291].trim()] //trim is probably unnecessary here
    var readingPYScoreCode = [];
    readingPYScoreCode = [superslice[2511].trim(),superslice[2541].trim(),superslice[2571].trim()] //trim is probably unnecessary here

    if (!scoreCodeRegex.test(readingCYScoreCode.join())) {//why not join in a separate var, then future references to individual cells use array position
      rowData.push('','','','','','','','','')
    } else { 
      rowData.push('S'); 
    
      //get reading scale scores
      var readingCYScaleScores = [], 
          readingPYScaleScores = [];

      for (var c=0; c<3; c++) {
        if (readingCYScoreCode[c]=='S') { 
          var readingCYScaleScore = parseInt(superslice.slice(readingCYScaleScoreStarts[c],readingCYScaleScoreEnds[c]),10);
          readingCYScaleScores.push(isNaN(readingCYScaleScore) ? 0 : readingCYScaleScore); 
        } else {
          readingCYScaleScores.push('');
        }
        if (readingPYScoreCode[c]=='S') { 
          var readingPYScaleScore = parseInt(superslice.slice(readingPYScaleScoreStarts[c],readingPYScaleScoreEnds[c]),10);
          readingPYScaleScores.push(isNaN(readingPYScaleScore) ? 0 : readingPYScaleScore); 
        } else {
          readingPYScaleScores.push('');
        }
      }
    
      var readingCYMaxIndex = maxIndex(readingCYScaleScores), 
          readingPYMaxIndex = maxIndex(readingPYScaleScores);
        
      //get reading test versions
      var readingCYTestVersions = superslice[413]+superslice[2260]+superslice[2290].trim();
      if (readingCYTestVersions.length > 0) {
        if (testVersionsRegex.test(readingCYTestVersions)) {
          rowData.push('T');
        } else {
          rowData.push('S');
        }
      }
    
      //get CY reading performance and progress
      rowData.push(superslice[readingCYApproachesStart[readingCYMaxIndex]]);
      rowData.push(superslice[readingCYMeetsStart[readingCYMaxIndex]]);
      rowData.push(superslice[readingCYMastersStart[readingCYMaxIndex]]);
      rowData.push(superslice[readingCYProgressStart[readingCYMaxIndex]]);
    
      var readingPYScoreCodes = superslice[2511]+superslice[2541]+superslice[2571].trim();
      if (!scoreCodeRegex.test(readingPYScoreCodes)) {
        rowData.push('','','')
      } else {
        rowData.push(superslice[readingPYApproachesStart[readingCYMaxIndex]]);
        rowData.push(superslice[readingPYMeetsStart[readingCYMaxIndex]]);
        rowData.push(superslice[readingPYMastersStart[readingCYMaxIndex]]);
      }
    }
    //get math score codes    
    var mathCYScoreCode = [];
        mathCYScoreCode = [superslice[351].trim(),superslice[2321].trim(),superslice[2351].trim()]; //trim is probably unnecessary here
    var mathPYScoreCode = []
        mathPYScoreCode = [superslice[2631].trim(),superslice[2661].trim(),superslice[2690].trim()]; //trim is probably unnecessary here

    if (!scoreCodeRegex.test(mathCYScoreCode.join())) {
     rowData.push('','','','','','','','','');
    } else {
      rowData.push('S');
    
      //get math scale scores
      var mathCYScaleScores = [], 
          mathPYScaleScores = [];

      for (var c=0; c<3; c++) {
        if (mathCYScoreCode[c]=='S') { 
          var mathCYScaleScore = parseInt(superslice.slice(mathCYScaleScoreStarts[c],mathCYScaleScoreEnds[c]),10);
          mathCYScaleScores.push(isNaN(mathCYScaleScore) ? 0 : mathCYScaleScore); 
        } else {
          mathCYScaleScores.push('');
        }
        if (mathPYScoreCode[c]=='S') { 
          var mathPYScaleScore = parseInt(superslice.slice(mathPYScaleScoreStarts[c],mathPYScaleScoreEnds[c]),10);
          mathPYScaleScores.push(isNaN(mathPYScaleScore) ? 0 : mathPYScaleScore);
        } else {
          mathPYScaleScores.push('');
        }
      }
    
      var mathCYMaxIndex = maxIndex(mathCYScaleScores), 
          mathPYMaxIndex = maxIndex(mathPYScaleScores);
        
      //get math test versions
      var mathCYTestVersions = superslice[413]+superslice[2260]+superslice[2291].trim();
      if (mathCYTestVersions.length > 0) {
        if (testVersionsRegex.test(mathCYTestVersions)) {
          rowData.push('T');
        } else {
          rowData.push('S');
        }
      }
      
      //get CY math performance and progress
      rowData.push(superslice[mathCYApproachesStart[mathCYMaxIndex]]);
      rowData.push(superslice[mathCYMeetsStart[mathCYMaxIndex]]);
      rowData.push(superslice[mathCYMastersStart[mathCYMaxIndex]]);
      rowData.push(superslice[mathCYProgressStart[mathCYMaxIndex]]);
      
      var mathPYScoreCodes = superslice[2631]+superslice[2661]+superslice[2691].trim();

      if (!scoreCodeRegex.test(mathPYScoreCodes)) {
        rowData.push('','','');
      } else {
      rowData.push(superslice[mathPYApproachesStart[mathCYMaxIndex]]);
      rowData.push(superslice[mathPYMeetsStart[mathCYMaxIndex]]);
      rowData.push(superslice[mathPYMastersStart[mathCYMaxIndex]]);
      }
    }
    staarArray.push(rowData);
  }

  //add in EOCs
  if (eocSorted !== undefined) {
    var eocArray = [], 
        groupedTests=[], 
        bestTests=[];
    Logger.log ('District EOC length: '+ eocSorted.length);
    for (var t in testCodes) {
      var testCode = testCodes[t];
      groupedTests[t] = eocSorted.filter(checkTest);
      var idIndex = groupedTests[t].map(getIds); //Logger.log('idIndex.length: '+idIndex.length);
      var uniqueIdList = idIndex.filter(onlyUnique);
      Logger.log(testCodes[t]+' tests: '+ groupedTests[t].length +', unique: '+ uniqueIdList.length);
      bestTests[t] = groupedTests[t].filter(isBest);
    }
    for (var w in bestTests) {
      if (bestTests[w].length == 0) {
        continue;
      } else {
        Logger.log('Now parsing '+ testCodes[w] +' tests: '+bestTests[w].length);
        for (var x in bestTests[w]) {
          var rowData = [];
          var superslice = bestTests[w][x].toString();          
          for (var j = 1; j < eocKey.length; j++) {
            if (eocKey[j][5] == 'X') {
              continue;
            }
            else if (eocKey[j][5] !== '*' && eocKey[j][5] !== testCodes[w][0]) {
              rowData.push('');
              continue;
            }
            else {
              var subslice = superslice.slice(eocKey[j][0]-1, eocKey[j][1]);
              var finalslice = subslice.toString().trim();
              rowData.push(finalslice);
            }
          }
          staarArray.push(rowData);
        }
      }
    }
  }
  Logger.log('final dimensions: '+ staarArray.length);
  var dataRange = newSpreadSheet.getSheetByName('TestData').getRange(2,1,staarArray.length,staarArray[0].length);
  for (x = 0; x < staarArray.length; x+=100){
    Logger.log('row '+x+' length: '+staarArray[x].length)
  }
  dataRange.setValues(staarArray);  
  SpreadsheetApp.flush();
  blobs.push(convertPDFtoBlob(id, districtName));
  
  //filter the arrays and write to sheets
  for (var k=0; k<uniqueSchools.length; k++) {
    Logger.log('Now parsing school '+k+': '+uniqueSchools[k]);
    //if (k>10){Logger.log('Reached 10 schools max');break}
    var staarDataForThisSchool = staarArray.filter(checkSchool);
    Logger.log('staarArray.length for '+ uniqueSchools[k] +': '+ staarDataForThisSchool.length);
    var schoolId = staarDataForThisSchool[0].toString().substr(11,9);
    Logger.log(uniqueSchools[k]+' CDC number is '+schoolId);  //leading apostrophe?
    var newSpreadSheet = template.copy(uniqueSchools[k]), 
        id = newSpreadSheet.getId();
    
    // grad data
    try {
      var filteredGradRates = parsedGradRates.filter(function(value,index) { return value[0]==schoolId; });
      var gradRate = filteredGradRates[0][1],
          aeaGradRate = filteredGradRates[1][1];
    } catch(err) { 
      Logger.log('No grad rate for school '+uniqueSchools[k]);
    }
    Logger.log('gradRate for school '+uniqueSchools[k]+': '+gradRate);
//    if (gradRate != undefined&& aeaGradRate != undefined) {
//      var schoolCountsSheet = newSpreadSheet.getSheetByName('Counts');
//      var gradRange = schoolCountsSheet.getRange('B27:B28');
//      gradRange.setValues([[gradRate],[aeaGradRate]]);
//    }
    
    var gradCountsForThisSchool = parsedGradRates.filter(function(el) { return el.school == schoolId; });
    if (gradCountsForThisSchool != undefined) {
      try {
        var numerators = [], 
            denominators = [];
        numerators[0] = gradRate;
        denominators[0] = aeaGradRate;
        for (var i in subgroups) {
          numerators.push(gradCountsForThisSchool.filter(function(el) { return el.group == subgroups[i]; }).map(function(a) { return a.numerator; }))
          denominators.push(gradCountsForThisSchool.filter(function(el) { return el.group == subgroups[i]; }).map(function(a) { return a.denominator; }))
        }
        var gradResults = []; 
        gradResults.push(numerators); 
        gradResults.push(denominators);
        Logger.log('gradResults: '+ gradResults);
          if (gradRate != undefined&& aeaGradRate != undefined) {
            var schoolCountsSheet = newSpreadSheet.getSheetByName('Counts');
            var gradRange = schoolCountsSheet.getRange(27,2,gradResults.length,gradResults[0].length) //'B27:N28'
            gradRange.setValues(gradResults);}
      } catch(err) {
        Logger.log('No grad counts for school '+uniqueSchools[k]);
      }
    }
    
    try {
      var ccmrDataForThisSchool = ccmrData.filter(ccmrCheckSchool);
      var ccmrTargetRange = newSpreadSheet.getSheetByName('CCMRData').getRange(2,1,ccmrDataForThisSchool.length,ccmrDataForThisSchool[0].length);
      ccmrTargetRange.setValues(ccmrDataForThisSchool);
    } catch(err) {
      Logger.log('No CCMR data for school '+uniqueSchools[k]);
    }
    
    var dataRange = newSpreadSheet.getSheetByName('TestData').getRange(2,1,staarDataForThisSchool.length,staarDataForThisSchool[0].length);
    dataRange.setValues(staarDataForThisSchool);
    SpreadsheetApp.flush(); // remove this line if using folder build method
    blobs.push(convertPDFtoBlob(id, uniqueSchools[k].trim())); // remove this line if using folder build method
  };
  /*
  if (zip == true) {
    zipBlobs.push(Utilities.zip(blobs).setName('A-F Reports.zip'));
    var attach = zipBlobs;
  } else {
    var attach = blobs;
  }
  emailBlobs(attach, to);  //turn back ON when done testing 8/2/18
  */
}