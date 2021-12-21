export class TopNewsPageObjects {
  TOPNEWS_IFRAME = "//iframe[@class='hero-card']"
  TOPNEWS_DOT = "[aria-label='Go to Page 4']"
  TOPNEWS_WEBPART = "//div[@class='mc-hub-container']//div[contains(@class,'mc-hub-surface hero')]"
  TOPNEWS_DOTS = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//nav[@class='feed-carousel feed-carousel--light']//button"
  TOPNEWS_IMAGE = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content__image']"
  TOPNEWS_TITLE = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content-title']"
  TOPNEWS_SUMMARY = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content-summary']"
  TOPNEWS_IMAGE_COLLECTION = "//div[@id='root']//div[1]//div[@class='feed feed--light feed--flat feed--fill feed--hero feed--with-carousel']//div[@class='content__image']"
  FIRSTUP_IMAGE_TITLE = "//div[@class='content-info__text']//h3"
  FIRSTUP_ARROW = "//section[@class='content-details']//a//i";
  VIEW_ALL_LINK = "//div[@class='mc-topnews-viewall']//a[text()='View all']"
  FIRSTUP_CHANEL_NAME = "(//a[@class='channel__link link'])[2]//h5"
}