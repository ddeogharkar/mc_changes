import { expect } from "@playwright/test";
import testData from "../Data/appData.json";
import test from "../fixture/baseTest";

test.describe("Validate Events functionality", () => {
  //Login to theHeb application
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.NavigateToUrl(testData.homePageUrl);

    await loginPage.loginToApplication(
      testData.stageUserName,
      testData.password,
      testData.prodUserName
    );
  });

  test("Events_Validate events functionality", async ({ eventsPage }) => {
    await test.step("Test_01_Events_Verify_Events_Link", async () => {
      expect(await eventsPage.VerifyEventsLinkExists()).toBe(true);
    });

    await test.step("Test_02_Events_Verify_Event_Pop_Up_After_Clicking_Event_Link", async () => {
      expect(await eventsPage.VerifyEventPopUpOnHomePage()).toBe(true);
    }
    );

    await test.step("Test_03_Events_Verify_Navigation_To_Events_Landing_Page_After_Clicking_View_All_Link", async () => {
      expect(await eventsPage.VerifyEventsLandingPageOnLickOfViewAllLink()).toBe(true);
    }
    );

    await test.step("Test_04_Events_Verify_Month_On_Event_Card", async () => {
      expect(await eventsPage.VerifyMonthOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_05_Events_Verify_Day_On_Event_Card", async () => {
      expect(await eventsPage.VerifyDayOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_06_Events_Verify_Category_On_Event_Card", async () => {
      expect(await eventsPage.VerifyCategoryOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_07_Events_Verify_Title_On_Event_Card", async () => {
      expect(await eventsPage.VerifyTitleOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_08_Events_Verify_Date_On_Event_Card", async () => {
      expect(await eventsPage.VerifyDateOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_08_Events_Verify_AddToCalendar_On_Event_Card", async () => {
      expect(await eventsPage.VerifyAddToCalendarOnEventCard()).toBe(true);
    }
    );

    await test.step("Test_09_Events_Verify_HoverOverText_On_Event_Card", async () => {
      expect(await eventsPage.VerifyHoverOverTextOnEventsCardsOnLandingPage()).toBe(true);
    }
    );

    await test.step("Test_10_Events_Verify_Valid_Search_On_Events_Landing_Page", async () => {
      expect(await eventsPage.VerifyValidSearchIsWorking()).toBe(true);
    }
    );

    await test.step("Test_11_Events_Verify_Valid_InValid_Search_On_Events_Landing_Page", async () => {
      expect(await eventsPage.VerifySearchWithInvalidTitle()).toBe(true);
    }
    );

    await test.step("Test_12_Events_Verify_Event_Pop_Up_On_Events_Landing_Page", async () => {
      expect(await eventsPage.VerifyEventPopUpOnEventsLandingPage()).toBe(true);
    });

  });
});
