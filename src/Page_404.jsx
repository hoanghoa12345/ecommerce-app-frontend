import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./context/user";

export default function Page_404() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Link to={user.roles === "admin" ? "/admin" : "/"}>
        <img src="https://cdn.dribbble.com/users/458522/screenshots/2835756/media/0685bb701e95a84fe4d71b5a8fd4a278.jpg" alt="not found" />
      </Link>

      {user.roles === "admin" ? (
        <button
          onClick={() => navigate("/admin")}
          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
        >
          Go back admin page
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
        >
          Go back home page
        </button>
      )}
    </div>
  );
}
