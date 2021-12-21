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
  //====================================================
  const { clientsData, setClientsData } = useContext(clientsContext);

  const checkValidity = () => {
    const { name, sDate, role, phone } = form;
    const newErrors = {};
    // name errors
    if (!name || name === "") newErrors.name = "cannot be blank!";
    if (!sDate || sDate === "") newErrors.sDate = "cannot be blank!";
    if (!phone || phone === "") newErrors.sDate = "cannot be blank!";
    if (!role || role === "") newErrors.role = "cannot be blank!";
    else if (name.length > 30) newErrors.name = "name is too long!";
    // food errors

    return newErrors;
  };

  const onSubmit = (e) => {
    const newErrors = checkValidity();
    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    const employee = {
      id: new Date().getMilliseconds(),
      name: form.name,
      email: form.email,
      image: selectedImage
        ? URL.createObjectURL(selectedImage)
        : "/images/test.jpg",
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
    console.log(employee);
    setClientsData((clientsData) => [...clientsData, employee]);
    setModalOpen(false);
  };
  //===========================================

  //===========================================
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  //============================
  const [selectedImage, setSelectedImage] = useState(null);
  const [validated, setValidated] = useState(false);

  return (
    <div className="modal-form-container d-flex justify-content-center align-items-center">
    <Container className='form-con p-2'>
      <Form onSubmit={onSubmit} id='form' validated={validated}>
        <h3 className='form-header'>New Emplowee</h3>
        <hr className="main-hr"/>
        <h4>Personal info</h4>
        <hr className="sub-hr"/>
        <Row className="mb-2">
          <Col xs={12} md={4}>
            <div className='bs-img-upload'>
              <input
                type='file'
                id='file'
                Value=''
                className='input-file'
                name='myImage'
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
              {selectedImage && (
                <div>
                  <img
                    alt='not fount'
                    className='uploaded-img'
                    src={URL.createObjectURL(selectedImage)}
                  />
                  {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
                </div>
              )}
              <label for='file' className='input-file-label'>
                Drag file here
              </label>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className='mb-2 form-text-input' controlId='name'>
              <Form.Label className="form-text-input">Name</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                value={form.name}
                name='name'
                type='text'
                placeholder='Your Name'
                className="form-text-input"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-2 form-text-input' controlId='phone'>
              <Form.Label className="form-text-input">Telephone number</Form.Label>
              <Form.Control
                type='tel'
                onChange={handleFormChange}
                value={form.phone}
                name='phone'
                required
                className="form-text-input"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className='mb-2 form-text-input' controlId='sDate'>
              <Form.Label className="form-text-input">Start Date</Form.Label>
              <Form.Control
                type='date'
                onChange={handleFormChange}
                value={form.sDate}
                name='sDate'
                required
                className="form-text-input"
              />
            </Form.Group>
            <Form.Group className='mb-2 form-text-input' controlId='email'>
              <Form.Label className="form-text-input">Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                onChange={handleFormChange}
                value={form.email}
                name='email'
                className="form-text-input"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h4>Office info</h4>
        <hr className="sub-hr"/>
        <Form.Group required className='mb-2' controlId='office'>
          <Form.Label className="form-text-input">Office</Form.Label>
          <Form.Select
            aria-label='Default select example'
            onChange={handleFormChange}
            value={form.office}
            name='office'
            className="form-text-input"
            required
          >
            <option>Select</option>
            <option value='office1'>Office 1</option>
            <option value='office2'>Office 2</option>
            <option value='office3'>Office 3</option>
          </Form.Select>
        </Form.Group>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className='mb-2' controlId='department'>
              <Form.Label className="form-text-input">Department</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.department}
                name='department'
                className="form-text-input"
                required
              >
                <option value="">Select</option>
                <option value='dep1'>Department 1</option>
                <option value='dep2'>Department 2</option>
                <option value='dep2'>Department 3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className='mb-2' controlId='attendance'>
              <Form.Label className="form-text-input">Attendance profile</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.attendance}
                name='attendance'
                className="form-text-input"
                required
              >
                <option value="">Select</option>
                <option value='present'>Present</option>
                <option value='weekend'>Weekend</option>
                <option value='absent'>Absent</option>
                <option value='holdiay'>Holiday</option>
                <option value=' '>On leave</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
          <Form.Group className='mb-2' controlId='role'>
              <Form.Label className="form-text-input">Role</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.role}
                name='role'
                className="form-text-input"
                required
              >
                <option value="">Select</option>
                <option value='HR Manager'>HR Manager</option>
                <option value='Frontend Developer'>Frontend Developer</option>
                <option value='Backend Developer'>Backend Developer</option>
                <option value='Dev Ops'>Dev Ops</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className='mb-2' controlId='position'>
              <Form.Label className="form-text-input">Positiion</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.position}
                name='position'
                className="form-text-input"
                required
              >
                <option>Select</option>
                <option value='position 1'>Position 1</option>
                <option value='position 2'>Position 2</option>
                <option value='position 3'>Position 3</option>
                <option value='position 4'>Position 4</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className='mb-2' controlId='dManager'>
              <Form.Label className="form-text-input">Direct Manager</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.dManager}
                name='dManager'
                className="form-text-input"
              >
                <option>Select</option>
                <option value='manager1'>Manager 1</option>
                <option value='manager2'>Manager 2</option>
                <option value='manager3'>Manager 3</option>
                <option value='manager4'>Manager 4</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
          <h4 >work from home</h4>
          <hr className="sub-hr"/>
        <Row className="mt-4">
          <Form.Group  id='workFromHome'>
            <Form.Check
              type='checkbox'
              label='Allow emplowee to work from home'
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  workFromHome: !form.workFromHome,
                }))
              }
              checked={form.workFromHome}
              name='attendance'
            />
          </Form.Group>
        </Row>
        <div className='d-flex flex-column flex-md-row justify-content-end gap-2'>
          <Button className='form-btn ' type='submit'>
            Submit
          </Button>
          <Button
            bg='danger'
            size='lg'
            className='form-btn  bg-danger'
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
