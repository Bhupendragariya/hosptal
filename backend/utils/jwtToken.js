
export const generateToken = (user, message, res, statusCode = 200) => {
      
   try {
     const token = user.generateJsonWebToken();

     const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";


     const cookieExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000;


     res.status(statusCode).cookie(cookieName, token, {
         httpOnly: true,
         expires: new Date(Date.now() + cookieExpiry),
 
     }).json({
         success: true,
         message,
         user,
         token,
     });
   } catch (error) {
         console.error("Error generating token:", error);
         res.status(500).json({
              success: false,
              message: "Internal server error",
         });
    
   }
};
