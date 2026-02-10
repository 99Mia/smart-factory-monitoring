import { useEffect, useState } from "react";
import { getKpiData } from "../service/kpi.service";
import useKpiStore from "../store/kpiStore";
import KpiDbCart from "./KpiDbChart";
import "../css/KpiDashboard.css";


//실시간 데이터 처리 → WebSocket, SSE 등을 이용해 실시간 차트
// 예측형 KPI → 단순 평균 외에 회귀/ML 예측 지표 추가
// 프론트엔드 시각화 고도화 → 게이지, 라인/도넛 차트, 경고색 표시 등

function Kpi(){
  const kpiData = useKpiStore((state)=> state.kpiData);
  const setKpiData = useKpiStore((state)=> state.setKpiData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=> {
    getKpiData()
     .then((response)=>{
      console.log('kpi 응답'+ response)
      setKpiData(response.data);
      setLoading(false);
     })
     .catch(err => {
       console.error(err);
       setError("KPI 데이터를 불러오는 중 오류 발생");
       setLoading(false);
     });
  },[]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return(
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>정적 DB에 따른 KPI 평균 분석</h1>
          <div className="kpi-container">

            <div className="kpi-item">
              <span className="kpi-label">연료 효율:</span>
              <span className="kpi-value">{(kpiData.fuelEfficiency).toFixed(2)} m·s/kg</span>
            </div>

            <div className="kpi-item">
              <span className="kpi-label">엔진 부하율:</span>
              <span className="kpi-value">{(kpiData.torqueUtilization * 100).toFixed(2)} %</span>
            </div>

            <div className="kpi-item">
              <span className="kpi-label">RPM 변동성:</span>
              <span className="kpi-value">{kpiData.gtRpmStd.toFixed(2)} rpm</span>
            </div>

            
            <div className="kpi-item">
              <span className="kpi-label">프로펠러 균형:</span>
              <span className="kpi-value">{kpiData.propellerBalance.toFixed(2)} kN</span>
            </div>

            <div className="kpi-item">
              <span className="kpi-label">예지보전 지수:</span>
              <span className="kpi-value">{kpiData.decayIndex.toFixed(2)}</span>
            </div>

        </div>
        <KpiDbCart kpiData={kpiData} />
      </div>
    </div>
  );
}
export default Kpi;