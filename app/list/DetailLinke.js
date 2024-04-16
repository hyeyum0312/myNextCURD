'use client'

import { useRouter } from "next/navigation"

export default function DetailLink() {
    let router = useRouter();
    return (
        <button onClick={()=>{useRouter(router.push('/'))}}>클릭</button>
    )
}