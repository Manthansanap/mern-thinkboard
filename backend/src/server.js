import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


// middleware
app.use(cors({
    origin : "http://localhost:5173"
}));

app.use(express.json());// Lets us parse req.body (use the elements sent in the req)
app.use(rateLimiter);


// Our own simple middleware
// app.use((req,res,next) => {
//     console.log(`Request method is ${req.method} and request URL is ${req.url}`);
//     next();
// });
    
app.use("/api/notes", notesRoutes);

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log("Server started on port: 5001");
    }); 
});
    
    