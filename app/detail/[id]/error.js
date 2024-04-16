'use client' // 클라이언트 페이지로 만들어야함.

export default function Error(error,reset) {
    // error: 에러내용
    // reset : 페이지 재로드.
    return (
        <div>
            <p>에러페이지.</p>
            <button onClick={()=>{reset()}}>페이지 재로드버튼.</button>

        </div>
    )
}