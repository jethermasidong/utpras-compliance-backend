import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";

import userRoutes from './routes/usersRoutes.js';
import programRoutes from './routes/programRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

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


app.use('/api', userRoutes);
app.use('/api', programRoutes);
app.use('/api', requirementRoutes);
app.use('/api', applicationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

