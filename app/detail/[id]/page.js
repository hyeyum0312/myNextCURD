import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment"

export default async function Detail(props) {
    const client = await connectDB;
    const db = client.db("forum");
    let result =  await db.collection("post").findOne({_id: new ObjectId(props.params.id)});
    let commentData = {
        _id: props.params.id
    }

    // 404페이지 , 상위폴더로 이동하며 notFound함수를 찾아서 호출시킵니다.
    if (result === null) {
        // return NotFound();
    }

    return (
        
    <div className="list-bg">
        <div className="list-item">
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment data={commentData}></Comment>
        </div>
    </div>
    )
}