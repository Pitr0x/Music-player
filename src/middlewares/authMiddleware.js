import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json(
            {
                success: false,
                message: 'Brak tokena'
            }
        );
    }

    jwt.verify(token, process.env.secretKey, (err, userId) => {
        if (err) {
            res.status(403).json(
                {
                    success: false,
                    message: "Błędny token"
                }
            )
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;