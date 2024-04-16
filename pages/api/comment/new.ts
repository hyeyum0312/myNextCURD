import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req:any, res:any){
     let session = await getServerSession(req,res,authOptions);
    console.log('session',session);
    if (req.method === "POST") {
        try{
            // 페이지 이동 
            const db = (await connectDB).db("forum");
            req.body = JSON.parse(req.body);
            console.log('eq.body',req.body);
            
            let save = {
                content: req.body.comment,
                parent: new ObjectId(req.body._id),
                author: session?.user?.email
            }
            let result = await db.collection("comment").insertOne(save);
            
            return res.status(200);
        } catch(error) {
            return res.status(500).json("서버오류입니다.")
        }
    }
}