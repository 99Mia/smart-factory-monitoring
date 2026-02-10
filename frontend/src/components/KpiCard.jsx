import { Bar, Doughnut,  Scatter } from "react-chartjs-2"
import "../css/KpiCard.css"
import kpiUnits from "../common/kpiUnits";

/*
그러니까 KpiChart에 어떤 타입의 차트인지 종류만 적어둔다.
type = "doughnut" 이런식으로 데이터만 kpiCard 에 넣어준다. 
kpiCard는 실제 화면 렌더링 담당이다
어떤 차트인지 type 만 보고 조건부 렌더링을 한다
type == "doughnut" 이면 도넛차트, bar 이면 바차트, line 이면 라인차트를 그려준다 
*/
/*
KpiCard는 KpiChart에서 넘긴 하나의 KPI 객체를 그대로 받아오는 부분이다
즉, 여기서 item 하나가
{
  label: 연료효율
  value: 30
  type: doughnut
  data: ...
}

이런식으로 들어온다. 여기서 label, value, type, data를 전부 props로 받아온다
KpiCard는 이걸 받아서 화면에 출력하는 역할을 한다
*/
function KpiCard({label, value, type, data, status, unit}){

  // 상태별 색상
  const getStatusColor = (s) => {
    if(s === "danger") return "#e15759";
    if(s === "warning") return "#f28e2c";
    if(s === "normal") return "#4e79a7";
    
  };

  // 상태별 이모지 아이콘
  const getStatusLabel = (s) => {
    if(s === "danger") return "🔴";
    if(s === "warning") return "🟡";
    if(s === "normal") return "🟢"; 
  };

  // 공통 tooltip 옵션
  const tooltipOptions = {
    enabled: true,
    mode: "nearest",      // 근처 포인트까지 hover
    intersect: false,     // 포인트 바로 위 아니어도 hover
    titleFont: { size: 18 },  // 툴팁 제목 글자
    bodyFont: { size: 20 },   // 툴팁 내용 글자
    padding: 10
  };


  return(
    <div className="kpi-card">
      <h3 className="kpi-title">{label}</h3>
      <div className="kpi-value">
        {value !== null && value !== undefined ? value.toFixed(2) : "데이터 없음"} {unit || ""} 
      </div>

      <div
        className="kpi-status"
        style={{ color: getStatusColor(status) }}
      >
        {getStatusLabel(status)}
      </div>

       {type === "doughnut" && (
        <Doughnut
          data={data}
          options={{
            cutout: "65%",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: tooltipOptions
            }
          }}
        />
      )}

      {type === "bar" && (
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: {
              legend: { display: false },
              tooltip: tooltipOptions
            }
          }}
        />
      )}

      {type === "scatter" && (
        <Scatter
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, title: { display: true, text: "Decay Index" } },
              x: { display: false, min: -1, max: 1 }
            },
            elements: { point: { radius: 6, borderWidth: 2, backgroundColor: "#4e79a7" } },
            plugins: { legend: { display: false }, tooltip: tooltipOptions }
          }}
        />
      )}
    </div>
  );
}

export default KpiCard;