/*
프론트 모델과 서버간의 연결
아래 Role은 단순히 프론트에서 상수처럼 쓰는 객체이다. 
리액트에서 조건부 렌더링에 사용 가능하다
예를 들면 {currentUser?.role === Role.ADMIN && <AdminMenu />}
이렇게 쓰면 만약에 현재 유저가 admin이면 놔두고, admin이 아니면 AdminMenue로 이동하는거 그런식으로
자바스크립트 코드에서 비교용, UI 제어용으로 쓰이는 것 뿐이다. 

만약에 서버와 연결된느 경우는 서버에서 로그인 하거나 사용자 정보를 받아올 때 API서버(백엔드)응답에
role이 포함되어서 온다 
그러면 리액트에서는 그 role 값은 currentUser상태에 저장해서 Role 모델 상수와 비교하며 UI를 제어한다
*/
export const Role={
  USER:'USER',
  ADMIN:'ADMIN',
};