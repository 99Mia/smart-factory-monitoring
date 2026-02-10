import { useEffect, useState } from "react";
import TopNavi from "./TopNavi";
import { Dashboard } from "./Dashboard";
import Sidebar from "./Sidebar";
import ColumnView from "./ColumnView";
import Kpi from "./Kpi";
import KpiDashboard from "./KpiDashboard";
import ColumnChartView from "./ColumnChartView";
import AlarmPage from "./AlarmPage";
import "../css/MainLayout.css"

function MainLayout({currentUser}){
  const [selectedMenu, setSelectedMenu] = useState("realtimeKpi"); 

  return (
   <div className="main-layout">
    <TopNavi /> 
      <div className="layout-body">  
      <Sidebar onSelect = {setSelectedMenu} />
      
      {/* 오른쪽 메인 내용 */}
        <main className="main-content">
          {selectedMenu === "kpi" && <Kpi />}
          {selectedMenu === "kpiAlarmPage" && <AlarmPage />}
          {selectedMenu === "realtimeColumn" && <ColumnChartView />}
          {selectedMenu === "realtimeKpi" && <KpiDashboard />}
          {selectedMenu === "dashboard" && <Dashboard currentUser={currentUser} />}
          {selectedMenu === "columnView" && <ColumnView />}
        </main>
      </div>
    </div>
  )
}
export default MainLayout;