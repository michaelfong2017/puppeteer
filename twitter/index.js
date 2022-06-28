const puppeteer = require('puppeteer')
require('dotenv').config()

const main = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto('https://twitter.com/i/flow/login');

    await login(page)

    // await browser.close();
}

const login = async (page) => {
    var x, e

    x = "(//input[@name='text'])[1]"
    await page.waitForXPath(x)
    e = (await page.$x(x))[0]
    await e.type(process.env.TWITTER_LOGIN_IDENTIFIER);

    // The selected element is a button, and one of its descendant has text 'Next'

    // x = "(//div[@dir='auto'])[7]"
    // await page.waitForXPath(x)
    // e = (await page.$x(x))[0]
    // console.log(e)
    // text = await e.evaluate(el => el.textContent)
    // console.log(text)
    x = "(//div[@role='button' and .//span[text() = 'Next']])[1]"
    await page.waitForXPath(x)
    e = (await page.$x(x))[0]
    await e.click()

    x = "(//input[@name='password'])[1]"
    await page.waitForXPath(x)
    e = (await page.$x(x))[0]
    await e.type(process.env.TWITTER_LOGIN_PASSWORD);

    x = "(//div[@role='button' and .//span[text() = 'Log in']])[1]"
    await page.waitForXPath(x)
    e = (await page.$x(x))[0]
    await e.click()
}

main()