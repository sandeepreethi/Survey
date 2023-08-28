import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Company() {
  const [surveyItem, setsurveyItem] = useState([]);
  const navigate = useNavigate();
  const changeSurvey = (event) => {
    window.sessionStorage.setItem("CompanyValue", event.target.value);
    navigate("/Survey");
  };
  return (
    <div className="main">
      <div className="company">
        <h4 class="mb-3"> Choose your Company to Provide a Survey</h4>
        <div className="dropdown">
          <select
            value={surveyItem}
            onChange={changeSurvey}
            className="form-select"
          >
            <option selected value="">
              Choose your car
            </option>
            <option value="1">BMW</option>
            <option value="2">Audi</option>
            <option value="3">Benz</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Company;
