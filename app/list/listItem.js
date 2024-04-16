'use client'

import Link from "next/link"
import { useEffect } from "react"
import DetailLink from "./DetailLinke"

export default function ListItem({result}) {
    // useEffect(() =>{
        //서버에 부탁해서 데이터 가져온 후 응답값을 변수 result에 담는다.
        // 'use client'에서는 이미 html먼저 유저에게 보여주고 값을 보여주므로 검색노출이 안될 수 있습니다.
        // 유저뿐만 아니라 검새색엔진 봇이 페이지 방문 시 수집하여 결과를 보여주는데 페이지 접속 시점에 값이 비어있다면 ..? 검색노출에 영향이 옵니다.
        // 그렇기 때문에 검색엔진 노출이 중요한 사이트는 props전송으로 처리 해야겠다.
    // })

    // export default function ListItem({result}) { // {result} -> 디스트럭처링문법
    return (
        <div>
            {
            result.map((item,i)=>
            <div className="list-item" key={i}>
                <Link href={`/detail/${item._id}`}>
                    <h4>{item.title}</h4>
                </Link>
                <Link href={`/edit/${item._id}`}>✏️</Link>

                {/* form으로 요청 시 새로고침처리됩니다. ajax로 요청 시 새로고침 처리 안됌. */}
                <span className="deleteIcon" onClick={(e)=>{
                    // 데이터 많으면 지저분해집니다. URL에 노출되기 때문에 민감한 데이터는 사용하지 않아야합니다.
                    // fetch("/api/abc/kim");

                    // method요청 함께 사용 + 데이터 전송 시
                    // 배열,객체 전송 시 - JSON.stringify 필수


                    // 코드가 너무 길어지는 탓에 axios를 사용하기도 합니다.
                    {fetch("/api/post/delete", {
                        method: "DELETE",
                        body: item._id
                    }).then((r)=>{
                        if (r.status == 200) {
                            e.target.parentElement.style.opacity= 0;
                            setTimeout(() => {
                                e.target.parentElement.style.display = "none";
                            }, 1000);
                            return r.json()
                            
                        } else {
                            console.log('r',r);
                        }
                        
                    }).catch((error)=>{
                        console.log('error',error);
                        // 인터넷에러로 실행할 코드 (네트워크에러)
                        console.log('인터넷에러로 실패'); 
                    })
                    }
                    
                }}>🗑️</span>
                <p>{item.content}</p>
                <DetailLink></DetailLink>
                </div>
            )
            }
        </div>
    )
}