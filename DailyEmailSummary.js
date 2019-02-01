//Prerequisites:
//  Assumes the data for this sheet is generated from a Google Form it's tied to
//  Assumes the Google Sheet has script associated (On Sheet page: Tools > Script Editor)
//  Assumes the Script has triggers set (in this case a cron trigger) (On Script page: Edit > Current project's triggers)
//    NOTE may need to check triggers/script page to ensure permissions are enabled/accepted


function dailySummary(){
  // This sheet has two tabs - one for responses and one for admins 
  var tabs = ["form_responses", "admin_emails"];
  
  var sheet = SpreadsheetApp.getActive();
  var responsesTab = sheet.getSheetByName(tabs[0]);
  var adminTab = sheet.getSheetByName(tabs[1]);

  var responsesDataRange = responsesTab.getDataRange();
  var responsesData = responsesDataRange.getValues();
    
  // Reminder emails for respondents
  for (var i = 1; i < responsesData.length; i++) {
    (function(val) {
      var row = responsesData[i];
      
      // For each row, get data mapping to column
      var sumittedTime = row[0];
      var emailAddress = row[1];
      var apptType = row[2];
      var firstName = row[4]; 
      var apptDate = null;  //TODO continue to fill in as appropriate 
      var apptTime = null;
      
      var feedbackLink = "www.google.com"; //TODO update with some survey link
      
      var subject = "Reminder - " + apptType + " Appointment Today";
      var messageBodyHtml = 
          "We've received your request for a " + apptType + " appointment on " + apptDate + " at " + apptTime + ".<br>"+
            "A staff member will review your request and let you know if it is approved via email.<br><br>" + 
              "Have a fantastic day!<br><br>" +
                "- Staff" +
                  "Have feedback? Submit <a href='" + feedbackLink + "'>here</a>"
      
      var message = {
        to: emailAddress,
        subject: subject,
        htmlBody: messageBodyHtml, 
        name: "Automatic Emailer Script", //TODO can also add attatchments
      };
      
      MailApp.sendEmail(message); 
      })(i);
   }
  
  // Admin daily summary emails 
  //TODO optionally can move this to separate method and have this email sent at a different time
  var adminDataRange = adminTab.getDataRange();
  var adminData = adminDataRange.getValues();
  for (var i = 1; i < adminData.length; i++) {
    (function(val) {
      var row = adminData[i];
      
      var emailAddress = row[0];
      var firstName = row[1]; 

      var subject = "Daily Schedule - ";
      //TODO generate nice HTML table of responses for the day
      var messageBodyHtml = 
          "Dear " + firstName + "<br>Here is the schedule for today ____";
      
      var message = {
        to: emailAddress,
        subject: subject,
        htmlBody: messageBodyHtml, 
        name: "Automatic Emailer Script", //TODO can also add attatchments
      };
      
      MailApp.sendEmail(message);
      })(i);
   }
  
}