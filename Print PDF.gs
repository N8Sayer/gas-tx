function convertPDFtoBlob(id, filename) {
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", id);
  var url_ext = 'exportFormat=pdf&format=pdf' + '&size=letter' + '&fitw=true' + '&sheetnames=false&printtitle=false' + '&pagenumbers=false&gridlines=false' + '&fzr=false';
  var orientation = '&portrait=false'         // orientation, false for landscape
  var token = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(url + url_ext + orientation,{headers: {'Authorization': 'Bearer ' +  token},muteHttpExceptions: true});
  return response.getBlob().setName(filename +' Reports.pdf')
}
