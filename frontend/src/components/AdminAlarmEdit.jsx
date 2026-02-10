import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";


const AdminAlarmEdit = forwardRef(({onSave },ref) => {
  const [editAlarm, setEditAlarm] = useState({});
  const [show, setShow] = useState(false);
   const [submitted, setSubmitted] = useState(false);

  //부모가 ref로 호출할 수 있는 메서드 정의
  useImperativeHandle(ref, () => ({
    // 여기 매개변수 data 는 부목 adminAlarmPage에서 넘긴 브라우저에서 사용자가 선택한 하나의 알람 객체이다
    // 모달을 띄울 때 그 안에서 사용자가 선택한 data 정보가 들어있어야하기 때문에 필요하다
    showAlarmEditModal(data) {
      setEditAlarm(data || {});
      setTimeout(() => setShow(true), 0)
    }
  }));

  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditAlarm(prev => ({...prev, [name]:value}));
  }

  const saveAlarm=(e)=>{
    e.preventDefault();
    setSubmitted(true);
    if (!editAlarm.id){
      console.error("알람 ID가 없습니다!")
      return;
    }
    onSave(editAlarm)
    setShow(false); 
    setSubmitted(false);   
  }

return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      container={document.body}
      backdrop="static"
      dialogClassName="rounded-4"
      scrollable
    >
      {/* 헤더 */}
      <Modal.Header closeButton className="bg-primary text-white rounded-top">
        <Modal.Title>데이터 수정</Modal.Title>
      </Modal.Header>

      {/* 바디 */}
      <Modal.Body className="p-4 d-flex flex-column gap-3">
        {Object.keys(editAlarm).map((key) => (
          <div key={key} className="d-flex flex-column">
            <label className="form-label">{key}</label>
            <input
              type="text"
              className="form-control rounded-3"
              name={key}
              value={editAlarm[key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </Modal.Body>

      {/* 푸터 */}
      <Modal.Footer className="border-0">
        <button
          type="button"
          className="btn btn-secondary rounded-3"
          onClick={() => setShow(false)}
        >
          닫기
        </button>
        <button
          type="button"
          className="btn btn-primary rounded-3"
          onClick={saveAlarm}
        >
          저장
        </button>
      </Modal.Footer>
    </Modal>
  );
});

export default AdminAlarmEdit;