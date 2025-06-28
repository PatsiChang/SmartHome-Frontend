import { Locator, Page } from "@playwright/test";
import { fillForm } from '../helpers/formHelper';

//Do not use assertion here
//Do all page interaction here
export class SignUpPage {
    readonly page: Page;
    readonly userIdInputLocator: Locator;
    readonly passwordInputLocator: Locator;
    readonly loginButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userIdInputLocator = page.getByText('login');
        this.passwordInputLocator = page.getByText('login');
        this.loginButtonLocator = page.getByText('login');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async login(userId: string, password: string) {
        await fillForm(this.page, {
            '#input_userId': userId,
            '#input_password': password,
        });
        await this.loginButtonLocator.click();
        // await this.page.waitForLoadState();
    }


}