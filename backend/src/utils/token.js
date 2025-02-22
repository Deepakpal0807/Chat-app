import jwt from "jsonwebtoken"

export const createtoken= async(id,res)=>{
   
    const token=jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"7d"}); //token are made..

    //send this token to cokies..
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: false,  // Must be `false` on localhost
        sameSite: "Lax" // Allows cookies on the same domain (Frontend & Backend)
    });
    

    return token;


}