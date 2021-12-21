import React, { useContext, useEffect, useState } from "react";
import Input from "../Input/Input";
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
    console.log("submitted");
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
    <Container className='w-75 form-con'>
      <Form onSubmit={onSubmit} id='form' validated={validated}>
        <h3 className='text-primary'>New Emplowee</h3>
        <Row>
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
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                value={form.name}
                name='name'
                type='text'
                placeholder='Your Name'
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Telephone number</Form.Label>
              <Form.Control
                type='tel'
                onChange={handleFormChange}
                value={form.phone}
                name='phone'
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className='mb-3' controlId='sDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type='date'
                onChange={handleFormChange}
                value={form.sDate}
                name='sDate'
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                onChange={handleFormChange}
                value={form.email}
                name='email'
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h3 className='text-primary mt-4'>Office Info</h3>
        <Form.Group required className='mb-3' controlId='office'>
          <Form.Label>Office</Form.Label>
          <Form.Select
            aria-label='Default select example'
            onChange={handleFormChange}
            value={form.office}
            name='office'
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
            <Form.Group className='mb-3' controlId='department'>
              <Form.Label>Department</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.department}
                name='department'
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
            <Form.Group className='mb-3' controlId='attendance'>
              <Form.Label>Attendance profile</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.attendance}
                name='attendance'
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
          <Form.Group className='mb-3' controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.role}
                name='role'
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
            <Form.Group className='mb-3' controlId='position'>
              <Form.Label>Positiion</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.position}
                name='position'
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
            <Form.Group className='mb-3' controlId='dManager'>
              <Form.Label>Direct Manager</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={handleFormChange}
                value={form.dManager}
                name='dManager'
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
        <Row>
          <h5 className='text-primary'>work from home</h5>
          <Form.Group className='mb-3' id='workFromHome'>
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
        <div className='d-flex flex-column flex-md-row justify-content-end'>
          <Button className='m-2' type='submit'>
            Submit
          </Button>
          <Button
            bg='danger'
            size='lg'
            className='m-2 bg-danger'
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormModal;
