export class CommonPageObjects {
  OBJ_SEARCH_BOX = "//div[@id='SearchBox' and @class='ms-floatLeft']//input"
  OBJ_SEARCH_ICON = "(//a[@class='ms-srch-sb-searchLink'])[2]"
  OBJ_COMMENTS_FIELD = "//div[contains(@class,'fieldGroup_comment')]/textarea[contains(@class,'field_comment')]"
  OBJ_COMMENT_POST_BTN = "//button[text()='Post']"
  OBJ_COMMENT_POSTED = "//label[contains(@class,'comment_text')][1]"
  OBJ_MENU_COMMENT = "(//div[contains(@class,'mccomments')]//span[contains(@class,'comment_delete')]//button[contains(@id,'toggleCallout')])[1]"
  OBJ_COMMENT_DELETE_BTN = "//button[contains(@class,'dropbtn homebtn')]"
  OBJ_YES_BTN_ON_DIALOG = "(//div[contains(@class,'ms-dialogMainOverride')]//button[contains(@class,'ms-Button')])[2]"
}