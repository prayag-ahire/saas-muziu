import Image from "next/image";
import { Appbar } from "./components/Appbar";
import { Providers } from "./providers";

export default function Home() {
  return (<div>
    <Providers>
    <Appbar/>
    </Providers>
  </div> 
  );
}
