import express from "express";
import path from "path";
import * as bodyParser from "body-parser";
import { ScrapingController } from "./controllers/ScrapingController";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "../public")));

app.post("/scrap", ScrapingController);

app.listen(port, () => {
	console.log(`Application is running on port ${port}.`);
});
