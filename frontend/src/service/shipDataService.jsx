import axios from "axios"
import { BASE_API_URL } from "../common/constants"
import { authHeader } from "./token.service";

const BASE_URL=BASE_API_URL+"/api/ship"

class ShipDataService{
// 모든 ShipData 받아오기
  getAllShipData = () =>{
    return axios.get(BASE_URL+"/list",{ headers: authHeader()});
};

// 특정 shipdata 수정(관리자용)
// 여기 shipData는 브라우저에서 사용자가 수정한 데이터
  updateShipData = (id, editData) =>{
    return axios.put(BASE_URL+ `/admin/${id}`, editData, {headers: authHeader()});
  }

// 특정 shipdata 삭제(관리자용, 논리 삭제 가능)
  deleteShipData = (id) =>{
    return axios.delete(BASE_URL + `/admin/${id}`, {headers: authHeader()});
}
}

const shipDataService = new ShipDataService();
export {shipDataService};