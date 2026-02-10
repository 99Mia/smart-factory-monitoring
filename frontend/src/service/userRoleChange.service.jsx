// 유저 role 을 바꾸기 위한 곳

import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./token.service";

const BASE_URL=BASE_API_URL+"/api/user";

class UserService{
  // 매개변수 role에는 ADMIN, ROLE 이라는 외부에서 전달되는 값이 들어간다.
  // Profile.jsx 파일의 changeRole 함수가 아래의 changeRole 함수 매개변수에 값을 넣어주면서 호출
  // axios.put은 브라우저에서 http 요청을 쉽게 보내기 위한 라이브러리다
  // .put은 http put 요청을 의미한다. 서버에서는 PutMapping() 이렇게 받으면 되고
  // put은 데이터를 수정할 때 많이 사용된다. 여기서는 사용자 권한(role)변경을 요청한다
  /*
  첫번째 인자는 url 경로이고, 두번째 인자는 put 요청에서 보낼 데이터자리인데 여기서는 body가 필요 없어서
  빈 객체{} 를 넣는다. 그 다음에 세번째 인자에는 토큰을 넣어준다
  */
  changeRole(role){
    return axios.put(BASE_URL + "/change/" + role, {}, {headers:authHeader()});
  }
}
// 클래스 객체 하나를 만들어서 export 한다
const userService = new UserService();
export default userService;