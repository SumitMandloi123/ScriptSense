import { test, expect, BrowserContext, Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import * as dotenv from "dotenv";

dotenv.config();

test.describe.serial("CreateDispense", () => {
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
    }); 

    test("Login to the application", async () => {
        await loginPage.navigateToWebsite();
        await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
        
        // Ensure login is successful before proceeding
        await expect(page.locator("//a[normalize-space()='Dispense']")).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(5000);
    });

    test("Create a new manual dispense", async () => {
        await homePage.disablePrintUtility();
        await homePage.clickDispense();
        await homePage.searchPatient("ZAU8023");
        await homePage.createDispense();
    });

    test.afterAll(async () => {
        await context.close();
    });
});
