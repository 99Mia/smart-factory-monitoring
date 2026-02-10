import { useEffect, useRef, useState } from "react";
import { shipDataService } from "../service/shipDataService";
import ShipDataEdit from "../components/ShipDataEdit";
import ShipTable from "../components/ShipTable";
import "../css/Admin.css";



const Admin =()=> {
  const [shipList, setShipList] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const editComponent = useRef();

  useEffect(()=>{
    shipDataService.getAllShipData()
     .then((response)=>{
      console.log(response.data)
      setShipList(response.data)
     })
     .catch(err => console.error(err));
     },[]);

  // 여기서 매개변수 data는 무엇인가? ShipTable에서 클릭한 해당 ship 객체가 들어오는 매개변수이다
  // ***************** 중요!!!!!!!!!! 여기에 들어오는 매개변수는 ShipTable 이라는 자식컴포넌트가
  // 전달해준 shipData에서 사용자가 Edit 버튼을 onClick하면은 onEdit(ship)을 호출한다
  // 그러면 editShipRequest에 그 ship 데이터가 들어가고
  // 사용자가 클릭한 한 줄의 ship 객체데이터가 selectShip이라는 state로 들어간다
  // 그 후 ref 객체인 editComponent 변수를 통해서 가져온 자식컴포넌트 ShipDataEdit 안의 함수인
  // showProductModal 함수안에 data 즉, 현재 클릭된 ship 객체를 넣어준다.
  // 그럼 모달창이 뜨면서 현재 클릭된 ship 객체가 들어간 상태로 모달창이 뜬다
  const editShipRequest=(data)=>{
    console.log("수정할 ship 데이터:", data);
    setSelectedShip(data)
    // showProductModal은 모달을 여는 함수이지 데이터를 모달에 넣는 함수가 아니다(데이터만 넘겨줌)
    // 실제로 자식컴포넌트인 ShipDataEdit에서 모달에 데이터가 들어가는 곳은 useEffect이다. 
    // 모달을 열기만 하는 곳은 showProductModal 이다
    // 여기서 data를 보내주는 이유는 모달을 열면서 이 데이터도 같이 넘기라는 의미이다.
    // 즉, 모달이 어떤 ship을 수정해야하는지 알도록 data를 전달해주는것이다
    // 모달을 여는 함수를 호출하고, 이 사용자가 선택한 selectedShip state 데이터를 너의 state(editData)
    // 에 넣으라는 말이다

    // 자식컴포넌트의 shoShipEditModal에 data를 넣고 실행시키라고 부모 컴포넌트가 지시한다
    editComponent.current?.showShipEditModal(data);
  }

  // 모달에서 수정완료 후 호출되는 onSave 함수자리이다.
  // 중요!!!!!!!!!! 데이터 무결성
  /*
  사용자가 입력하면 모달에서 수정한다. 모달은 단지 수정된 데이터를 admin에게 전달한다(onSave)
  모달은 단지 수정된 데이터를 admin에게 전달한다(onSave) -> editData 라는 state를 전달한다
  그러면 부모 컴포넌트의 onSave로 가서 그 editData라는 부분이 매개변수, 즉 editShipDataWatcher 함수의
  매개변수가 되고 그러면 부모컴포넌트에서 그 수정된 데이터 state를 서버로 보내서 db에 저장한다
  */
  const editShipDataWatcher=(editData)=> {
    console.log("수정 완료", editData);
    shipDataService.updateShipData(editData.idx, editData)
     .then((response)=>{
       console.log("DB 저장 성공 :", response.data);
     })
     .catch((err)=>{
      console.error("DB 저장 실패:", err);
      alert("DB 저장 중 오류가 발생했습니다.");
     })
  }


  return(
  <div className="admin-page">
    <h1 className="admin-title">ShipData 전체 DB 관리자 페이지</h1> 
    <ShipTable 
    shipList = {shipList}
    // 이 말은 부모가 자식에게 함수를 보내주는 것이다. 그 안에있는 데이터를 보내주는 것이 아님
    // ShipTable 에게 onEdit 함수를 props로 전달
    onEdit = {editShipRequest}
    />
    

{/* ShipDataEdit에게 ref 와 selectShip 데이터 전달 */}
    <ShipDataEdit
    ref = {editComponent}
    shipData = {selectedShip}
    onSave = {(editData)=>editShipDataWatcher(editData)}/> 

  </div>
  )
  
}
export default Admin;