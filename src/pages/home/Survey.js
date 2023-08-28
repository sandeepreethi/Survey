import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import IMAGES from "./config/imagesConfig.js";
import sampleLoad from "./config/payload.json";
import "../../compnents/ui/pagination/react-paginate.css";
import StyledRadioButton from "../../compnents/ui/radioBtton/RadioButton";
import StyledDropDown from "../../compnents/ui/dropDown/DropDown";
import StyledLabel from "../../compnents/ui/label/StyledLabel";
import StyledTextBox from "../../compnents/ui/textBox/TextBox";


function Survey() {
  const companyValue = sessionStorage.getItem("CompanyValue");
  const [topping, setTopping] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [surveyItem, setsurveyItem] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [offset, setOffset] = useState(0);
  const [surveyData, setSurveyData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNoofPages, settotalNoofPages] = useState(0);
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const getData = () => {
    const pcount = [];
    const data = arrayQuestions[0].filter((item) => {
      pcount.push(item.PageNumber);
      settotalNoofPages([...new Set(pcount)].length);
      if (item.PageNumber == pageNumber) {
        return true;
      }
    });
    settotalNoofPages([...new Set(pcount)].length);
    const postData = data.map((item, index) => (
      <div className="row" key={index}>
        <div className="col">
          <StyledLabel props={{ Text: item.Text }} />
        </div>
        <div className="col">
          {(() => {
            switch (item.ControlType) {
              // case "Label":
              //   return "";
              case "TextBox":
                return (
                  <div>
                    <StyledTextBox />
                  </div>
                );
              case "DatePicker":
                return (
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={handleDateChange}
                  />
                );
              case "Label":
                return item.answers.map((optionItem, optionIndex) =>
                  (() => {
                    switch (optionItem.answerType) {
                      case "RadioButton":
                        return (
                          <div key={"Radio" + optionIndex}>
                            {optionIndex == 0 ? (
                              <StyledRadioButton
                                // props={{ value: optionItem.text }}
                                props={{ propsarray: item.answers }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      case "DropDown":
                        return (
                          <div key={"DropDown" + optionIndex}>
                            {optionIndex == 0 ? (
                              <StyledDropDown
                                props={{ propsarray: item.answers }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    ));

    setSurveyData(postData);
    // setPageCount(Math.ceil(data.length / perPage));
  };

  const onOptionChange = (e) => {
    //setTopping(e.target.value);
  };
  const Image = ({ source }) => (
    <img
      src={require(`./images/${source}`)}
      alt="logo"
      width={125}
      height={125}
    />
  );
  let abc = {};
  abc = { ...sampleLoad };
  const arr = [];
  Object.keys(sampleLoad).forEach((key) =>
    arr.push({ name: key, value: sampleLoad[key] })
  );

  const arrayQuestions = [];
  //known
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == "questions") {
      arrayQuestions.push(arr[i].value);
    }
  }
  const changeSurvey = (value) => {
    setsurveyItem(value);
    let res = {};
    const newres = {};

    res = { ...IMAGES };
    for (var i = 0; i < Object.keys(res).length; i++) {
      if (res[i].value == value) {
        setImageSrc(res[i].title);
        document.documentElement.style.setProperty(
          "--main-color",
          res[i].color
        );
        return;
      }
    }
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    setPageNumber(selectedPage + 1);
  };
  useEffect(
    () => {
      changeSurvey(companyValue);
      getData();
    },
    [offset],
    [pageNumber]
  );
  return (
    <div className="main">
      <div className="section">
        <div className="logoSection">
          {IMAGES.map((image) =>
            imageSrc == image.title ? (
              <Image source={image.src} key={image} />
            ) : (
              ""
            )
          )}
        </div>
        <div className="section-head">CUSTOMER SURVEY</div>
        <div className="container">
          <div className="section-body">
            {surveyData}
            <div className="d-flex flex-row-reverse bd-highlight">
              <ReactPaginate
                previousLabel={"Previos Page"}
                nextLabel={"Next Page"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalNoofPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
