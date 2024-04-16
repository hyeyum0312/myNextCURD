export default function Signup() {
    return (
        <div>
            <h4>회원가입</h4>
            <form action="/api/post/signup" method="POST">
                <input className="inputText" type="userId" name="title" placeholder="아이디"></input>
                <textarea className="inputText" name="userPassword" placeholder="패스워드"></textarea>
                <button type="submit">가입</button>
            </form>
        </div>
    )
}