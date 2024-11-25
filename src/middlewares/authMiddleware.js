import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const token = req.cookies?.authToken || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json(
            {
                success: false,
                error: {
                    message: 'Brak tokena'
                }
            }
        );
    }
    try {
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json(
                    {
                        success: false,
                        message: "Błędny token"
                    }
                )
            }
            console.log(decoded);
            req.user = decoded;
            next();
        });
    }
    catch (err) {
        return res.status(403).json({ message: "Token nieprawidłowy" })
    }
};

export default authenticateToken;