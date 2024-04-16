'use client'
import {signIn, signOut} from 'next-auth/react'
export default function LoginButton(props){
    return (
        <button onClick={()=> {signIn()}}>{props.status}</button>
    )
}