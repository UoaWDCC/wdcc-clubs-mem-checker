import styles from "../style.module.css";
import { useState } from "react";
import Counter from "../../components/example/Counter";
import { useNavigate } from "react-router";

export const IndexPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/example");
  };
  return (
    <div style={{ minWidth: "100vw", height: "100vh" }}>
      <button onClick={() => navigate("/create-page")}>
        Create Membership Checker Page
      </button>
      <div>
        <title>Index</title>
        <p>Hello, World! you are on the index page</p>
        <Counter />
        <button onClick={handleButtonClick}>Go to example page</button>
      </div>
    </div>
  );
};
