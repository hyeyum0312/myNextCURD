import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";

export default async function Write(props) {
    const client = await connectDB;
    const db = client.db("forum");
    const result =  await db.collection("post").findOne({_id: new ObjectId(props.params.id)});

    return (
        <div>
            <h4>글수정</h4>
            <form action="/api/post/edit" method="POST">
                <input className="inputText" type="text" name="title" placeholder="글제목" defaultValue={result.title}></input>
                <textarea className="inputText" name="content" placeholder="글내용" defaultValue={result.content}></textarea>
                <input className="inputText" type="hidden" name="_id" defaultValue={result._id.toString()}></input>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}