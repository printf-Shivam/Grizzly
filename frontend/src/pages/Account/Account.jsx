import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { loadUserInfo, selectUserInfo } from "../../store/features/user";

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-white w-full ${
    isActive ? "bg-black" : "bg-gray-400 hover:bg-black"
  }`;

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(setLoading(true));

    fetchUserDetails()
      .then((res) => dispatch(loadUserInfo(res)))
      .catch((err) => console.error("API ERROR:", err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  if (!userInfo?.email) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <p className="text-2xl font-semibold">Hello {userInfo.firstName}</p>
        <p className="text-gray-500">Welcome to your account</p>
      </div>

      <div className="md:flex gap-6">
        {/* Sidebar */}
        <div className="md:w-64 bg-white shadow-md rounded-xl p-4">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li>
              <NavLink
                to="/account-details/profile"
                className={navLinkClasses}
              >
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/account-details/orders"
                className={navLinkClasses}
              >
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/account-details/settings"
                className={navLinkClasses}
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;