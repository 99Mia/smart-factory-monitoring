// faUserCircle -> FontWwesome 아이콘 중 하나이다
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import User from "../models/User";
import userUserStore from "../store/userUserStore";
import { registerService } from "../service/auth.service";

function Register(){
  const [user,setUser]=useState(new User('','',''));
  const navigate=useNavigate();
  const currentUser=userUserStore((state)=>state.user); 
  const [loading, setLoading]=useState(false);
  const [submitted, setSubmitted]=useState('');
  const [errorMessage, setErrorMessage]=useState('');

  
  useEffect(()=>{
    // 로그인이 되어있으면 버튼(가입하기)누르면 바로 profile로 넘어간다
    if(currentUser?.id){
      navigate('/profile');

    }
  },[])


  const handleRegister=(e)=>{
    e.preventDefault();
    setSubmitted(true);
    if(!user.username || !user.password || !user.name){
      return;
    }
    setLoading(true);
    registerService(user)
    .then(()=>{
      navigate('/login');
    })
    .catch((error)=>{
      console.log(error);
      if(error?.response?.status==409){
        setErrorMessage('같은 유저네임이 있습니다.')
      }else{
        setErrorMessage("예상하지 못한 에러가 발생했습니다.")
      }
    })
  }

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setUser((prevState)=>{
      return{
        ...prevState,
        [name]:value
      };
  })
  }

 return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card shadow-sm p-4" style={{ width: '400px' }}>
      <div className="text-center mb-4">
        <FontAwesomeIcon icon={faUserCircle} size="4x" className="text-primary" />
        <h3 className="mt-2 text-primary fw-bold">회원가입</h3>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleRegister} noValidate>
        <div className="mb-3">
          <label className="form-label">이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            value={user.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">유저네임</label>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
            value={user.username}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">패스워드</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={user.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-100">
          {loading ? '로딩중...' : '가입하기'}
        </button>
      </form>
    </div>
  </div>
  );
}

export default Register;