import { Hourglass } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
// Spinner component to indicate loading state
function Spinner() {
  return (
    <div className="spinner-container">
      <Hourglass
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="hourglass-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
export default Spinner;
