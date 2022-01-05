export class BillboardPageObjects {
  BILLBOARD_WEBPART = "//div[@id='mc-bb-container']";
  BILLBOARD_TITLE = "//div[@id='mc-bb-container']//h1";
  BILLBOARD_DOTS = "//div[@id='mc-bb-container']//button//span[@class='dot']"
  BILLBOARD_DOT_LIST = "//div[contains(@class,'SC-card-Billboard')]//ul[@class='slick-dots']//li"
  BILLBOARD_CARD_XPATH = "//div[@id='mc-bb-container']//div[@class='slick-slide slick-active slick-current']//div[@class='mc-hub--hero']"
  BILLBOARD_SINGLE_CARD = "(//div[@id='mc-bb-container']//div[@class='slick-slide slick-active slick-current']//div[@class='mc-hub--hero'])[1]";
  BILLBOARD_CARD_LINK = "(//div[@id='mc-bb-container']//div[@class='slick-slide slick-active slick-current']//a)[1]";
}

export default BillboardPageObjects