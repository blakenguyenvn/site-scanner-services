import { Request, Response, NextFunction } from "express";
import { Scraper } from "../shared/Scraper";
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "";

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
	await scraper.scrap();

	response.status(200).json({
		success: true,
		result: {
			page: `${BASE_URL}/${scraper.result?.page}`,
			selector: `${BASE_URL}/${scraper.result?.selector}`
		}
	});
};
