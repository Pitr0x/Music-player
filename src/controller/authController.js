import authServices from '../services/authServices.js';

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
};

async function register(req, res) {
    const { email, password } = req.body;
    console.log(email, password)

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
            error: {
                status: 400,
                message: err.message
            }
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

        res.cookie('authToken', result.data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.status(201).json(result);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            error: {
                status: 400,
                message: err.message
            }
        });
    }
}

const authController = { register, login }
export default authController;