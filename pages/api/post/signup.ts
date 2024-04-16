import { connectDB } from "@/app/util/database";

export default async function handler(req:any, res:any){
    if (req.method === "POST") {
        if (req.body.userId === "") {
            return res.status(400).json("아이디 입력은 필수값입니다.");
        }

        // if (req.body.userPassword === "") {
        //     return res.status(400).json("패스워드 입력은 필수값입니다.");
        // }

        try{
            // 페이지 이동 
            const db = (await connectDB).db("forum")
            let result = await db.collection('post').insertOne(req.body);
            return res.status(200).redirect("/")
        } catch(error) {
            return res.status(500).json("서버오류입니다.")
        }
    }
}