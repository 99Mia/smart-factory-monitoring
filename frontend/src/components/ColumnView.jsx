import { useEffect, useState } from "react";
import { getColumnData } from "../service/column.service";
import columnStore from "../store/columnStore";
import { shipColumns } from "../common/shipColumns";
import { authHeader } from "../service/token.service";

import columnUnits from "../common/columnUnits";


function ColumnView(){
  const columnName = columnStore((state)=> state.columnName)
  const setColumnName = columnStore((state) => state.setColumnName)
  const [data, setData] = useState([]);
  const [columnData, setColumnData] = useState({name:"", data:[]});

  useEffect(()=> {
    if (columnName) {
      console.log("요청 컬럼:", columnName);
      console.log("보낼 헤더:", authHeader());
      getColumnData(columnName)
       .then((response)=>{
         console.log("서버 응답:", response.data);
         // 서버에서 들어오는 형태는 List<Float> 형태로 들어온다
         // 우리가 보낸 요청 컬럼 columName 에 따라서 그 해당 컬럼의 List<Float> 형태가 넘어온다
         setData(response.data)
         setColumnData({name:columnName, data: response.data});
       })
      .catch((err) =>
          console.error("컬럼 데이터 불러오기 실패", err)
      );
    }
  },[columnName]);

  return(
    <div className="container my-4">
      <h2 className="text-primary mb-3">{columnName} 데이터 조회</h2>

      {/* 컬럼 선택 버튼
      바로 여기 setColumnName 여기에 col.key를 넣어준다. col.key는 서버로 보낼 columName 인 것이다
      shipColumns.jxs 파일 참고!!
      그래서 브라우저에서 col.key를 누르면 setColumnName 이라는 함수가 실행되고
      setColumnName이라는 함수는 columstore 안에서 columnName state를 바꾸는 함수이다. 그러면
      columnstore안에 columName이라는 state가 사용자가 클릭한 col.key (columnName)에 맞게 바뀌게된다
      그러면 state가 바뀌었으니까 리액트가 다시 한번더 화면을 렌더링하게되고
      ColumnView에서 store에 있는 columnName state를 columNName 이라는 변수로 받았다. 여기에는 
      브라우저에서 사용자가 클릭한 columnName state가 들어있고 그거를 useEffect를 사용해서
      화면이 뜨자마자 getColumnData 라는 함수에 columnName을 보내면 getColumnData라는 함수가 호출이되고
      이 함수는 column.service에 있는 함수가 호출되어서 서비스에 axios 요청을 하고 응답을받는다.
      그 응답 받은게 .then(response)이렇게 받고 그 응답받은거를 setData에 저장한다
      그러면 ColumnView에서 관리하는 state인 data에 응답받은 columnName 별 데이터가 list<Float> 형태로
      다 들어가있다 
      */}
      <div className="mb-4">
        {shipColumns
          .filter(col => col.key !== "idx")
          .map((col)=>(
            <button 
              key={col.key} 
              onClick={()=> setColumnName(col.key)}
              className={`btn btn-outline-primary me-2 mb-2 ${columnName === col.key ? "active" : ""}`}
            >
              {col.label}
            </button>
        ))}
      </div>

      <div className="row g-3">
        {data.map((dataItem, idx)=>(
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <span className="text-secondary">ID: {idx+1}</span>
                <span className="fw-bold text-primary">
                  {dataItem.toFixed(2)} {columnUnits[columnData.name] || ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


}
export default ColumnView;