import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function StyledButton({props}) {
    return (
        <div>
            <button>
                {props.text}
            </button>
        </div>
    )
}
export default StyledButton;
