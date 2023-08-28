import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function StyledRadioButton({ props }) {
  return (
    <form>
      <div className="row">
        {props.propsarray.map((item, index) => (
          <div key={item.id} className="col-md-4">
            <input type="radio" name="topping" value={item.id} id={item.id} />
            <label htmlFor={item.id}>{item.text}</label>
          </div>
        ))}
      </div>
    </form>
  );
}
export default StyledRadioButton;
