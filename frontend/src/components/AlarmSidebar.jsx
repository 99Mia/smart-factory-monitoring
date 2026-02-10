

function AlarmSidebar({ onSelect }) {
  return (
    <nav className="d-flex flex-column bg-light p-3" style={{ minWidth: "220px" }}>
      <ul className="nav nav-pills flex-column gap-2">
        <li className="nav-item">
          <button className="btn btn-outline-primary w-100" onClick={() => onSelect("adminDashboard")}>
            관리자 ShipTable 대시보드
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-primary w-100" onClick={() => onSelect("adminAlarmPage")}>
            관리자 KPI 알람 페이지
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default AlarmSidebar;