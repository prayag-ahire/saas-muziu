import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamid: z.string(),
    userId: z.string(),

}) 

export async function POST(req:NextRequest){


    // here we first checking that user is login then do next thing

    const session = await getServerSession();
    // you can get rid of the db call here 
    
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? "",
        }
    });

    if(!user){
        return NextResponse.json({
            message:"unauthonticated "
        },{
            status:403
        })
    }


    // after conferming user is login the voting    
    try{
        const data = UpvoteSchema.parse(await req.json());

        await prismaClient.upvote.create({
            data:{
                streamId: data.streamid,
                userId: user?.id ?? "",
            }
        });
    }
    catch(e){   
        return NextResponse.json({
            message:"error while upvoting"
        },{
            status: 403
        })
    }
}

