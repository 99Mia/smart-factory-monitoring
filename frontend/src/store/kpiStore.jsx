import { create } from "zustand";
import { persist } from "zustand/middleware";


const useKpiStore = create(
  persist(
  (set)=>({
  // 초기값은 0
  kpiData: null,
  setKpiData: (data) => 
    set({kpiData:data}),
}),
 {name : 'kpiStore'}
)
);
export default useKpiStore;