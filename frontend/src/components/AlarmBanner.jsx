import { useEffect, useState } from "react";
import "../css/AlarmBanner.css"

function AlarmBanner({ alarms }) {

  const bgColor = alarms && alarms.some(a => a.type === "danger")
  ? "#e15759"  
  : alarms && alarms.some(a => a.type === "warning")
  ? "#f28e2c"
  : "#4e79a7"

  return(
    <div className="alarm-banner" style={{backgroundColor: bgColor}}>
      {alarms && alarms.length > 0 ? alarms.map((a, idx) => (
        <span key={idx} className="alarm-msg">
          {a.msg}
        </span>
      ))
      : <span className="alarm-msg">모든 KPI 정상</span>
    }
    </div>
  )
}

export default AlarmBanner;