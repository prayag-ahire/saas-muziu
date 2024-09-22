import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";


const YT_REGEX = new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$")
const StreamSchema = z.object({
    createrId: z.string(),
    url: z.string()

})

export async function POST(req:NextRequest){
    try{
        const data = StreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);

        if(!isYt){
            NextResponse.json({
                message:"your have inputed wrong URL"
            },{
                status:411
            })
        }

        const extrectedId = data.url.split("?v=")[1]; 
        const user = await prismaClient.stream.create({
            data:{
                userId: data.createrId,
                url: data.url,
                extrectedId,
                type: "YouTube"

            }
        });
        return NextResponse.json({
            message:"added Stream",
            id: user.id 
        })

    }catch(e){
        NextResponse.json({
            message:"Error while adding a stream"
        },{
            status:411
        })
    }
    


}