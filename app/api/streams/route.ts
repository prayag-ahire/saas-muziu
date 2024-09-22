import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/
const StreamSchema = z.object({
    createrId: z.string(),
    url: z.string()

})

export async function POST(req:NextRequest){
    try{
        const data = StreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX);

        if(!isYt){
            return NextResponse.json({
                message:"your have inputed wrong URL"
            },{
                status:411
            })
        }

        const extrectedId = data.url.split("?v=")[1]; 

        const res =await youtubesearchapi.GetVideoDetails(extrectedId);
        console.log(res.title);
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: number,b: number)=> a - b);
        console.log(thumbnails);

        const user = await prismaClient.stream.create({
            data:{
                userId: data.createrId,
                url: data.url,
                extrectedId,
                type: "YouTube",
                title: res.title ?? "can't find video ",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2] : thumbnails[thumbnails.length - 1]).url ?? "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
                bigImg: (thumbnails[thumbnails.length - 1]).url ?? "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
            }
        });
        return NextResponse.json({
            message:"added Stream",
            id: user.id 
        })

    }catch(e){
        console.log(e);
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status:411
        })
    }

}

export async function GET(req:NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("createrId");
    const streams = await prismaClient.stream.findMany({
            where:{
                userId: creatorId ?? ""
            }
    })
    return NextResponse.json({
        streams
    })
}