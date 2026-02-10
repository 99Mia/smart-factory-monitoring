import { useState } from "react";
import TopNavi from "../components/TopNavi";
import AlarmSidebar from "./AlarmSidebar";
import Admin from "../admin/admin";
import AdminAlarmPage from "./AdminAlarmPage";


function AdminLayout(){
  const [selectedMenu, setSelectedMenu] = useState("adminDashboard");

  return(
      <div className="d-flex flex-grow-1 overflow-hidden" style={{ paddingTop: '100px' }}> {/* Flex로 사이드바+메인 레이아웃 */}
      <TopNavi />
      {/* 사이드바 */}
      <AlarmSidebar onSelect={setSelectedMenu} />

      {/* 메인 콘텐츠 */}
      <main className="flex-grow-1 p-3 overflow-auto">
        {selectedMenu === "adminDashboard" && <Admin />}
        {selectedMenu === "adminAlarmPage" && <AdminAlarmPage />}
      </main>
    </div>
  )

}
export default AdminLayout;