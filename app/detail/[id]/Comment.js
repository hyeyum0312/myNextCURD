'use client' 
//DB출력문법 작성불가, 서버에게 DB출력 결과요청 가능.

import { useEffect, useState } from "react"

export default function Comment(props) {
    let [comment, setComment] = useState('');
    let [commentList, setCommentList] = useState([]);
        console.log('props.data._id',props.data._id);
      useEffect(()=>{
        // ajax,timer등등..동작.
        // 재랜더링 될 때마다 실행됩니다.
        //첫 로드 1회만 실행을 원할경우 []를 추가합니다.
        // html보여준 후 늦게 동작해야합니다.

        fetch('/api/comment/list?id=' + props.data._id).then(r=>r.json()).then((result)=>{
          console.log('result',result)
          setCommentList(result);
        })
      },[]) 

    return (
        <div>
            <hr/>
            <ul>
                {
                    commentList.length > 0 ? 
                    commentList?.map((item,index)=>{
                        return (<li key={index}>{item.content} - {item.author} </li>)
                    })
                    : '작성된 댓글이 없습니다'
                }
            </ul>
            <input onChange={(e)=>{
                setComment(e.target.value);
            }}/>

            <button onClick={()=>{
                fetch('/api/comment/new', {method: 'POST', body: JSON.stringify({comment : comment, _id: props.data._id})}).then(
                    fetch('/api/comment/list?id=' + props.data._id).then(r=>r.json()).then((result)=>{
                        console.log('result',result)
                        setCommentList(result);
                      })
                )
            }}>댓글전송</button>
        </div>
    )
}