const express = require("express");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();
const WAIT_FOR_PAGE = 5000;
const DELAY_USER_INPUT = 100;
const DELAY_PW_INPUT = 100;

const PORT = 8000;
const app = express();

app.get("/", function (req, res) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://github.com/");
    await page.screenshot({ path: `${__dirname + "/images/example2.png"}` });

    await browser.close();
    res.status(200).send("Hello world");
  })();
});

app.get("/test", (req, res) => {
  const filepath = "/images/example2.png";
  res.sendFile(__dirname + filepath);
});

app.get("/fb", (req, res) => {
  function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(process.env.LEVAK_POLICIJE, [
      "notifications",
    ]);
    const page = await browser.newPage();
    await page.goto(process.env.LEVAK_POLICIJE);
    await page.type("#email", process.env.FB_USER, { delay: DELAY_USER_INPUT });
    await page.type("#pass", process.env.FB_PW, { delay: DELAY_PW_INPUT });
    await page.click("._6ltg");
    // await page.waitForSelector("userContentWrapper");

    
    await delay(WAIT_FOR_PAGE);
    await page.click('input[type="search"]');
    // await page.type(".a8c37x1j", "Linh Duong Lan Ngoc", { delay: DELAY_PW_INPUT });
    await page.keyboard.type('Linh Duong Lan Ngoc');
    await page.keyboard.press(String.fromCharCode(13));
    await delay(WAIT_FOR_PAGE);
    await page.click(".qzhwtbm6")     
    // knvmm38d
    // const elems = await page.evaluate(() => {
    //   const infos = Array.from(
    //     document.querySelectorAll(".userContentWrapper")
    //   );

    //   return infos.map((info) => {
    //     const array = info.innerText.split("\n");
    //     return array.slice(3, 4);
    //   });
    // });

    // console.log(elems);
  })();
});

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
