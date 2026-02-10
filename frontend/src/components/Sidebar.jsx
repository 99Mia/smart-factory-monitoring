import "../css/Sidebar.css";

// 부모 컴포넌트는 MainLayout
function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
        <ul>
          <li onClick={() => onSelect("kpi")}>KPI</li>
          <li onClick={() => onSelect("realtimeKpi")}>실시간 데이터 KPI</li>
          <li onClick={() => onSelect("kpiAlarmPage")}>실시간 데이터 KPI Alarm Page</li>
          <li onClick={() => onSelect("realtimeColumn")}>실시간 데이터 Columns</li>
          <li onClick={() => onSelect("dashboard")}>Dashboard</li>
          <li onClick={() => onSelect("columnView")}>컬럼 데이터</li>
        </ul>
    </div>
  );
}

export default Sidebar;