export class MCTV_PodcastPageObjects {
  OBJ_MCTV_PODCAST_WEBPART_TITLE = "//div[@id='mc-mctv-container']//h1"
  OBJ_FRAME_MCTV_PODCAST = "//iframe[@class='SC-card-MCTV']"
  OBJ_DOTS = "(//div[@id='root']//div[contains(@class,'feed feed--light feed--flat feed--fill feed--with-carousel')]//nav[@class='feed-carousel feed-carousel--light'])[1]//button"
  OBJ_MCTV_PODCAST_CARD = "//div[@class='feed-list feed-list-padding--compact']//button[@class='content-card--screen-reader-only']"
  OBJ_MCTV_PODCAST_FU_TITLE = "//div[@class='content-info__text']//h3"
  OBJ_MCTV_PODCAST_TITLES = "div.content-card__title>div.content-title"
  OBJ_MCTV_PODCAST_VIEW_ALL_LINK = "//div[@id='mc-mctv-container']//a[text()='View all']"
  OBJ_MCTV_PODCAST_FU_CHANNEL_NAME = "//h5[@class='channel__title']"
}