/** @format */

import express from "express";
import cors from "cors";

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", );

app.listen(port, () => {
	console.log(`Serveur en ligne : http://localhost:${port}`);
});
