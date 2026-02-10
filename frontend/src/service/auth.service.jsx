import axios from "axios";
import { BASE_API_URL } from "../common/constants";

// 백엔드 RequestMapping 주소 (엔드포인트) 와 연결
const BASE_URL=BASE_API_URL+"/api/authentication"

// json 형태로 브라우저에서 사용자가 입력한 username과 password 즉 user state를 서버로 보냄
const loginService=(user)=>{
  return axios.post(BASE_URL+"/sign-in", user)
}

const registerService=(user)=>{
  return axios.post(BASE_URL+"/sign-up", user)
};
export {loginService, registerService};


