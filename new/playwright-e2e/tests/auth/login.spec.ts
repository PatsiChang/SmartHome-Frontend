import { LoginPage } from "@/playwright-e2e/pages/loginPage";
import { Page } from "@playwright/test";
import { userId, password } from "../../testData/auth/validUser.json";

const { test, expect } = require('@playwright/test')

type TestArg = {
    page: Page;
}

test.describe('Login', () => {
    test('should allow user to login with valid credentials', async ({ page }: TestArg) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('http://localhost:3000/loginPage?redirect=%2FafterLoginPage');
        await loginPage.login(userId, password);
        await expect(page).toHaveURL("http://localhost:3000/afterLoginPage");
    });

    test("Invalid Login", async ({ page }: TestArg) => {
        await page.goto('http://localhost:3000/loginPage');
        await page.locator('#input_userId').fill('TestSalt1');
        // await page.locator('#input_password').click();
        await page.locator('#input_password').fill('TestSalt3');
        await page.getByText('login').click();

        const errMsg = page.locator('div').filter({ hasText: /^Your Password does not match your User Id!$/ });
        console.log("errMsg", errMsg)
        expect(errMsg).toBeDefined();
        // await page.getByText('Your Password does not match').click();
        // await expect(page).toContain("Your Password does not match");
    })
});


// test("Valid Login", async ({ page }: TestArg) => {

//     await page.goto("http://localhost:3000/loginPage?redirect=%2FafterLoginPage");
//     await page.locator('#input_userId').fill('TestSalt1');
//     await page.locator('#input_password').click();
//     await page.locator('#input_password').fill('TestSalt1');
//     await page.getByText('login').click();

//     await expect(page).toHaveURL("http://localhost:3000/afterLoginPage");
// })


