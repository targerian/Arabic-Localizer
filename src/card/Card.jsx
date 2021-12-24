import React, { useState } from "react";
import "./Card.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { BsExclamation } from "react-icons/bs";
import { Col, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";

const Card = ({
  name,
  img,
  role,
  attendance,
  department,
  handleDelete,
  office,
  sDate,
  dManager,
}) => {
  const [AdditionalInfo, setAdditionalInfo] = useState(true);

  //=================================================================================================
  const popover = (
    <Popover id="popover-basic" className="additional-info">
      <div className="d-flex flex-row justify-content-center align-items-center p-2 ">
        <Row>
          <Col className="d-flex flex-column align-items-start">
            <span className="add-info-title">Office</span>
            <span className="mb-2 add-info-description">{office}</span>
            <span className="add-info-title">Joining Date</span>
            <span className="mb-2 add-info-description">{sDate}</span>
          </Col>
          <Col className="d-flex flex-column align-items-start">
            <span className="add-info-title">Role</span>
            <span className="mb-2 add-info-description">{role}</span>
            <span className="add-info-title">Manager</span>
            <span className="mb-2 add-info-description">{dManager}</span>
          </Col>
          <Col className="d-flex flex-column align-items-start">
            <span className="add-info-title">Copied Manager</span>
            <span className="mb-2 add-info-description">{dManager}</span>
          </Col>
        </Row>
      </div>
    </Popover>
  );

  return (
    <div
      className={` px-2 px-md-3 d-flex flex-row justify-content-start align-items-start hr-card-container `}
    >
      <div className="card-img-options d-flex flex-column justify-content-center align-items-center gap-3 gap-md-2">
        <img className="hr-card-img" src={img} alt="client" />
        <div className="image-options-container">
          <MdModeEditOutline className="img-options" />
          <MdPauseCircleOutline className="img-options" />
          <MdDeleteForever onClick={handleDelete} className="img-options" />
        </div>
      </div>
      <div className="card-info ms-2 ">
        <h5 className="text-dark text-truncate">
          {name && name[0].toUpperCase() + name.substring(1)}
        </h5>
        <h6>{role}</h6>
        <h7 className="text-secondary">{department}</h7>
        <div className={`attendance-statue ${attendance}`}>
          {attendance && attendance[0].toUpperCase() + attendance.substring(1)}
        </div>
        <div className="position-absolute bottom-0 end-0 pb-2 pe-1 pe-sm-3 d-flex flex-row justify-content-center align-items-center gap-1">
          <div className="card-icon-container d-flex justify-content-center align-items-center">
            <MdEmail className="card-icon" />
          </div>
          <div className="card-icon-container d-flex justify-content-center align-items-center">
            <ImPhoneHangUp className="card-icon" />
          </div>
          <OverlayTrigger key="bottom" placement="bottom" overlay={popover}>
            <div
              className="card-icon-container d-flex justify-content-center align-items-center"
              // onMouseEnter={() => setAdditionalInfo(true)}
              // onMouseLeave={() => setAdditionalInfo(false)}
            >
              <BsExclamation className="card-icon" />
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default Card;
