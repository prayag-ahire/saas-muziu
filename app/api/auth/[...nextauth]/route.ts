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
      ]
})
export {handler as GET , handler as POST}
// export const GET = handler;
// export const POST = handler;