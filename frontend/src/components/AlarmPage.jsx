/*
모든 과거 알람 기록 조회
db에 쌓인 전체 데이터
갱신 주기: 필요시 조회, 필터 가능
별도 페이지에서 테이블/ 필터/ 검색 등 상세 확인
상세보기, 검색, 정렬, 삭제 가능하게
삭제는 admin 만 
필요시 pdf/csv 다운로드 등 기록 보존 목적
*/

import { useEffect, useState } from "react"

import AlarmTable from "./AlarmTable";
import { kpiAlarmService } from "../service/kpiAlarm.service";


function AlarmPage() {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() =>{
    // 서버에서 모든 알람 가져오기
    kpiAlarmService.getKpiAlarms()
     .then((response)=>{
       setAlarms(response.data);
       setLoading(false);
     })
    .catch(err => {
      console.error(err);
      setError("KPI 데이터를 불러오는 중 오류 발생");
      setLoading(false);
  });
  },[])

  if (loading) return <div className="text-center my-5 fs-5 text-secondary">로딩 중...</div>;
  if (error) return <div className="text-center my-5 text-danger fs-5">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary fw-semibold">알람 기록</h2>
      <div className="card rounded-4 shadow-sm">
        <div className="card-body p-3">
          <AlarmTable alarms={alarms} tableClass="table table-hover table-striped align-middle" />
        </div>
      </div>
    </div>
  )

}
export default AlarmPage;