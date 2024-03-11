import jwt from "jsonwebtoken";

const SECRET_KEY = "V18bPYJKMY/dKFPI1RQM9BqlsymdvxbJPcd5FRmrmZ8=" ;
const NODE_ENV = "developer";

const makeTokenNSendCookie = (userId, res)=>{

    // token created 
    const token = jwt.sign({ userId}, SECRET_KEY, {

        expiresIn: '15d'  // Token will expire in 15 days written in milliseconds
    
      });

      // Sebding token as cookie
      res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: NODE_ENV !== "development",
      })

}

export default makeTokenNSendCookie;


