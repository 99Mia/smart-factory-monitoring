import React from "react";
import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Role } from "./models/Role";
import Login from "./login/login";
import Register from "./register/Register";
import Profile from "./Profile/profile";
import { GuestView } from "./components/Dashboard";
import userUserStore from "./store/userUserStore";
import AuthGuard from "./guards/AuthGuard";
import UnAuthorized from "./unauthorized/Unauthorized";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const currentUser = userUserStore((state) => state.user);
  return ( 
  <>
     
      
      <Routes>
        {/* 로그인 안 한 사람은 GuestView */}
        <Route path='/'
          element={!currentUser ? <GuestView /> : <Navigate to="/main" />}>
        </Route>

        {/* 로그인한 사람은 main로 로그인 안한 사람은 다시 / 페이지로(게스트 페이지)*/}
        <Route
          path='/main' element={currentUser ? 
          <MainLayout currentUser={currentUser}/> : <Navigate to="/"/>}>
        </Route>

        {/* 로그인 페이지 */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route path='/profile' element={
            <AuthGuard roles={[Role.ADMIN, Role.USER]}>
              <Profile />
            </AuthGuard>}>
        </Route>

        <Route path='/admin' element={
          <AuthGuard roles={[Role.ADMIN]}>
            <AdminLayout />
          </AuthGuard> }>
        </Route>

        <Route path='/401' element={<UnAuthorized/>}></Route>
      
      </Routes>
  </>
  )
}

export default App;
