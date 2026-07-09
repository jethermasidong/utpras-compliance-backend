import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.query("SELECT NOW()")
    .then(result => {
        console.log("Database Connected");
        console.log(result.rows[0]);
    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

