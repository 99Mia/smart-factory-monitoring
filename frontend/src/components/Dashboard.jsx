import { useEffect, useState } from "react";
import { shipDataService } from "../service/shipDataService";
import ShipTable from "./ShipTable";


// 게스트용 컴포넌트
function GuestView(){
  return(
    <div>
      <h2>Welcome to Ship Monitoring System</h2>
      <p>Please log in to view full dashboard and KPI data.</p>
    </div> 
  );
}

// 로그인 사용자용 대시보드 컴포넌트
/*
여기서 부모컴포넌트인 Route에서 --> App.jsx 에있음 Dashboard 컴포넌트에게 props로 데이터를 전달하면서
호출했다. 
<Dashboard currentUser={currentUser}/> 이렇게 되어있다 
그러면 currentUser 객체를 Dashboard 컴포넌트 안에서 currentUser 라는 이름으로 사용하겠다는 의미이다
App.jsx 에는 currentUser 가 const로 선언되어있다 
const currentUser = userUserStore((state)=> state.user)
이런식으로 user라는 상태를 스토어에서 가져와서 currenUser 라는 변수에 넣었다. 그러니까 현재 로그인한
사용자의 정보 state가 모두 currentUser 안에 들어가있다. 
그거를 Dashboard에서 사용하는 이유는 로그인해서 Dashboard를 볼때 
welcome, 로그인한사용자 username 이렇게 보이게 하기 위해서이다. 
원래는 (props) 이렇게 사용해서 const currentUser = props.currentUser 이런식으로 써야하지만
({currentUser})이렇게 하면 props 이름을 그냥 중괄호에 넣어서 적으면 구조분해할당이라고 그렇게
귀찮게 props.currentUser 이렇게 안써도 된다. 그냥 부모 컴포넌트가 보내준 currentUser 라는 props를
쓰면서 그 안에 있는 username 이런 것들을 다 사용할 수 있다

*/
function Dashboard({currentUser}) {
  const [shipList, setShipList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{
    shipDataService.getAllShipData()
      .then((response)=> {
        console.log(response.data[0])
        setShipList(response.data);  // 여기에는 List<ShipDataDTO> 형태의 모든 shipData데이터 있음
      })
      .catch((err)=>setErrorMessage("데이터를 불러오는 중 오류 발생"));
  },[]);

  return (
     <div>
      <h2>Welcome, {currentUser.username}</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <ShipTable shipList={shipList} />
    </div>
  );
}
export {Dashboard, GuestView};