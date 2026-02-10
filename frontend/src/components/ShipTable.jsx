import React from "react";
import { shipColumns } from "../common/shipColumns";
import columnUnits from "../common/columnUnits";

//  ShipTable 의 부모 컴포넌트는 Dashboard.jsx(사용자용)과 AdminPage.jsx(관리자용)이 있다
// 부모컴포넌트에서 받아온 props 데이터를 자식 컴포넌트에서 쓸 수 있는 것이다
// 그러니까 ShipTable은 전달받은 shipList를 화면으로 렌더링하는 역할이다. 데이터를 생성하거나
// 저장하지 않는다. 단지 shipList를 표로 보여주는 것만 할 뿐임 

/*
흐름!!!!!!!
App.jsx에서 
<Dashboard currentUser={currentUser}/>  이렇게 Dashboard 컴포넌트를 렌더링하면
Dashboard 안에서useEffect로 서버에서 데이터를 가져오고 shipList를 state로 저장한다
Dashboard는 <ShipTable shipList = {shipList}로 자식에게 props를 전달한다. 
그러면 ShipTable이 화면에 테이블을 렌더링한다. 
결론, App이 Dashboard를 렌더링하면, ShipTable이 만든 테이블도 자동으로 화면에 나타난다.
즉, 자식이 렌더링해도 부모가 관리하는 데이터를 기준으로 그려지기때문에 부모상태와
UI가 연동된 상태 그대로 화면에 표시된다

*/
function ShipTable({ shipList, onEdit }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle table-striped">
        <thead className="table-primary">
          <tr>
            {/* shipColumns 기반으로 헤더 자동 생성 */}
            {shipColumns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}

            {/* 부모 컴포넌트가 onEdit 이라는 props를 넘겼을때만 Actions 열을 보여준다 */}
            {onEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {shipList.map((ship) => (
            <tr key={ship.idx}>

              {/* shipColumns 기반으로 데이터 자동 생성 */}
              {shipColumns.map(col =>(
                <td key={col.key} className="py-1 px-2">
                  {
                    col.key === "idx" ? ship[col.key] + 1 : 
                    `${ship[col.key].toFixed(2)} ${columnUnits[col.key] || ""}`
                  }
                </td>
              ))}

              {/* 조건부 렌더링
              부모가 onEdit 이라는 props를 보냈을 때만 버튼을 렌더링한다. 
              부모가 onEdit을 안보냈다면 버튼이 절대 안보인다
              row에 있는 ship 데이터를 수정화면으로 전달한다

              ********onClick 경우에는 onEdit안에 ship이라는 매개변수가 있다. 
              인자를 가지고 있다면
              onClick{onEdit(ship)} 이렇게 쓰면 버튼이 안먹힌다
              그래서 매개변수를 넣고 싶으면 이렇게 () => onEdit() 이런식으로 익명 함수로 감싸야한다

              핵심결론!!!! 자식이 부모 함수를 호출하는 순간, 자식에서 전달한 매개변수가 그대로 부모함수로 
              넘어간다.  
              */}
              {onEdit && (
                <td className="py-1 px-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(ship)}
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipTable;