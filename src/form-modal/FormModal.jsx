import React, { useContext, useState } from "react";
import "./FormModal.css";
import { clientsContext } from "../store/ContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GiTrumpet } from "react-icons/gi";

const FormModal = ({ setModalOpen }) => {
  //=================================================
  const [form, setForm] = useState({
    name: "",
    email: "",
    sDate: "",
    phone: "",
    office: "",
    department: "",
    attendance: "",
    role: "",
    position: "",
    dManager: "",
    workFromHome: false,
  });
  const [errors, setErrors] = useState({});
  //====================================================
  const { clientsData, setClientsData } = useContext(clientsContext);

  //=========================================================

  // checking validity schema

  const checkValidity = () => {
    const { name, sDate, role, phone, email, department, attendance, office } =
      form;
    const newErrors = {};
    // name errors
    console.log("checking validity");
    if (!name || name === "") newErrors.name = "Please enter a valid name!";
    if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Email must contain @ sign !";
    if (!email || email === "")
      newErrors.email = "Please enter a valid email address !";
    if (!sDate || sDate === "")
      newErrors.sDate = "Please enter a valid start date";
    if (!/^\d+$/.test(phone))
      newErrors.phone = "Please enter numbers only in phone number!";
    if (!phone || phone === "")
      newErrors.phone = "Please enter a valid phone number";

    if (!role || role === "") newErrors.role = "Please select a role!";
    if (!office || office === "") newErrors.office = "Please select an office!";
    if (!department || department === "")
      newErrors.department = "Please select a department!";
    if (!attendance || attendance === "")
      newErrors.attendance = "Please provide your attendance status!";
    else if (name.length > 30) newErrors.name = "Name is too long!";
    return newErrors;
  };

  //==========================================================================

  const onSubmit = (e) => {
    const newErrors = checkValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.preventDefault();
    const employee = {
      id: new Date().getMilliseconds(),
      name: form.name,
      email: form.email,
      image: selectedImage
        ? URL.createObjectURL(selectedImage)
        : "/images/user.jpg",
      sDate: form.sDate,
      phone: form.phone,
      office: form.office,
      department: form.department,
      attendance: form.attendance,
      role: form.role,
      position: form.position,
      dManager: form.dManager,
      workFromHome: form.workFromHome,
    };
    setClientsData((clientsData) => [...clientsData, employee]);
    setModalOpen(false);
  };

  //===========================================
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  //===========================================

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="modal-form-container d-flex justify-content-center align-items-start align-items-md-start">
      <Container className="form-con pt-2 pb-4 pb-md-3 px-4">
        <Form onSubmit={onSubmit} id="form" noValidate>
          <h3 className="form-header">NEW EMPLOYEE</h3>
          <hr className="main-hr" />
          <h4>Personal info</h4>
          <hr className="sub-hr" />
          <Row className="mb-2">
            <Col xs={12} md={4}>
              <div className="bs-img-upload">
                <input
                  type="file"
                  id="file"
                  Value=""
                  className="input-file"
                  name="myImage"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                {selectedImage && (
                  <div>
                    <img
                      alt="not fount"
                      className="uploaded-img"
                      src={URL.createObjectURL(selectedImage)}
                    />
                    {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
                  </div>
                )}
                <label for="file" className="input-file-label">
                  DRAG IMAGE HERE
                </label>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleFormChange}
                  value={form.name}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="form-text-input"
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 mb-md-0" controlId="phone">
                <Form.Label>Telephone number</Form.Label>
                <Form.Control
                  type="tel"
                  onChange={handleFormChange}
                  value={form.phone}
                  name="phone"
                  isInvalid={!!errors.phone}
                  required
                  className="form-text-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3 " controlId="sDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleFormChange}
                  value={form.sDate}
                  name="sDate"
                  isInvalid={!!errors.sDate}
                  required
                  className="form-text-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 mb-md-0" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleFormChange}
                  value={form.email}
                  name="email"
                  className="form-text-input"
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback className="feedback" type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <h4>Office info</h4>
          <hr className="sub-hr" />
          <Form.Group required className="mb-3 relative-row" controlId="office">
            <Form.Label>Office</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleFormChange}
              value={form.office}
              name="office"
              className="form-text-input"
              isInvalid={!!errors.office}
              required
            >
              <option>Select</option>
              <option value="office1">Office 1</option>
              <option value="office2">Office 2</option>
              <option value="office3">Office 3</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.office}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col xs={12} md={6} className="relative-row">
              <Form.Group className="mb-3" controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleFormChange}
                  value={form.department}
                  name="department"
                  className="form-text-input"
                  isInvalid={!!errors.department}
                  required
                >
                  <option value="">Select</option>
                  <option value="dep1">Department 1</option>
                  <option value="dep2">Department 2</option>
                  <option value="dep2">Department 3</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.department}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="relative-row">
              <Form.Group className="mb-3" controlId="attendance">
                <Form.Label>Attendance profile</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleFormChange}
                  value={form.attendance}
                  name="attendance"
                  className="form-text-input"
                  isInvalid={!!errors.attendance}
                  required
                >
                  <option value="">Select</option>
                  <option value="present">Present</option>
                  <option value="weekend">Weekend</option>
                  <option value="absent">Absent</option>
                  <option value="holdiay">Holiday</option>
                  <option value=" ">On leave</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.attendance}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className="relative-row">
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleFormChange}
                  value={form.role}
                  name="role"
                  className="form-text-input"
                  isInvalid={!!errors.role}
                  required
                >
                  <option value="">Select</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Dev Ops">Dev Ops</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="relative-row">
              <Form.Group className="mb-3" controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleFormChange}
                  value={form.position}
                  name="position"
                  className="form-text-input"
                  isInvalid={!!errors.position}
                  required
                >
                  <option>Select</option>
                  <option value="position 1">Position 1</option>
                  <option value="position 2">Position 2</option>
                  <option value="position 3">Position 3</option>
                  <option value="position 4">Position 4</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.position}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="relative-row">
              <Form.Group className="mb-3" controlId="dManager">
                <Form.Label>Direct Manager</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleFormChange}
                  value={form.dManager}
                  name="dManager"
                  className="form-text-input"
                  // isInvalid={ !!errors.dManager }
                >
                  <option>Select option</option>
                  <option value="manager1">Manager 1</option>
                  <option value="manager2">Manager 2</option>
                  <option value="manager3">Manager 3</option>
                  <option value="manager4">Manager 4</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.dManager}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <h4>work from home</h4>
          <hr className="sub-hr" />
          <Row className="mt-4">
            <Form.Group id="workFromHome">
              <Form.Check
                type="checkbox"
                label="Allow Employee To Work From Home"
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    workFromHome: !form.workFromHome,
                  }))
                }
                checked={form.workFromHome}
                name="attendance"
              />
            </Form.Group>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row justify-content-end gap-2">
            <Button className="form-btn " type="submit">
              Submit
            </Button>
            <Button
              bg="danger"
              size="lg"
              className="form-btn  bg-danger"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default FormModal;
