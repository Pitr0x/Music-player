import express from "express";
import dotenv from "dotenv";
import path from "path"
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/use', authRoutes);
app.use('/api/use', protectedRoutes);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Błąd podczas uruchamiania serwera: ${err}`);
        return;
    }

    console.log(`Serwer śmiga na porcie ${process.env.PORT}`);
});