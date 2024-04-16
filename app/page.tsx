import { MongoClient } from "mongodb";
import { connectDB } from "./util/database";
import { log } from "console";

export default async function Home() {
  // DB입출력 코드는 Server component안에서만 사용할것.
  // 클라이언트 컴포넌트 안에있는 모든 코드는 유저 브라우저에 전달이 되기 때문에 민감한 코드는 클라이언트 컴포넌트 안에 넣어두는 것은 좋지 않습니다. 
  const client = await connectDB;
  const db = client.db("forum");
  let result =  await db.collection("post").find().toArray(); //컬렉션의 모든 document꺼내오기
  console.log(result);
  return (
    <div>CURD</div>
  );
}
