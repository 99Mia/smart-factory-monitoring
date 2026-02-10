import { Bar, Doughnut, Scatter } from "react-chartjs-2";
import "../css/KpiCard.css"

function KpiDbCard({ label, value, type, data, unit }) {
  
    // 공통 tooltip 옵션
  const tooltipOptions = {
    enabled: true,
    mode: "nearest",    // 근처 포인트까지 hover
    intersect: false,   // 포인트 바로 위 아니어도 hover
    titleFont: { size: 18, weight: "bold" },
    bodyFont: { size: 16 },
    padding: 8
  };


  return (
    <div className="kpi-card">
      <h3 className="kpi-title">{label}</h3>
      <div className="kpi-chart-value">
         {value !== null && value !== undefined ? value.toFixed(2) : "데이터 없음"} {unit || ""} 
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


export default KpiDbCard;