
// import { connect } from "@/dbconnection/dbconfig";
// import User from "@/models/usermodel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken"
// connect();


// export async function POST(request: NextRequest) {
//      try {
//         const reqbody = await request.json;
//         const {email ,  passowrd} = reqbody;

//        const user =  await User.findOne({email})
//        if(!user){
//          return NextResponse.json({error : "user doses not exit"},{status : 400})
//        }
//           const validpassword =   await bcryptjs.compare(passowrd , user.password)

//           if(!validpassword){
//             return NextResponse.json({error : "password not match"},{status : 400})
//           }

//       const tokendata = {
//          id: user._id,
//          email: user.email,
//          password: user.password
//       }
//            const token =await  jwt.sign(tokendata , process.env.Token_SECRET! , {expiresIn : "1d"})

//            NextResponse.json({
//             message: "loggedin successfully ",
//             success : true
//            })


//            Response.cookies.set("token",token, {
//             httpOnly: true
//            })

//      } catch (error: any) {
//         return NextResponse.json({error : error.message},{status : 500})
//      }  
// }


import { connect } from "@/dbconnection/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Correct the request body parsing
        const reqbody = await request.json();
        const { email, password } = reqbody;

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if the password is valid
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Password does not match" }, { status: 400 });
        }

        // Generate token data and create a JWT token
        const tokendata = {
            id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Create the response and set the cookie in it
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
