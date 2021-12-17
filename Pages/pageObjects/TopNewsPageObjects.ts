export class TopNewsPageObjects {
  TOPNEWS_IFRAME = "//iframe[@class='hero-card']"
  TOPNEWS_DOT = "[aria-label='Go to Page 4']"
  TOPNEWS_WEBPART = "//div[@class='mc-hub-container']//div[contains(@class,'mc-hub-surface hero')]"
  TOPNEWS_DOTS = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//nav[@class='feed-carousel feed-carousel--light']//button"
  TOPNEWS_IMAGE = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content__image']"
  TOPNEWS_TITLE = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content-title']"
  TOPNEWS_SUMMARY = "//div[@id='root']//div[contains(@class,'hero feed--with-carousel')]//div[@class='content-summary']"
}