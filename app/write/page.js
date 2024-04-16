'use client'

import { useState } from "react";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function Write() {
    // const user = getServerSession(authOptions);
    let [src, setSrc] = useState('');

    return (
        <div>
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input className="inputText" type="text" name="title" placeholder="글제목"></input>
                <textarea className="inputText" name="content" placeholder="글내용"></textarea>
                <input type="file" accept="image/*" onChange={async(e)=>{
                    let file = e.target.files[0];
                    let fileName = encodeURIComponent(file.name); //한글 파일은 가끔 깨집니다. 안전하게 인코딩 된 파일명을 이용합니다.
                    let res = await fetch('/api/post/image?file='+fileName);
                    res = await res.json();
                    console.log(res);

                    //S3 업로드
                    const formData = new FormData() // form태그에 .. 가상의 form data
                    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                        formData.append(key, value)
                    })
                    let uploadResponse = await fetch(res.url, {
                        method: 'POST',
                        body: formData,
                    })
                    console.log(uploadResponse);
                    if (uploadResponse.ok === true) {
                        setSrc(uploadResponse.url+'/'+fileName);
                    } else{
                        setSrc('');
                    }
                    
                }} />
                
                <img src={src} accept="image/*" width={300} height={300} />
                <button type="submit">작성</button>
            </form>
        </div>
    )

    // if (user) {
    //     return (
    //         <div>
    //             <h4>글작성</h4>
    //             <form action="/api/post/new" method="POST">
    //                 <input className="inputText" type="text" name="title" placeholder="글제목"></input>
    //                 <textarea className="inputText" name="content" placeholder="글내용"></textarea>
    //                 <input type="file" accept="image/*" onChange={(e)=>{
    //                     let file = e.target.files[0];
    //                     let fileName = encodeURIComponent(file.name); //한글 파일은 가끔 깨집니다. 안전하게 인코딩 된 파일명을 이용합니다.
    //                     let res =  fetch('/api/post/image?file='+fileName);
    //                     res =  res.json();
    //                     console.log(res);

    //                 }}>이미지 업로드</input>
    //                 <image src=""></image>
    //                 <button type="submit">작성</button>
    //             </form>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div>
    //             <p>로그인 후 이용 가능합니다.</p>
    //         </div>
    //     )
    // }

}