import HomeView from "@/components/HomeView";
import { getServerSession } from "next-auth";

export default async function Home(){
    
    return <HomeView></HomeView>
}