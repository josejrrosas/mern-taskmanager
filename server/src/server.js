import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(cors(/* later: { origin: CLIENT_URL } */));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health',(req,res) => {
    res.status(200).json({ok: true});
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
})