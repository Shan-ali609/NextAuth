
import { connect } from "@/dbconnection/dbconfig";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message:" successfully logout",
            success: true
        })
        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        });

        return response
    } catch (error:any) {
        NextResponse.json({error: error.message}, {status: 400})
    }
}
