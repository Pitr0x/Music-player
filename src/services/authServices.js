import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/connect.js";

const userExists = async (email) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row.length > 0);
            }
        });
    });
};

const registerUser = async (email, password) => {
    if (await userExists(email)) {
        throw new Error('Użytkonik o takiej nazwie istnieje');
    }
    let saltRounds = parseInt(process.env.saltRounds);
    let passHash = await bcrypt.hash(password, saltRounds);

    await new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, passHash], (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });

    console.log("Zakończono");

    const token = jwt.sign(
        {
            id: userId,
            email: email
        },
            process.env.secretKey,
        {
            expiresIn: process.env.tokenExpiration
        }
    )
    return {
        success: true,
        message: "Rejestracja zakończona sukcesem",
        data: {
            email: email
        }
    };
};

const loginUser = async (email, submittedPassword) => {
    let savedPassword, userId;

    const rows = await new Promise((resolve, reject) => {
        db.all(`SELECT id, password FROM users WHERE email = ?`, [email], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });

    if (rows.length === 0) {
        let saltRounds = parseInt(process.env.saltRounds);

        bcrypt.hashSync('fakePassword', saltRounds);

        throw new Error("Błędny login lub hasło");
    }

    savedPassword = rows[0].password;
    userId = rows[0].id;

    const passwordDidMatch = await bcrypt.compare(submittedPassword, savedPassword);
    if (passwordDidMatch) {
        const token = jwt.sign(
            {
                id: userId,
                email: email
            },
            process.env.secretKey,
            {
                expiresIn: process.env.tokenExpiration
            }
        );

        return {
            success: true,
            message: "Zalogowano pomyślnie",
            data: {
                id: userId,
                email: email,
                token
            }
        };
    }
    else {
        throw new Error("Błędny email lub hasło");
    }
};

const authController = { registerUser, loginUser };
export default authController;