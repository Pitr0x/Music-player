import authServices from '../services/authServices.js';

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
};

async function register(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Email i hasło są wymagane.")
        }

        if (!validateEmail(email)) {
            throw new Error("Nieprawidłowy adres email.");
        }

        const result = await authServices.registerUser(email, password);
        res.status(201).json(result);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Email i hasło są wymagane.")
        }

        if (!validateEmail(email)) {
            throw new Error("Nieprawidłowy adres email.");
        }
        const result = await authServices.loginUser(email, password);
        res.status(201).json(result);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

const authController = { register, login }
export default authController;