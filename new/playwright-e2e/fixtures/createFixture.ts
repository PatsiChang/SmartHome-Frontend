// Use Fixture to help manage the setup and teardown of resources for your tests, like creating and cleaning up test data, initializing browser contexts, handling authentication

// - Helps inject pages required for the testing scripts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage"
import { SignUpPage } from "../pages/signUpPage";

type CreateFixture = {
    loginPage: LoginPage;
    signUpPage: SignUpPage;

}

export const test = base.extend<CreateFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signUpPage: async ({ page }, use) => {
        await use(new SignUpPage(page));
    }
})

