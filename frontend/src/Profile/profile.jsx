import { useState } from "react";
import TopNavi from "../components/TopNavi"; 
import { Role } from "../models/Role";
import userService from "../service/userRoleChange.service";
import userUserStore from "../store/userUserStore";


function Profile(){
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = userUserStore((state)=> state.user);
  const changeRole = () =>{
    if(!currentUser) return;
    // 이거는 Role 상태를 변환 시키는 것이다. 만약에 현재 로그인한 사용자의 user상태가 담긴
    // currentUser 변수안에는 role 도있고 username, id 등등 현재 User 객체 필드가 담겨져있다.
    // 거기서 role만 꺼내보는거다 role이 뭔지 value를 보는 것이다. 
    // 만약에 currentUser의 role이 admin이면은 
    // === 뒤에 부분을 보면 Role.ADMIN 이면 USER 로 바꾸고, 아니면(USER) ADMIN으로 바꾸라는 말이다
    // 그 바꾼 Role 상수 값을 newRole에 넣어준다
    const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    // 이부분 여기서 서비스의 changeRole 함수에 newRole을 매개변수로 넣어준다 
    // newRole은 위에서 선언했듯이 현재 가지고 있는 role과는 반대의 role 값이 들어있는 변수다

    userService.changeRole(newRole)
    // 원래는 매개변수에 response가 들어가고 거기서 response.data를 받아오는데 여기는 그럴필요가
    // 없는게 서버에서 body부분 즉 data 부분보낼 필요가 없고 code status 만 ok 라고 보내기 때문이다
      .then(()=>{
    // 그러면 code status로 ok라고 서버에게 응답을 받으면(백엔드는 db에 해당유저의 role 값을 변경했다)
    // 왜냐면 header에 토큰을 담아서 같이 보냈기 때문에 그 토큰을 가진 사용자의 role 값을 변경
    // 그 다음에 스토어에서 유저 state 값을 초기화한다. 
        userUserStore.getState().clearCurrentUser();
        // 그 다음에 프론트에서 로그인페이지로 강제로 이동시킨다
        // return에 권한 변경버튼 있다
        window.location.href= '/login';
      })
      .catch((err)=> {
        setErrorMessage('예기치 않은 에러가 발생했습니다');
        console.log(err);
      });
  };

 return (
    <div>
      {/* TopNavi 상단에 항상 보이도록 */}
      <TopNavi />

      {/* 내용 영역 */}
      <div className="container" style={{ paddingTop: '130px', maxWidth: '600px' }}>
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <div className="mb-3" style={{ fontSize: '1.2rem' }}>
              현재 유저의 권한은 <strong>{currentUser?.role}</strong>입니다.
            </div>

            <button 
              onClick={changeRole} 
              className="btn btn-primary"
            >
              권한변경
            </button>

            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )


}
export default Profile;