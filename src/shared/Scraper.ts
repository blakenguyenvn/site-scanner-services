const puppeteer = require("puppeteer");
const uuid = require("uuid");

const generateFilePath = (name: string) => {
	return `public/${name}_${uuid.v4()}.png`;
};

export class Scraper {
	url: string;
	selector: string;
	browser: any;
	result: any;

	constructor(url: string, selector: string) {
		this.url = url;
		this.selector = selector;
		this.browser = null;
		this.result = null;
	}

	async scrap() {
		try {
			this.browser = await puppeteer.launch();
			this.result = {
				page: generateFilePath("page"),
				selector: generateFilePath("selector")
			};

			const page = await this.browser.newPage();
			await page.goto(this.url);
			await page.screenshot({ path: this.result.page });

			if (this.selector) {
				await page.waitForSelector(this.selector);
				const element = await page.$(this.selector);
				await element.screenshot({ path: this.result.selector });
			}

			await this.browser.close();
		} catch (error) {
			console.error(error);
		}
	}
}
