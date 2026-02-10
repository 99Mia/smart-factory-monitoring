
// 액션타입 --> 상태를 어떤 방식으로 바꿀 지 구분하기 위해서 사용

import { create } from "zustand";
import { persist } from "zustand/middleware";

// 현재 스토어에 user 상태가 바뀌면 왜 바뀌었는지를 표시해주기 위해서 사용
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

const userUserStore=create(
  // localstore(브라우저 안의 store)에 데이터 저장 --> 브라우저를 닫거나 새로고침해도 로그인 정보 유지
    persist(
      (set) => ({
        // state user 선언
        user: null,
        // 여기서 매개변수 user는 login.jsx 부분에서 서버(백엔드)로부터 응답받은 response.data 가 들어온다
        // handleLogin 함수 안에서 setCurrentUser(response.data) 이런식으로 데이터를 넣어줌
        setCurrentUser: (user) =>
          set({
            user,
            lastAction : SET_CURRENT_USER,
          }),
        clearCurrentUser: () =>
          set({
            user:null, 
            lastAction:CLEAR_CURRENT_USER,
          }),

      }),

      // 스토어 이름 정의
      {name : 'currentUser'}
    )
)
export default userUserStore ;