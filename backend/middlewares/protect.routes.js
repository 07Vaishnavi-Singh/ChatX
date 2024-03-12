import jwt from "jsonwebtoken";
import {userModel} from "../models/user.model.js";

const ProtectRoute = async()=>{

    const SECRET_KEY = "V18bPYJKMY/dKFPI1RQM9BqlsymdvxbJPcd5FRmrmZ8=" ;
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.send(401).json({ message: 'Token doesnt exist' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await userModel.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();

    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

export default ProtectRoute;
