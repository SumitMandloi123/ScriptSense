import { Page } from "@playwright/test";
import * as dotenv from "dotenv";
import selectors from "../../resources/selectors/login.json";
dotenv.config();

export default class LoginPage {
    private page: Page;
    private selectors = selectors;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToWebsite() {
        await this.page.goto("https://dev.scriptsense.co.nz/");
    }

    async clickLoginIcon() {
        const popupPromise = this.page.waitForEvent("popup");
        await this.page.locator(this.selectors.loginIcon).first().click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        return popup;
    }

    async login(username: string, password: string) {
        const popup = await this.clickLoginIcon();
        

        if (!username || !password) {
            throw new Error("Missing login credentials in .env file");
        }
        await popup.locator(this.selectors.emailInput).fill(username);
        await popup.locator(this.selectors.passwordInput).fill(password);
        await popup.locator(this.selectors.signInButton).click();
        // await popup.waitForTimeout(5000);
    }
}