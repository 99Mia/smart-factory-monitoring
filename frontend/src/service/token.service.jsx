// 토큰 보낼 헤더 만드는 곳

import userUserStore from "../store/userUserStore"

const authHeader = () =>{
  // user state를 꺼내서 currentUser 변수에 담는다.
  // user state 안에는 서버(백엔드)에서 응답한 js 형태의 로그인한 사용자 User 객체가 들어가있다
  const currentUser = userUserStore.getState().user;
  return{
    'Content-Type':'application/json',
    authorization : 'Bearer '+currentUser?.token,
  };
};
export {authHeader};