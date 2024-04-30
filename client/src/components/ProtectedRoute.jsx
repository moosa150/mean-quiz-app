import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <span className="material-symbols-outlined">home</span>,
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/user/reports"],
      icon: <span class="material-symbols-outlined">monitoring</span>,
      onClick: () => navigate("/user/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <span class="material-symbols-outlined">person</span>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      path: ["logout"],
      icon: <span class="material-symbols-outlined">logout</span>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const adminMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <span className="material-symbols-outlined">home</span>,
      onClick: () => navigate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams"],
      icon: <span class="material-symbols-outlined">description</span>,
      onClick: () => navigate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      icon: <span class="material-symbols-outlined">monitoring</span>,
      onClick: () => navigate("/admin/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <span class="material-symbols-outlined">person</span>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      path: ["logout"],
      icon: <span class="material-symbols-outlined">logout</span>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(showLoading());
        const response = await getUserInfo();
        dispatch(hideLoading());
        if (response.success) {
          //   message.success(response.message);
          dispatch(setUser(response.data));
          if (response.data.isAdmin) {
            setMenu(adminMenu);
          } else {
            setMenu(userMenu);
          }
        } else {
          message.error(response.error);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    if (localStorage.getItem("token")) getUserData();
    else navigate("/login");
  }, []);
  //   const activeRoute = window.location.pathname;
  return (
    <div>
      <div className="layout">
        <div className="flex gap-2 w-100 h-full h-100">
          <div className="sidebar">
            <div className="menu">
              {menu.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={item.onClick}
                    className={`menu-item `}
                  >
                    {item.icon}
                    {!collapsed && (
                      <span className="text-white">{item.title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="body">
            <div className="header flex justify-between">
              {!collapsed && (
                <span
                  className="material-symbols-outlined"
                  onClick={() => setCollapsed(true)}
                >
                  close
                </span>
              )}
              {collapsed && (
                <span
                  class="material-symbols-outlined"
                  onClick={() => setCollapsed(false)}
                >
                  menu
                </span>
              )}
              <h1 className="text text-white 2xl">MERN Quiz</h1>
              <h1 className="text text-white xl">{user?.name}</h1>
            </div>
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
