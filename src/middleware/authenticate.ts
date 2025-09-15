import jwt from 'jsonwebtoken'


const authenticateToken = async (req: any, res: any, next: any) => {
    try {
        // Extract token from Authorization header: "Bearer <token>"
        const token = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: "Access token required" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        
        if (!jwtSecret) {
            return res.status(500).json({ msg: "Server configuration error" });
        }
        
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach user info to request
        next(); // Continue to next middleware/route
        
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}

export default authenticateToken