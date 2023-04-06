import { Request, Response, NextFunction } from "express";
import { Scraper, SCRAPING_RESULT_PATH } from "../shared/Scraper";
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "";
console.log("BASE_URL: ", BASE_URL);
interface Site {
	content: any;
	image: string;
}

export const ScrapingController = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { site = "", selector = "" } = request.body;
	const scraper = new Scraper(site, selector);
	const scraperResult = await scraper.scrap();

	response.status(200).json({
		success: true,
		result: {
			page: `${BASE_URL}/${SCRAPING_RESULT_PATH.PAGE}`,
			selector: `${BASE_URL}/${SCRAPING_RESULT_PATH.SELECTOR}`
		}
	});
};
