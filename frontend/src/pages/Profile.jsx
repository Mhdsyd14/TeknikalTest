import React from "react";
import Barside from "../component/Barside";
import UserInfo from "../component/profile/Userinfo";

const Profile = () => {
  return (
    <>
      <div className="flex-1 p-8">
        <UserInfo
          name="Irsyad"
          email="irsyad@gmail.com"
          phoneNumber="1234567890"
          address="Mampang Prapatan"
        />
      </div>
    </>
  );
};

export default Profile;
