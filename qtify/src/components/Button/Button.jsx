import React from "react";
import Styles from "./Button.module.css"; // Assuming you have a CSS file for styling the button
export function Button({ children, onClick }) {
  return (
    <button className={Styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;