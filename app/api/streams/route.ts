import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const StreamSchema = z.object({
    createrId: z.string(),
    url: z.string()

})

export async function POST(req:NextRequest){
    try{
        const data = StreamSchema.parse(await req.json());
    }catch(e){
        NextResponse.json({
            message:"Error while adding a stream"
        },{
            status:411
        })
    }
    


}