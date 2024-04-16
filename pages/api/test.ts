import { connectDB } from "@/app/util/database";

export default async function handler(req:any, res:any){
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray();
    res.status(200).json(result)

}