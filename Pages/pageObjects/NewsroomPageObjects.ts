export class NewsroomPageObjects {
  OBJ_NEWSROOM_WEBPART_TITLE = "//div[@id='mc-nr-container']//h1"
  OBJ_NEWSROOM_CARDS = "//div[contains(@class,'SC-card-Newsroom')]//div[@class='slick-slide slick-active slick-current']//a"
  OBJ_NEWSROOM_ARTICLE_TITLES = "//div[contains(@class,'SC-card-Newsroom')]//div[@class='slick-slide slick-active slick-current']//a//div//div[@class='ourVoices-article']"
  OBJ_NEWSROOM_ARTICLE_AUTHORS = "//div[contains(@class,'SC-card-Newsroom')]//div[@class='slick-slide slick-active slick-current']//a//div//div[@class='ourVoices-author']"
  OBJ_DOTS = "//div[contains(@class,'SC-card-Newsroom')]//button"
  VIEW_ALL_LINK = "//div[@id='mc-nr-container']//a[text()='View all']"
}