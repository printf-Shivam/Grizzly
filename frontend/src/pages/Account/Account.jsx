import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import {
  loadUserInfo,
  selectIsUserAdmin,
  selectUserInfo,
} from "../../store/features/user";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  console.log("userInfo:", userInfo);
console.log("isUserAdmin:", isUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => dispatch(loadUserInfo(res)))
      .catch(() => {})
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const navStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-black text-white"
         : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
     }`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center mb-6">
        <div>
          <p className="text-xl font-semibold">
            Hello {userInfo?.firstName || "User"}
          </p>
          <p className="text-gray-500 text-sm">{userInfo?.email}</p>
        </div>

        {isUserAdmin && (
          <Link
            to="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Manage Admin
          </Link>
        )}
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-[240px_1fr] gap-6">

        {/* Sidebar */}
        <div className="bg-white shadow rounded-xl p-4 h-fit">
          <ul className="space-y-3">
            <li>
              <NavLink to="/account-details/profile" className={navStyle}>
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/account-details/orders" className={navStyle}>
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink to="/account-details/settings" className={navStyle}>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-xl p-6 min-h-[400px] overflow-hidden break-words">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Account;