import React from "react";

const Alert = ({ alert }) => {
  return (
    <div className="alert-container">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
    </div>
  );
};

export default Alert;
