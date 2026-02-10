/*
여기서 KpiChart는 데이터 구성 담당이다
kpi 리스트 만들고 각 kpi item에 label, value, type, data를 생성하고
kpiCard에 넘겨준다
 */

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

import KpiCard from "./KpiCard";
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



// 부모 컴포넌트는 Kpi.jsx
function KpiChart({kpiData}){
  if (!kpiData) return <div>데이터 로딩중...</div>;

  // 값이 낮을 수록 위험한 KPI (연료효율...)
  const getColorLowIsDanger = (v, w, d) => {
     if(v < d) return "#e15759";
     if(v < w) return "#f6c23e";
     return "#4e79a7";
  }
  // 값이 높을 수록 위험한 KPi (엔진 부하율, Rpm 변동성, 프로펠러 균형, 예지보전 지수)
  const getColorHighDanger = (v, w, d) => {
    if(v > d) return "#e15759";
    if(v > w) return "#f6c23e";
     return "#4e79a7";
  }

  // 안전하게 값 추출
  const fuelEfficiencyValue = kpiData?.fuelEfficiency?.value ?? 0;
  const fuelEfficiencyStatus = kpiData?.fuelEfficiency?.status ?? "normal";

  const torqueValue = (kpiData?.torqueUtilization?.value ?? 0) * 100;
  const torqueStatus = kpiData?.torqueUtilization?.status ?? "normal";

  const rpmValue = kpiData?.gtRpmStd?.value ?? 0;
  const rpmStatus = kpiData?.gtRpmStd?.status ?? "normal";

  const propellerRaw = kpiData?.propellerBalance?.value;
  const propellerValue = propellerRaw ?? 0;
  const propellerStatus = kpiData?.propellerBalance?.status ?? "normal";

  const decayValue = kpiData?.decayIndex?.value ?? 0;
  const decayStatus = kpiData?.decayIndex?.status ?? "normal";


  // kpis 배열
  const kpis = [
    {
      label: "연료 효율",
      value : fuelEfficiencyValue,
      unit: kpiUnits.fuelEfficiency,
      status: fuelEfficiencyStatus,
      type:"doughnut",
      data: {
        datasets: [
          {
             data: [fuelEfficiencyValue, 100 - fuelEfficiencyValue],
            backgroundColor: [getColorLowIsDanger(fuelEfficiencyValue, 23, 21), "#e0e0e0"],
          },
        ],
      },
    },
    
    {
      label: "엔진 부하율",
      value: torqueValue,
      unit: kpiUnits.torqueUtilization,
      status: torqueStatus,
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [torqueValue, 100 - torqueValue],
            backgroundColor: [getColorHighDanger(torqueValue, 87, 88), "#e0e0e0"],
          },
        ],
      },
    },
    

    {
      label: "RPM 변동성",
      value: rpmValue,
      unit : kpiUnits.gtRpmStd,
      status: rpmStatus,
      type: "bar",
      data: {
        labels: ["RPM"],
        datasets: [{
          data: [rpmValue],
          backgroundColor: getColorHighDanger(rpmValue, 895, 897),
        }],
      },
    },

/*
여기서 위에 선언한 propellerValue를 value 에 넣는다. 프로펠러 균형 평균값이 null 이거나 definded 되어있으면
null 을 표시하고 아니면 propellerRaw라는 진짜 데이터를 표시하라는 변수이다
타입은 바 차트로 명시했고, 
데이터는 propeller 라고 라벨을 주고, 그 안에 데이터는 propellerValue를 넣었다
data 안에는 labels와 datasets 이 들어갈 수 있고,
datasets에는 data와 backgroundColor 가 들어갈 수 있다. data는 필수지만 backgroundColor는 필수는 아니다
여기서는 만약 프로펠러 균형이 5 보다 커지면 경고 알람을 표시하기 위해서 사용된 것이다.
백 그라운드 컬러가 getColor 함수라는 것을 보면 propellerValue가 5보가 커지면 붉은색, 아니면 파란색을
띄워라는 말이다
*/
    {
      label: "프로펠러 균형",
      value : propellerValue,
      unit: kpiUnits.propellerBalance,
      status: propellerStatus,
      type: "bar",
      data: {
        labels: ["Propeller"],
        datasets:[
          {
            data: [propellerValue],  // 0을 확실하게 보여줌
            backgroundColor: getColorHighDanger(propellerValue, 2.8, 2.9),
          },
        ],
      },
    },

    {
      label: "예지보전 지수",
      value: decayValue,
      unit: kpiUnits.decayIndex,
      status: decayStatus,
      type: "scatter",
      data: {
        labels: ["Decay"], // x축 라벨이다
        datasets: [
          {
            data:  [{ x: 0, y: decayValue }],
            backgroundColor: getColorHighDanger(decayValue, 4.6, 4.9),
          
            
          },
        ],
      },

    },
  ];
  
  return (
    /*
    여기서 item은 kpis 배열 안에 들어있는 객체 한개를 뜻한다 예를들면 예지보전 지수 객체 한개
    {label:.. value:.. type:.. data:.. } 이런 하나의 객체를 의미하고, i는 인덱스를 의미한다
    KpiCard에 item(객체)안의 모든 데이터를 보내는게 맞다
    ...item은 객체를 펼쳐서 그 안의 key/value들을 개별 props로 전달하는 문법이다. 
    실제로는 label={item.label}, value={item.value} type={item.type} data={item.data}
    이런식으로 props를 label, value, type, data 이렇게 4개를 보내는 것과 똑같은 것이다
    
    */
    <div className="kpi-chart-container">
      {kpis.map((item,i)=>(
        <KpiCard key={i} {...item}/>
      ))}
    </div>
  )
}


export default KpiChart;