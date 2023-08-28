import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";


function StyledLabel({props}) {
    return (
        <label className="text-left">{props.Text}</label>
    )
}
export default StyledLabel;
