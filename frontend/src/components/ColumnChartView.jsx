// 실시간 폴링 + chart 그리기 (각 컬럼별)
// 기존 Rest API /column/{name}을 1~2 초마다 호출해서 데이터를 갱신
// 차트는 Chart.js 사용(Line, Bar 등 선택 가능)
// 기존 리스트 컬럼 데이터와 독립적으로 동작

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { useEffect, useState } from "react";
import { shipColumns } from "../common/shipColumns";
import { getColumnData } from "../service/column.service";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import "../css/ColumChartView.css";


function ColumnChartView(){

  // 각 컬럼별 실시간 데이터를 저장하는 객체이다 
  /*
  예를 들면 
  chartDataMap ={
    leverPosition : [100, 105m 102],
    fuelFlow: [50,52, 51],
    shipSpeed: [75, 76, 78]
  }
    이런식으로 col.key를 카로 사용하고 배열에는 시간 순서대로 데이터가 쌓인다
   */
  const [chartDataMap, setChartDataMap] = useState({}); 


  /*
  데이터를 폴링하고 실시간 추가기능 
  shipColumns.forEach는 각 요소(col)에 대해 반복문을 실행한다. 
  순서대로 col.key로 API를 호출하고 해당 컬럼의 데이터를 받아와서 chartDataMap에 추가하는 흐름이다. 
  즉, 가 컬럼별 데이터를 독립적으로 실시간 처리하기 위해서 사용한다 
  여기서 col 안에는 shipColumns안의 한줄 
   { key: "leverPosition", label: "Lever Position" }, 이게 들어간다 
  */
  useEffect(()=>{
    shipColumns.forEach((col)=>{
      // 현재 칼럼 col.key 의 데이터를 몇 번째 까지 화면에 추가했는지를 추적하는 변수이다. 
      // 나중에 fullDataCol[index]로 데이터를 하나씩 가져올 때 사용한다
      let index=0;
      // 서버에 col.key로 데이터를 요청함
      getColumnData(col.key)
        .then((response)=> {
          // 서버로 부터 받은 컬럼별 전체 데이터를 fullDataCol에 저장한다.
          // 예를 들면 leverPosition이면 [2.3, 4.5, 5.56 ...] 이런 데이터가 저장된다
          const fullDataCol = response.data;
          // 이거는 2초마다 반복 실행하는 코드이다. 반복할 때 마다 한 개씩 데이터를 추가해서 실시간 처럼 보이게 한다
          const interval = setInterval(()=>{
            // state 인 ChartDataMap의 값을 변경하는 함수 부분이다. 기존의 데이터 prev를 
            setChartDataMap((prev)=> {
              /*
                chartDataMap은 지금 상태에서 모든 컬럼별 데이터를 저장하는 객체이다
                prev = {
                  leverPosition: [10,22,33 ..],
                  engineTemp: [70,88,43 ...],
                  ...
                }
                이런식으로 모든 컬럼별 데이터를 가지고 있다 
                여기서 col.key === leverPosition 이라고 하면 
                prev[col.key] === prev["leverPosition"] === [10,23,34...]
                이런식으로 컬럼의 기존 데이터를 가져오는 것이다.
                데이터가 없으면 빈 배열을 가져오고 
              */
              const prevData = prev[col.key] || [];
              /*
              2초 마다 실행되는 반복(interval)안에서 호출되는 부분이다
              위에서 prevData 안에 현재 컬럼 col.key의 기존 데이터를 가져와서 넣었다. 
              여기서 index는 위에서 선언한 let index =0; 이부분이다 
              --> 현재 컬럼의 몇 번째 부분까지 화면에 추가했는지를 확인하는 index 부분이다
              fullDataCol 은 위에서 선언했듯이 서버에서 응답한 response.data 를 넣은 변수이다
              거기 안에는 col.key(컬럼 이름)으로 서버로 요청해서 받은 col.key 에 따른 데이터 리스트가
              들어가있다
              그렇게 서버에서 받은 데이터 리스트의 길이가 현재 화면에 그려지는 index의 숫자가 더 
              커질때, 반복을 중단하라는 의미이다.
              
              setChartDataMap 에서 반환(return)값은 새로운 상태(new state)가 된다
              따라서 return prev; 하면은 상태를 변경하지 않고 그대로 두겠다는 의미이다. 
              즉, index 숫자가 fullDataCol의 길이보다 커지면 기존 데이터를 유지하고
              차트 업데이트도 하지 않겠다는 의미이다
              */
              if (index >= fullDataCol.length){
                clearInterval(interval);
                return prev;
              }

              /*
              그런데 index 숫자가 fullDataCol의 길이보다 더 작다면 
              chartDataMap state를 아래의 return 값으로 바꾸라는 말이다
              ...prev는 기존 상태를 그대로 복사한다. 
              ...prev를 하면 기존 데이터 그대로 유지할 수 있다. 새로 업데이트하는 컬럼만 바꾸고, 
              다른 컬럼 데이터는 그대로 두려는 것이다
              
              [col.key] 여기 col.key에 해당하는 데이터 배열을 : 콜론 오른쪽 값으로 바꾸라는 말이다
              기존 ...prevData 뒤에 fullDataCol[index] 새 데이터를 추가하는 것이다
              */
              return{
                ...prev,
                [col.key]:[...prevData, fullDataCol[index]],
              };
            });
            // index는 현재 추가할 데이터의 위치를 나타내는 숫자이고
            // fullDataCol[0] 부터 시작해서 차례로 데이터 하나씩 가져온다
            // index++ 는 다음 2초 후에는 다음 데이터를 추가하기 위해서 값을 1 증가시키는 역할이다 
            index++;
          },500); // 0.5초마다 setChartDataMap이 실행된다

        })
        .catch((err)=>
          console.error(`컬럼 ${col.key} 데이터 가져오기 실패`, err)
        );
    })
  },[])

  return(
    <div className="columnChart-dashboard">
      <div className="dashboard-header">
          <h1>모든 컬럼 실시간 차트</h1>
            <div>
              {shipColumns
                .filter(col => col.key !== "idx") // idx 칼럼 제외
                .map(col=>{
                  // chartDataMap은 현재 위에 선언한 state
                  const dataForChart = chartDataMap[col.key] || [];

                  const chartDataObj = {
                    labels: dataForChart,
                    datasets: [
                      {
                        label: col.label,
                        data: dataForChart,
                      },
                    ],
                  };
                  return (
                    <div key={col.key}>
                      <h3>{col.label}</h3>
                      <Line 
                        data={chartDataObj} 
                        options={{
                          animation: {duration: 500, easing: 'linear'},
                          elements: {point: {radius:0}}, // 점 안보이게, 라인만 보임
                          responsive: true,
                          scales: {
                            x: {title: {display:true, text:"value"}}
                          },
                          plugins: {legend: {display:true}},
                        }}
                      
                      />
                    </div>
                  )
                })}
            </div>

        </div>
     </div>
  )
}
export default ColumnChartView;