//Prerequisites:
//  Assumes this script is tied to an existing Google Form
//  Assumes the Google Sheet has script associated where this code would go (On Sheet page: Tools > Script Editor)
//  Assumes the Script has triggers set (this oe would be 'on open') (On Script page: Edit > Current project's triggers)
//    NOTE may need to check triggers/script page to ensure permissions are enabled/accepted


function onOpen(e) {
  var form = FormApp.openById("<ID_HERE>"); 
  
  //TODO optionally dynamically generate options from other data
  // such as another spreadsheet and/or calculations based on current spreadsheet

  //Get all form items of a particular type
  //Here we're assuming the items we want to edit are Lists and in a particular order
  var formItems = form.getItems(FormApp.ItemType.LIST);

  var formItem1 = formItems[0].asListItem();
  formItem1.setChoiceValues([
    "A",
    "B"
  ]); 
  
  var formItem2 = formItems[1].asListItem();
  formItem2.setChoiceValues([
    "C",
    "D"
  ]);
  
}