// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const proxyChain = require('proxy-chain');

const launch = async (username, password, ip, port) => {
    const oldProxyUrl = `http://${username}:${password}@${ip}:${port}`;
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    // Prints something like "http://127.0.0.1:45678"
    console.log(newProxyUrl);

    const browser = await puppeteer.launch({
        args: [
            `--proxy-server=${newProxyUrl}`,
            // `--proxy-server=http://${ip}:${port}`,
            '--start-maximized',
        ],
        defaultViewport: null,
        devtools: true,
        headless: false,
        // slowMo: 250,
    });

    // Do your magic here...
    const page = await browser.newPage();
    await page.authenticate({username: username, password: password});
    await page.goto('https://www.google.com');

    // await page.setExtraHTTPHeaders({ referer: "https://premier.hkticketing.com/" })
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36', {
        brands: [
            {
                brand: "Google Chrome",
                version: "113",
            },
            {
                brand: "Chromium",
                version: "113",
            },
            {
                brand: "Not-A.Brand",
                version: "24",
            },
        ],
        fullVersion: "113.0.5672.93",
        fullVersionList: [
            {
                brand: "Google Chrome",
                version: "113.0.5672.93",
            },
            {
                brand: "Chromium",
                version: "113.0.5672.93",
            },
            {
                brand: "Not-A.Brand",
                version: "24.0.0.0",
            },
        ],
        architecture: 'x86',
        mobile: false,
        model: '',
        platform: 'Windows',
        platformVersion: '15.0.0',
    });
    // await page.setViewport({ width: 1080, height: 1024 });

    // const cookies = [ // cookie exported by google chrome plugin editthiscookie
    //     {
    //         "domain": ".hkticketing.com",
    //         // "expirationDate": 1597288045,
    //         // "hostOnly": false,
    //         // "httpOnly": false,
    //         "name": "hkticketing.com+cookies",
    //         // "path": "/",
    //         // "sameSite": "no_restriction",
    //         // "secure": false,
    //         // "session": false,
    //         // "storeId": "0",
    //         "value": "true",
    //         // "id": 1
    //     }
    // ];
    // await page.setCookie(...cookies);

    // await page.goto("https://premier.hkticketing.com/", {
    //     referer: "https://premier.hkticketing.com/"
    // })

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.evaluate(() => {
        // debugger;
        console.log(`url is ${location.href}`)
    });

    debugger;

    await page.screenshot({ path: 'example.png' });
    // await browser.close();

    // Clean up
    // await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
}

(async () => {
    launch("michaelfong2017", "michaelfong1998", "127.0.0.1", "8888");
    // launch("michaelfong2017", "michaelfong1998", "18.163.196.82", "443");
    // launch("michaelfong2017", "michaelfong1998", "54.146.188.110", "8888");
})();

