import React from "react";
import "@/assets/styles/components/button.css";

export const ButtonProperty1Default = ({ text, className = "", type = "button", ...props }) => (
    <button type={type} className={`button-property1-default ${className}`.trim()} {...props}>
        {text}
    </button>
);

export default ButtonProperty1Default;




