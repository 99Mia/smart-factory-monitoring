import { Link } from "react-router-dom";

function UnAuthorized(){
  return(
    <div>
          <span>401</span>
          <div>권한없음! 이 주소로 접근이 거부되었습니다.</div>
          <Link to="/home">Back to Home</Link>
    </div>
  )
}
export default UnAuthorized;