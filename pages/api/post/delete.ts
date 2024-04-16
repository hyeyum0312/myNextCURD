import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req:any, res:any){

    const session = await getServerSession(req,res,authOptions);
    console.log('session',session);
    
    if (req.method === "DELETE") {
        if (session !== null) {
            if (req.body.author === session.user?.email) {
                try{
                    // 페이지 이동 
                    const db = (await connectDB).db("forum");
                    let result = await db.collection('post').deleteOne({_id : new ObjectId(req.body)});
                    res.status(200).json('삭제완료')
                } catch(error) {
                    return res.status(500).json("서버오류입니다.")
                }
            } else {
                return res.status(400).json("작성자만 삭제 가능합니다.")
            }
            
        } else {
            console.log(session);
            return res.status(400).json("로그인이 필요합니다.")
        }
    }
}