import { Page } from '@playwright/test';

export async function fillForm(page: Page, formData: { [selector: string]: string }) {
    for (const [selector, value] of Object.entries(formData)) {
        await page.fill(selector, value);
    }
}