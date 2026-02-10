
// 이거는 권한없는 사용자를 /401 페이지로 보내고 싶을 때 사용한다. 
import { Navigate } from "react-router-dom";
import userUserStore from "../store/userUserStore";

/*
{cildren, role} 는 구조 분해(destructuring)으로 props를 바로 꺼내 쓰는 것이다. 
실제로 부모(Route)에서 전달한 props는 다음과 같다

props = {
 children: <Profile />,
 roles: [Role.ADMIN, Role.USER]
}

*/
function AuthGuard({children, roles}){
  // 스토어에서 user state 정보를 가져와서 currentUser라는 변수에 담는다
  // 나중에 currentUser.role 이렇게 쓰기 위해서 -> 사용자 권한 확인
  const currentUser=userUserStore((state)=>state.user)



  // 접근 권한 확인 함수
  const authorize=()=>{
    // currentUer 가 없다면, user state 가 없다는 것(null)은 로그아웃한 상태
    // 그렇다면 접근불가 페이지 401로 이동한다
    if(!currentUser){
      return <Navigate to="/401"/>
    }
    //roles 배열안에 (즉, Route라는 부모에게서 받아온 props인 roles 데이터의 배열안에)
    // roles={[Role.ADMIN, Role.USER]} 이렇게 생긴 것이 roles 배열이다.
    //******* 다시한번, roles는 부모(Route)에서 AuthGuard에게 전달한 권한 배열 */
    // indexOf(currentUser.role) 일단 이 부분 부터, currentUser.role이 현재 로그인한 사용자의
    // role 상태를 의미한다. 그러면 admin 또는 user 가 되겠지
    // 그러면 indexOf(user) 이런식으로 된다고 치자. 그러면 roles.indexOf(user) 이 말은 roles라는
    // 배열 안에 user라는 값이 몇 번째에 있는 지를 인덱스 숫자로 알려준다. 
    // roles라는 배열 안에 user 이 0번째에 있을 수도, 1번째에 있을 수도 있으니까 1번째면 숫자 1을 
    // 반환한다. 그렇다면 여기서 -1을 반환한다는 것은 뭘까.
    // -1을 반환한다는 것은 그 배열안에 user 라는 값이 없다는 것을 뜻한다.
    // 즉, roles?.indexOf(guest)== -1 이게 의미하는거가 roles 안에 guest라는 값은 없다라는 의미이다.
    // 여기서 AuthGuard가 props로 받은 데이터는 roles에 admin과 user만 들어있었다. 그니까
    // 현재 user state의 role이 그 두개(admin과 user)가 아니라면
    if(roles?.indexOf(currentUser.role)==-1){
      // 에러 401을 띄워라는 말이다
      return <Navigate to="/401" />
    }
    // 그 둘 다 아니라면 여기서 접근권한 확인함수인 authorize 함수의 반환값이 children이 되는 것이다.
    // currentUser이고, 즉 로그인 된 user state를 가지고 있고
    // role이 roles라는 배열 안에 들어가 있다면 children 즉, profile 컴포넌트를 반환하는 것이다
    return children;


  }
  // 그리고 children이 들어가있는(Profile 컴포넌트가 들어가있는) authorize 함수를 다시 반환하고, 
  // AuthGuard 함수를 호출하면 그 안에있는 authorize 함수가 호출되고, children이라는 Profile 컴포넌트가
  // 반환된다 이말이다
  return authorize();
}
export default AuthGuard;