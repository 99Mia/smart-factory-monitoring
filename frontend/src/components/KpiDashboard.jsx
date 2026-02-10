/*
역할은 EventSource로 /stream/kpi를 구독하고 useState로 kpiData를 관리한다
서버에서 실시간으로 보내오는 데이터는 아래와 같다

{
  "fuelEfficiency": { "value": 24.24, "status": "normal" },
  "torqueUtilization": { "value": 0.89, "status": "danger" },
  "gtRpmStd": { "value": 770.64, "status": "normal" },
  "propellerBalance": { "value": 1.89, "status": "normal" },
  "decayIndex": { "value": 1.71, "status": "normal" },

  "alarmList": [
    { "type": "danger", "msg": "torqueUtilization 상태: danger" }
  ]
}


*/

import { useEffect, useState } from "react";
import KpiChart from "./KpiChart";
import { BASE_API_URL } from "../common/constants";
import AlarmBanner from "./AlarmBanner";
import "../css/KpiDashboard.css";




// sse 데이터를 받고 AlarmBanner 와 Charts 를 렌더링 한다
function KpiDashboard(){
  const [kpiData, setKpiData] = useState({});
    const [alarms, setAlarms] = useState([]);
  
    useEffect(() => {
      
      const eventSource = new EventSource(BASE_API_URL+"/stream/kpi");
      eventSource.onopen = () => console.log("SSE 연결 열림");
      eventSource.onerror = (err) => console.log("SSE 에러", err);
      eventSource.addEventListener("kpiUpdate", (e) => {
      const data = JSON.parse(e.data);
      console.log("데이터 수신:", data);
  },[]);
  
      eventSource.addEventListener("kpiUpdate", (e) => {
      try {
        const parsed = JSON.parse(e.data);
        const data = parsed.data || parsed;
        setAlarms(data.alarmList || []);
        setKpiData(data);
      } catch(err) {
        console.error("파싱 에러", err);
      }
      });
  
      eventSource.onerror = (err)=> {
        console.error("SSE 연결 에러: ", err);
        eventSource.close();
      };
  
      return () => eventSource.close();
    });

  return(
   <div className="dashboard-container">
      {/* 알람 배너 */}
      <AlarmBanner alarms={alarms}/>
    {/* 
      테스트 방법
      <h2>대시보드 테스트</h2>
      <pre> {JSON.stringify(kpiData, null, 2)}</pre>

      <h3> 알람 리스트 </h3>
      <pre> {JSON.stringify(alarms, null, 2)}</pre>

      이런식으로 테스트를 할 수 있다
      
      */}

      <div className="dashboard-header">
          <h1>ShipData KPI 실시간 모니터링</h1>
          <p>설비와 공정 상태를 한눈에 확인하세요</p>
        </div>

        

        {/* KPI 차트 */}
        <div className="dashboard-main">
          <KpiChart kpiData={kpiData} />
        </div>
    </div>
  );
}

export default KpiDashboard;

