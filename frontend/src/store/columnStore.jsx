import { create } from "zustand";
import { persist } from "zustand/middleware";


// 액션타입
export const SET_COLUMN_NAME = "SET_COLUMN_NAME";
export const CLEAR_COLUMN_NAME = "CLEAR_COLUMN_NAME";

const columnStore = create(
  persist(
    (set) => ({
      // 기본 columnName
      columnName: "leverPosition",
      // columnName 변경 
      setColumnName: (name) =>
        set({
          columnName: name,
          lastAction: SET_COLUMN_NAME,
        }),

        // 초기화(필요하면)
        clearColumnName : ()=>
          set({
            columnName: null,
            lastAction: CLEAR_COLUMN_NAME,
          }),
    }),

    // LocalStorage에 저장할 이름
    {
      name: "selectedColumn",
    }
  )
);
export default columnStore;