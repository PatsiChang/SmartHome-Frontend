import { Page } from "@playwright/test";
const { test, expect } = require('@playwright/test')

type TestArg = {
    page: Page
}
//Basics
test("My first test", async () => {
    expect(12).toBe(12);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();

})
//only|skip - right now the test will be skipped
test.skip("Testing only and Skip", async () => {
    expect(100).toBe(101);

})

//Testing Strings
test("Testing Strings", async () => {
    expect("Testing toContain").toContain(" toContain");
    expect("Testing includes".includes("includes")).toBeTruthy();

})

//Testing Google
test("Testing Google", async ({ page }: TestArg) => {
    await page.goto("https://google.com");
    console.log("URL is ", page.url());
    console.log("Title is ", await page.title());

    await expect(page).toHaveTitle("Google")

})
//Testing Solopress real website
test("Solopress", async ({ page }: TestArg) => {
    await page.goto("https://www.solopress.com/?ppc_keyword=solopress&gad_source=1&gclid=CjwKCAjw-JG5BhBZEiwAt7JR6wDweVzG4aNZICA4b2xqIuF8Q5RAphdLgcrDLkBCTwydalQkFeMn4BoCt4sQAvD_BwE")
    console.log("URL is ", page.url());
    console.log("Title is ", await page.title());
})

//Testing DropDown --Syntax
test.skip("Select Dropdown Values", async ({ page }: TestArg) => {
    await page.goto("");
    //label | value | index(This includes the default one - 0)
    await page.locator("").selectOption({ label: "" });
    await page.waitForTimeout(3000);

    const value = await page.locator("").textContent();
    console.log("All dropdown value: ", value);

    // By Loop ($ and $$ are NOT jQuery)
    //$ - Selects the element with id "state"
    //$$ - Selects all "option" elements within that "option" element
    let state = await page.$("#state");
    let allElements = await state?.$$("option");

    if (allElements) {
        allElements.forEach((element) => {
            console.log("Dropdown value: ", element.textContent());
        })

    }
})