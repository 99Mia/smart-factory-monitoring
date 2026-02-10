import { NavLink, useNavigate } from "react-router-dom";
import userUserStore from "../store/userUserStore";
import { Role } from "../models/Role";
import "../css/TopNavi.css";

function TopNavi() {
  const currentUser = userUserStore((state) => state.user);
  const navigate = useNavigate();

  const logout = () => {
    const clearCurrentUser = userUserStore.getState().clearCurrentUser;
    clearCurrentUser();
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <nav className="top-nav">
      <div className="nav-left">
        {currentUser?.role === Role.ADMIN && (
          <NavLink to="/admin" className="nav-item">
            관리자
          </NavLink>
        )}
        <NavLink to="/main" className="nav-item">
          메인페이지
        </NavLink>
      </div>

      <div className="nav-right">
        {!currentUser && (
          <>
            <NavLink to="/login" className="nav-item">
              로그인
            </NavLink>
            <NavLink to="/register" className="nav-item">
              가입하기
            </NavLink>
          </>
        )}

        {currentUser && (
          <>
            <NavLink to="/profile" className="nav-item">
              {currentUser.name}
            </NavLink>
            <button className="nav-item btn-logout" onClick={logout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default TopNavi;