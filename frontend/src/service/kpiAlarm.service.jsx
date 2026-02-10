import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./token.service";

const BASE_URL = BASE_API_URL+"/api/alarms"


class KpiAlarmService{

 getKpiAlarms = () => {
     return axios.get(BASE_URL+"/all", {headers : authHeader()});
 }

 updateKpiAlarms = (id, editAlarm) => {
      return axios.put(BASE_URL+`/admin/${id}`, editAlarm, {headers: authHeader()});
 }


}

const kpiAlarmService = new KpiAlarmService();
export {kpiAlarmService};