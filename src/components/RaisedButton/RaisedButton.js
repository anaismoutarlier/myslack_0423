import React from "react";
import "./RaisedButton.css";

export default function RaisedButton({ className = "", ...props }) {
  return <button className={`raised-button ${className}`.trim()} {...props} />;
}
