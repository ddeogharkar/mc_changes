export class EventsPageObjects {
  OBJ_EVENTS_BUTTON = "//button[@title='Events']";
  OBJ_EVENTSLIST = "//div[@class='mc-event-details']//div[@class='mc-event-title']//a";
  OBJ_VIEW_ALL_LINK_GLOBAL = "(//div[@class='mc-ViewAll'])[1]//a";
  OBJ_EVENTS_POP_UP_HOME_PAGE = "//div[contains(@class,'ms-iframeDialogOverride')]";
  OBJ_EVENTS_POPUP_IFRAME = "//iframe[@id='mc-frame-element']";
  OBJ_CLOSE_BTN_POP_UP = "(//input[@value='Close'])[2]"
  OBJ_GLOBAL_VIEW_ALL_LINK = "(//div[@class='mc-ViewAll'])[1]//a"
  OBJ_CALENDAR_VIEW_BTN = "//a[@id='SwitchToCalender']"
  OBJ_MONTH_ON_EVENTS_CARD = "//span[@class='mc-card-calendar-month']"
  OBJ_DAY_ON_EVENTS_CARD = "//span[@class='mc-card-calendar-day']"
  OBJ_CAREGORY_ON_EVENTS_CARD = "//div[@class='mc-card-calendar-category']"
  OBJ_TITLE_ON_EVENTS_CARD = "//div[@class='mc-card-calendar-title']"
  OBJ_DATE_ON_EVENTS_CARD = "//div[@class='mc-card-calendar-desc']"
  OBJ_ADD_To_CALENDAR_ON_CARD = "(//div[@class='mc-card-calendar-item'])[2]//span[@class='mc-card-calendar-calltoaction']//span"
  OBJ_EVENTS_CARDS_ON_LANDING_PAGE = "//div[@class='mc-card-calendar-item']"
  OBJ_EVENTS_CARD_TITLES_ON_LANDING_Page = "//div[@class='mc-card-calendar-item']//div[@class='mc-card-calendar-title']"
  OBJ_EVENT_POP_UP_ON_LANDING_PAGE = "//div[@class='ms-dlgContent']"
  OBJ_EVENT_POP_UP_IFRAME_ON_LANDING_PAGE = "//iframe[@class='ms-dlgFrame']"
  OBJ_CLOSE_BTN_ON_EVENT_POP_UP_ON_LANDING_PAGE = "(//input[contains(@id,'GoBack')])[2]"
}