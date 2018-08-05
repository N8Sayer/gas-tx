function emailBlobs(attach, to) {
  //email the PDFs
  var emailsubject = "2018 A-F Accountability Summaries"
  var body = "Your reports have landed! You can reply to this email if you have any questions or need any additional information."
  body += "\n\nwww.copilotdata.com    Together we fly higher    817-752-4766";
  body += "\n\nImportant disclaimer: These reports and all data within are for illustrative purposes only. Official ratings and designations come only from the Texas Education Agency.";
  body += "";

  Logger.log('Quota '+MailApp.getRemainingDailyQuota())
  MailApp.sendEmail(to, emailsubject, body, {
     name: 'CoPilot Data Solutions',
     attachments: attach
  });
}
