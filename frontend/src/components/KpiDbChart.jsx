import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // Line 차트용
  LineElement,  // Line 차트용
  Title,
  Tooltip,
  Legend
} from "chart.js";
import KpiDbCard from "./KpiDbCard";
import "../css/KpiChart.css"
import kpiUnits from "../common/kpiUnits";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // 반드시 필요
  LineElement,  // 반드시 필요
  Title,
  Tooltip,
  Legend
);

function KpiDbCart({kpiData}){
  if (!kpiData) return <div>데이터 로딩중...</div>;

  const getColorLowIsDanger = (v, t) =>{
    if (v < t) return "#e15759";
    return "#4e79a7";
  }

  const getColorHighDanger = (v, t) => {
    if (v > t) return "#e15759";
    return "#4e79a7";
  }

  const propellerRaw = kpiData.propellerBalance;
  const propellerValue = propellerRaw === undefined || propellerRaw === null ? null: propellerRaw;

  const kpis = [
      {
      label: "연료 효율",
      value: kpiData.fuelEfficiency,
      unit: kpiUnits.fuelEfficiency,
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [kpiData.fuelEfficiency, 100 - kpiData.fuelEfficiency],
            backgroundColor: [getColorLowIsDanger(kpiData.fuelEfficiency, 28), "#e0e0e0"],
          },
        ],
      },
     },
      {
        label: "엔진 부하율",
        value: kpiData.torqueUtilization * 100,
        unit: kpiUnits.torqueUtilization,
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [
                kpiData.torqueUtilization * 100,
                100 - kpiData.torqueUtilization * 100,
              ],
              backgroundColor: [
                getColorHighDanger(kpiData.torqueUtilization * 100, 80),"#e0e0e0"
              ],
            },
          ],
        },
      },

      {
        label: "RPM 변동성",
        value: kpiData.gtRpmStd,
        unit: kpiUnits.gtRpmStd,
        type: "bar",
        data: {
          labels: ["RPM"],
          datasets: [{
            data: [kpiData.gtRpmStd],
            backgroundColor: getColorHighDanger(kpiData.gtRpmStd, 800),
          }],
        },
      },

      {
        label: "프로펠러 균형",
        value: propellerValue,
        unit: kpiUnits.propellerBalance,
        type: "bar",
        data: {
          labels: ["Propeller"],
          datasets: [
            {
              data: [propellerValue ?? 0],
              backgroundColor: getColorHighDanger(propellerValue ?? 0, 2.5),
            },
          ],
        },
      },

      {
        label: "예지보전 지수",
        value: kpiData.decayIndex,
        unit: kpiUnits.decayIndex,
        type: "scatter",
        data: {
          labels: ["Decay"],
          datasets: [
            {
              data: [{x:0, y:kpiData.decayIndex}],
              backgroundColor: getColorHighDanger(kpiData.decayIndex, 4),
            },
          ],
        },   
      }, 

  ];

  return (
    <div className="kpi-chart-container">
      {kpis.map((item,i)=>(
        <KpiDbCard key ={i} {...item}/>
      ))}
    </div>
  )
}

export default KpiDbCart;