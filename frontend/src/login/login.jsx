import { useEffect, useState } from "react";
import User from "../models/User";
import { Link, useNavigate } from "react-router-dom";
import userUserStore from "../store/userUserStore";
import { loginService } from "../service/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function Login(){
  const [user,setUser]=useState(new User('','',''))
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigator = useNavigate();

  const currentUser=userUserStore((state) => state.user);

  useEffect(()=>{
    if(currentUser?.id)
      navigator('/profile')
  });

  // 이 함수는 user state 값을 변경하기 위한 함수
  const handleChange=(e)=> {
    const {name, value}=e.target;
    // user state 값 변경 (브라우저에서 사용자가 입력한 user 값 )
    setUser((prevState)=> {
      return{
        ...prevState,
        [name]:value
      }
    })
  }

  // store의 setCurrentUser 함수를 setCurrentUser 변수에 넣어준다
  const setCurrentUser =userUserStore((state)=> state.setCurrentUser);

  const handleLogin=(e)=>{
    // form이 submit되어 로그인 처리 전 handleLogin 함수를 실행 후 로그인 처리하겠다는 의미
    e.preventDefault();
    setSubmitted(true);
    // 사용자가 username 과 password를 입력 안했다면 
    if(!user.username || !user.password){
      return; // 함수 종료
    }
    setLoading(true);

    loginService(user)
     .then((response)=>{
      setCurrentUser(response.data)   // store 에 서버로 받은 응답 저장(토큰포함된 user 객체-> js형태)
      navigator('/profile') // 로그인 후 프로필 페이지로 이동
     })
     .catch((error)=>{
      console.log(error);
      setErrorMessage("아이디와 비밀번호가 틀립니다.")
     })
  }

  return(
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card shadow-sm p-4" style={{ width: '380px' }}>
      <div className="text-center mb-4">
        <FontAwesomeIcon icon={faUserCircle} size="4x" className="text-primary" />
        <h3 className="mt-2 text-primary fw-bold">로그인</h3>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleLogin} noValidate>
        <div className="mb-3">
          <label className="form-label">유저네임</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">패스워드</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary w-100"
        >
          {loading ? '로딩중...' : '로그인'}
        </button>
      </form>

      <div className="text-center mt-3">
        <Link to="/register" className="text-secondary small">
          새 계정 만들기
        </Link>
      </div>
    </div>
  </div>
  );
}
export default Login;