import React from "react";

function AlarmTable({ alarms, onEdit }) {
  if (!alarms || alarms.length === 0) {
    return <div className="text-center text-secondary my-3">저장된 알람이 없습니다.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>KPI</th>
            <th>메시지</th>
            <th>Status</th>
            <th>값</th>
            <th>시간</th>
            {onEdit && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm, idx) => {
            let rowClass = "";
            if (alarm.type === "danger") rowClass = "table-danger";
            else if (alarm.type === "warning") rowClass = "table-warning";

            return (
              <tr key={idx} className={rowClass}>
                <td>{idx + 1}</td>
                <td>{alarm.kpi}</td>
                <td>{alarm.msg}</td>
                <td>{alarm.type}</td>
                <td>{alarm.value}</td>
                <td>{alarm.timestamp}</td>
                {onEdit && (
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onEdit(alarm)}
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AlarmTable;