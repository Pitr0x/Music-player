import bcrypt from "bcryptjs";
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
    return {
        success: true,
        message: "Rejestracja zakończona sukcesem",
        data: {
            email: email
        }
    };
};

const loginUser = async (email, password) => {
    const userExist = await userExists(email);
    if (!userExist) {
        return {
            success: false,
            error: "Błąd"
        }
    }
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
        throw new Error("Nie znaleziono użytkownika");
    }

    savedPassword = rows[0].password;
    userId = rows[0].id;
    return {
        success: true,
        message: "Zalogowano pomyślnie",
        data: {
            id: userId,
            email: email
        }
    };
};

const authController = { registerUser, loginUser };
export default authController;