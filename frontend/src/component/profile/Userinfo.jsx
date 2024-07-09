import React from "react";

const UserInfo = ({ name, email, phoneNumber, address }) => {
  return (
    <>
      <h1 className=" text-4xl font-bold font-sans text-orange-500">Profile</h1>
      <div className="  bg-white shadow-lg rounded-lg overflow-hidden my-10 w-[390px]">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <ul className="text-gray-700 text-base">
            <li className="mb-2">
              <span className="font-semibold">Email: </span>
              {email}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone: </span>
              {phoneNumber}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Address: </span>
              {address}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
