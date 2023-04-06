const puppeteer = require("puppeteer");

export const SCRAPING_RESULT_PATH = {
	PAGE: "public/page.png",
	SELECTOR: "public/element.png"
};

export class Scraper {
	url: string;
	selector: string;
	browser: any;

	constructor(url: string, selector: string) {
		this.url = url;
		this.selector = selector;
		this.browser = null;
	}

	async scrap() {
		try {
			this.browser = await puppeteer.launch();

			const page = await this.browser.newPage();
			await page.goto(this.url);

			await page.screenshot({ path: SCRAPING_RESULT_PATH.PAGE });

			if (this.selector) {
				await page.waitForSelector(this.selector);
				const element = await page.$(this.selector);
				await element.screenshot({ path: SCRAPING_RESULT_PATH.SELECTOR });
			}

			await this.browser.close();
		} catch (error) {
			console.error(error);
		}
	}
}
