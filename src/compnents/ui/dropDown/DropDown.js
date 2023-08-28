import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function StyledDropDown({ props }) {
  return (
    <div>
      <div>
        <select className="form-control"
          id="DropDown1"
          defaultValue={'DEFAULT'}
          
          //   onChange={changeSurvey}
          //   className="form-select"
        >
          <option value="DEFAULT" disabled >
            Choose Option
          </option>
          {props.propsarray.map((item, index) => (
          <option key={item.id} value={item.id}>{item.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default StyledDropDown;
