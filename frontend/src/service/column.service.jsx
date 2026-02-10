import axios from "axios"
import { BASE_API_URL } from "../common/constants"
import { authHeader } from "./token.service"

// 여기서 response 받는 응답은 List<Float> 이다. 그 안에는 하나의 컬럼의 데이터 리스트가 들어있다.
// 예를들면 leverPosition의 데이터만 들어있는 식이다. 여기서 leverPosition은 리액트에서 
// axios.get 요청안에 보내는 columnName이고 
// 서버 엔드포인트인 /api/ship/column/{name} 여기로 요청을 보낸다. 그러면 서버가 getMapping으로 
// 리액트의 요청을 받는데 그 안에있는 함수 getColumnData 함수에서 리액트에서 보낸 columnName을 매개변수로 
// 받아서 서비스에 그 값을 넣어서 요청보낸 columnName의 데이터만 리스트 형태로 반환해준다
const BASE_URL= BASE_API_URL+"/api/ship"

const getColumnData = (columnName) =>{
  console.log('columName'+columnName);
  return axios.get(BASE_URL+"/column/"+ columnName, {headers: authHeader()});
}
export {getColumnData};