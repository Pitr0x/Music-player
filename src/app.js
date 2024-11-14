import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/use', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send({message: "działa"});
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Błąd podczas uruchamiania serwera: ${err}`);
        return;
    }

    console.log(`Serwer śmiga na porcie ${process.env.PORT}`);
});