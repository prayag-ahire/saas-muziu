import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

export function Appbar(){
    const router = useRouter();


    return(<div>
        <div onClick={()=>{
            router.push("/home");
        }}> Muzer</div>
        
    </div>)
}