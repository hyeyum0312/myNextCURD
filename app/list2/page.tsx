import { connectDB } from "../util/database";
import Link from "next/link";
import DetailLink from "./DetailLinke";
import ListItem from "./listItem";

export const revalidate = 20; // 20초 캐싱

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result =  await db.collection("post").find().toArray(); //컬렉션의 모든 document꺼내오기
  // await fetch("/URL", {cache: 'force-cache'}) // GET요청결과 캐싱 가능
  // await fetch("/URL", {cache: 'no-store'}) // 매번 서버로 요청
  // await fetch('/URL', { next: { revalidate: 60 } }) // 캐싱 결과를 60초 동안만 보관


    return (
      
      <div className="list-bg">
        <ListItem result={result}/>
      </div>
    )
  } 