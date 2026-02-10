import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./token.service";

const BASE_URL=BASE_API_URL+"/api/kpi";

const getKpiData = () =>{
  return axios.get(BASE_URL, {headers : authHeader()});
}
export {getKpiData};