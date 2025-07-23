import React from "react";
import Hero from "../Component/Hero";
import AdminPannel from "../Component/AdminPannel";
import { useUser } from "../Context/AuthContext";

function Home() {
  const { isLogin } = useUser();
  return (
    <div>
      <Hero />
      {/* {islogin ? null : <AdminPannel />} */}
      {isLogin ? null : <AdminPannel />}
    </div>
  );
}

export default Home;
