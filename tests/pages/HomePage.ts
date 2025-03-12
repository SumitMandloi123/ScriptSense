import { Page, expect } from "@playwright/test";
import selectors from "../../resources/selectors/home.json";

export default class HomePage {
    private page: Page;
    private selectors = selectors;

    constructor(page: Page) {
        this.page = page;
    }

    async clickDispense() {
        await this.page.locator(this.selectors.dispenseButton).click();
    }

    async disablePrintUtility() {
        await this.page.waitForTimeout(5000); // Initial wait

        // Navigate to the settings page where the toggle button is located
        await this.page.goto("https://dev.scriptsense.co.nz/settings/printers", { waitUntil: "domcontentloaded" });

        // Wait for the toggle button to be visible and enabled before clicking
        const toggleLocator = this.page.locator(this.selectors.toggleButton);
        await toggleLocator.waitFor({ state: "visible", timeout: 15000 });
        await toggleLocator.waitFor({ state: "attached" });
        await toggleLocator.click();
        await this.page.waitForTimeout(3000);

        // Navigate back to the home page
        await this.page.goto("https://dev.scriptsense.co.nz/contact", { waitUntil: "domcontentloaded" });
        await this.page.waitForTimeout(3000);
    
    }

    async searchPatient(NHI: string) {
        await this.page.locator(this.selectors.tabNHI).click();
        await this.page.locator(this.selectors.inputFieldNHI).fill(NHI);
        await this.page.locator(this.selectors.searchButton).click();
        
        await this.page.locator(this.selectors.patientOption).click();
    }

    async createDispense() {
        // Click "Manual Dispense" button
        await this.page.locator(this.selectors.manualDispenseButton).click();
    
        // Click "Internal" tab
        await this.page.locator(this.selectors.internalTab).click();
    
        // Type and select prescriber name
        const prescriberInput = this.page.locator(this.selectors.searchPrescriberPlaceholder);
        await prescriberInput.fill("Dummy");
        await prescriberInput.click();
        await this.page.waitForTimeout(1000);
        await prescriberInput.press("Backspace");
        await this.page.waitForTimeout(500);
        await prescriberInput.press("ArrowDown");
        await prescriberInput.press("Enter");
    
        await this.page.waitForTimeout(2000);
    
        // Type and select medicine
        const medicineInput = this.page.locator(this.selectors.medicinePlaceholder);
        await medicineInput.fill("Saradon");
        await this.page.waitForTimeout(1000);
        await medicineInput.press("ArrowDown");
        await medicineInput.press("Enter");
    
        await this.page.waitForTimeout(2000);
    
        // Click "End Dispense" button
        const endDispenseButton = this.page.locator(this.selectors.endDispense);
        await endDispenseButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await endDispenseButton.click();
    
        
    }
    
}
