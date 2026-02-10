import { forwardRef,  useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import { shipColumns } from "../common/shipColumns";

const ShipDataEdit = forwardRef((props, ref)=>{
  const initialData= {};
  shipColumns.forEach(col => initialData[col.key]='');   // 초기값 '' 생성
  const [editData, setEditData] = useState(initialData);
  const [errorMessage, setErrorMessage]= useState('');
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useImperativeHandle(ref, ()=>({
    showShipEditModal(data){
      // 부모가 넘긴 ship 데이터를 editData state에 저장한다
      // 여기서 ship 데이터는 사용자가 클릭한 ship 데이터 한 줄이 다 들어가있는 것이다
      // 그거를 자식 컴포넌트 editData state에 넣어줬다
      // 그러면 editData[col.key]는 input의 value 부분이된다 -> 사용자가 수정하려고 입력한 부분
      // editData state는 사용자가 값을 넣는 즉시 즉시 바로 바뀐다 value랑 연결되어있기도 하고
      // 중요한거는 handleChange 함수가 input 데이터를 바로바로 state에 넣을수 있게 만든다
      setEditData(data);
      // 이거는 자식컴포넌트가 완전히 렌더링 된 뒤에 모달을 띄우겠다는 의미이다
      // 자식 컴포넌트가 완전히 렌더링 된 뒤에 부모가 요청한는 shoShipEditModal을 실행시키겠다는 의미이다
      setTimeout(()=>setShow(true),0)
    }
  }));
// 여기서 props.shipData에서는 admin 컴포넌트에서 보낸 shipData props를 찾아보면 selectedShip 이라는
// state를 (데이터)를 보내온다.
// 그 selectedShip이라는 데이터를 ShipList 안에 넣어서 자신의 ShipList state에 저장한다


  const handleChange = (e) => {
    // e.target(즉, 사용자가 input 에서 데이터를 수정해서 발생한 이벤트를 onChange가 받아서
    // handleChange라는 함수가 실행되게 만든다)
    // 그러면 여기서 이벤트로 받은 e.target 에서 name과 value를 구조화 한 뒤에
    // state에 바로 넣어준다
    /*
    지금 e.target에 들어가있는 속성값은
    {
    name: "fuelFlow", // input 태그의 name 속성
    value: "123.45",  // input 태그의 현재 입력된 값
    type: "text",     // input 타입
    ...
    }
    이렇게 있다. 이런 속성값에서 name 과 value를 가져오는 것이다. 
    [name] : value => 이 말은 name을 value로 바꾸라는 말이다
    */
    const {name, value} = e.target;
    setEditData(prev => ({...prev, [name]:value}));
  }  

  // 수정한 부분 저장하고 모달창 초기화하는 부분
  const saveShipList=(e)=>{
    // 이거는 submit 버튼을 사용자가 누르면 그거가 submit 되기전에 이 saveShipList를 먼저 실행하겠다는 말이다
    e.preventDefault();
    setSubmitted(true);
    props.onSave(editData);
    setShow(false);
    setSubmitted(false);
  };

  return(
    <Modal
      show={show}
      centered
      backdrop="static"
      size='lg'
      dialogClassName="rounded-4 shadow-sm"
      scrollable
    >
      {/* 헤더 */}
      <Modal.Header closeButton className="bg-primary text-white rounded-top">
        <Modal.Title>데이터 수정</Modal.Title>
      </Modal.Header>

      {/* 에러 메시지 */}
      {errorMessage && <div className="alert alert-danger m-3">{errorMessage}</div>}

      {/* 바디 */}
      <Modal.Body>
        <form onSubmit={saveShipList} noValidate className={submitted ? 'was-validated' : ''}>
          {shipColumns.map(col => (
            <div key={col.key} className="mb-3">
              <label className="form-label">{col.label}</label>
              <input
                name={col.key}
                value={editData[col.key] || ''}
                onChange={handleChange}
                className="form-control rounded-3"
              />
            </div>
          ))}

          {/* 버튼 */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type='button'
              className="btn btn-secondary rounded-3"
              onClick={() => setShow(false)}
            >
              닫기
            </button>
            <button
              type='submit'
              className="btn btn-primary rounded-3"
            >
              수정하기
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
});

export default ShipDataEdit;