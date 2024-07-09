import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Mengambil token dari session storage
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserData({
        name: decoded.user.name,
        email: decoded.user.email,
        phoneNumber: decoded.user.phone_number,
        address: decoded.user.address,
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold font-sans text-orange-500">Profile</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden my-10 w-[390px]">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{userData.name}</div>
          <ul className="text-gray-700 text-base">
            <li className="mb-2">
              <span className="font-semibold">Email: </span>
              {userData.email}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone: </span>
              {userData.phoneNumber}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Address: </span>
              {userData.address}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
