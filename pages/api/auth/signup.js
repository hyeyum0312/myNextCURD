import { connectDB } from "@/app/util/database";
import bcrypt from 'bcrypt' // password 암호화 라이브러리


export default async function handler(request, response) {
    const db = (await connectDB).db("forum");
    let dbData =  await db.collection("user_cred").find().toArray();

    if (request.body.email === '' || request.body.password === '') {
        return response.status(400).json('모든 입력란을 기재해주세요.');
    } else {
        dbData.forEach((item)=>{
            console.log('item',item);
            if (item.email === request.body.email) {
                return response.status(400).json('이미 가입된 아이디입니다.');
            }
        })

        let hash = await bcrypt.hash(request.body.password, 10);
        console.log('hash',hash);
        request.body.password = hash;
        
        let result = await db.collection('user_cred').insertOne(request.body);
        return response.status(200).json('가입성공')
    }
}