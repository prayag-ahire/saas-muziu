
import { Appbar } from "@/components/Appbar";

interface Space{
    endTime?: Date | null;
    hostId: string;
    id: string;
    isActive: boolean;
    name: string;
    startTime: Date | null;
}

export default function HomeView(){

    return (
        <div>
            <div><Appbar/></div>
        </div>
    )
}