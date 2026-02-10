import { kpiAlarmService } from "../service/kpiAlarm.service";
import AdminAlarmEdit from "./AdminAlarmEdit";
import AlarmTable from "./AlarmTable";
import { useEffect, useRef, useState } from "react";

function AdminAlarmPage(){
  const [alarms, setAlarms] = useState([]);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const editAlarm = useRef();
  

  useEffect(()=>{
    kpiAlarmService.getKpiAlarms()
      .then((response)=>{
        console.log("DB에서 가져온 알람: ", response.data)
        setAlarms(response.data)
      })
      .catch(err => console.error(err));
  },[])

  const editAlarmRequest=(data)=>{
    console.log("수정할 alarmData : "+ data);
    setSelectedAlarm(data)
    editAlarm.current?.showAlarmEditModal(data);
  }

  const editAlarmWatcher =(editAlarm) => {
    console.log("수정완료", editAlarm)

    if(!editAlarm.id){
      console.warn("이 객체에는 id가 없습니다")
    }

    kpiAlarmService.updateKpiAlarms(editAlarm.id, editAlarm)
      .then((response) =>{
        console.log("DB 저장 성공", response.data)
      })
      .catch((err)=>{
      console.error("DB 저장 실패:", err);
      alert("DB 저장 중 오류가 발생했습니다.");
     })
  }

  

  return(
    <>
    <AlarmTable 
      alarms={alarms}
      onEdit ={editAlarmRequest}
    />

{/* AdminAlarmEdit 에게 ref와 현재 선택된 alarm 객체가 뭔지 보낸다. */}
    <AdminAlarmEdit
      ref={editAlarm}
      selectedAlarm={selectedAlarm}
      onSave = {(editAlarm) => editAlarmWatcher(editAlarm)}
    />

    </>
  )
}
export default AdminAlarmPage;