import React, { useState } from "react";
import "./Card.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { BsExclamation } from "react-icons/bs";
import { Col, Row } from "react-bootstrap";

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
  const [AdditionalInfo, setAdditionalInfo] = useState(false);
  return (
    <div
      className={`py-2  px-3 d-flex flex-row justify-content-start align-items-start hr-card-container `}
    >
      <div className="card-img-options d-flex flex-column gap-2">
        <img className="hr-card-img" src={img} alt="client" />
        <div className="image-options-container">
          <MdModeEditOutline className="img-options" />
          <MdPauseCircleOutline className="img-options" />
          <MdDeleteForever onClick={handleDelete} className="img-options" />
        </div>
      </div>
      <div className="card-info ">
        <h5 className="text-dark text-truncate">{name}</h5>
        <h6>{role}</h6>
        <h7 className="text-secondary">{department}</h7>
        <div className={`attendance-statue ${attendance}`}>
          {attendance && attendance[0].toUpperCase() + attendance.substring(1)}
        </div>
        <div className="position-absolute bottom-0 end-0 p-2 d-flex flex-row justify-content-center align-items-center gap-1">
          <div className="card-icon-container d-flex justify-content-center align-items-center">
            <MdEmail className="card-icon" />
          </div>
          <div className="card-icon-container d-flex justify-content-center align-items-center">
            <ImPhoneHangUp className="card-icon" />
          </div>
          <div
            className="card-icon-container d-flex justify-content-center align-items-center"
            onMouseEnter={() => setAdditionalInfo(true)}
            onMouseLeave={() => setAdditionalInfo(false)}
          >
            <BsExclamation className="card-icon" />
          </div>
        </div>
      </div>
      {AdditionalInfo && (
        <div className="d-flex flex-row justify-content-center align-items-center p-2 additional-info">
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
      )}
    </div>
  );
};

export default Card;
