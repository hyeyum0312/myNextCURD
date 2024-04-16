'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function DarkMode(props) {
    let router = useRouter();

    useEffect(()=>{
        document.cookie = "mode=light; max-age" + (3600*24*400);
    },[])
    return (
        <span className="modeChange" onClick={()=>{
            let cookieCheck = ('; ' +document.cookie).split(`; mode=` ).pop().split(';')[0];
            console.log('cookieCheck',cookieCheck);
            if (cookieCheck === "dark") {
                document.cookie = "mode=light; max-age" + (3600*24*400);
                router.refresh();
            } else {
                document.cookie = "mode=dark; max-age" + (3600*24*400);
                router.refresh();
            }
        }}> 🌙 </span>
    )
}