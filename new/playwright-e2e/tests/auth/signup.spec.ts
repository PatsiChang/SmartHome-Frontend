import { Page } from "@playwright/test";

const { test, expect } = require('@playwright/test')

type TestArg = {
    page: Page;
}

test("Valid Login", async ({ page }: TestArg) => {

    await page.goto("http://localhost:3000/signupPage");
    await page.locator('#input_userId').fill('TestSalt1');
    await page.locator('#input_password').click();
    await page.locator('#input_password').fill('TestSalt1');
    await page.getByText('login').click();

    await expect(page).toHaveURL("http://localhost:3000/loginPage");
})

// test("Invalid Login", async ({ page }: TestArg) => {

//     await page.goto('http://localhost:3000/loginPage');
//     // await page.goto("http://localhost:3000/loginPage?redirect=%2FafterLoginPage");
//     await page.locator('#input_userId').fill('TestSalt1');
//     await page.locator('#input_password').click();
//     await page.locator('#input_password').fill('TestSalt3');
//     await page.getByText('login').click();

//     const errMsg = page.locator('div').filter({ hasText: /^Your Password does not match your User Id!$/ });
//     console.log("errMsg", errMsg)
//     expect(errMsg).toBeDefined();
// })