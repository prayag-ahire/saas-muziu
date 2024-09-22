import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

console.log(process.env.GITHUB_ID);
console.log(process.env.GITHUB_SECRET);

// export function GET(){
//     return NextResponse.json({
//         message:"hii this is next-auth"
//     })
// }
const handler = NextAuth({
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID ?? '',
          clientSecret: process.env.GITHUB_SECRET ?? ''
        })
      ],callbacks:{
        async signIn(params){
          if(!params.user.email){
            return false
          }
          try{
            await prismaClient.user.create({
              data:{
                 email: params.user.email,
                 provider: "Github",

                
              }
            })
          }catch(e){

          }
          
          return true
        }
      }
})
export {handler as GET , handler as POST}
// export const GET = handler;
// export const POST = handler;