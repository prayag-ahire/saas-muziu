"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar(){
    const session = useSession();
    return<div className="flex justify-between">
        <div>Muziu</div>
        <div className="text-4xl font-bold text-lime-500">
            {session.data?.user && <div>Welcome user {session.data.user.name}</div>}
        </div>
        <div>
            {session.data?.user && <button className="m-2 p-2 bg-red-400" onClick={()=>signOut()}>Logout</button>}
            {!session.data?.user && <button className="m-2 p-2 bg-red-400" onClick={()=>signIn()}>sign in</button>}
        </div>
    </div>
}