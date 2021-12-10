import React, { useContext, useEffect, useState } from "react";
import Input from "../Input/Input";
import "./FormModal.css";
import { clientsContext } from "../store/ContextProvider";

const FormModal = ({ setModalOpen }) => {
  //=================================================
  const [form, setForm] = useState({
    fName: "",
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

  const onSubmit = (e) => {
    e.preventDefault();
    const employee = {
      id: new Date().getMilliseconds(),
      fName: form.fName,
      email: form.email,
      image: "/images/test.jpg",
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
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='modal-container'>
      <form onSubmit={onSubmit}>
        <h1>New Employee</h1>
        <hr />
        <h2>Personal Info</h2>
        <div className='firstCell'>
          <div className='upload-img'>
            <label for='file'>DRAG IMAGE HERE</label>
            <input type='file' id='file' Value='' name='' />
          </div>
          <div className='input-cells'>
            <Input
              required={true}
              type='text'
              label='first name'
              value={form.fName}
              onChange={handleFormChange}
              name='fName'
              id='fName'
            />
            <Input
              required={true}
              type='tel'
              label='Phone'
              value={form.phone}
              onChange={handleFormChange}
              name='phone'
              id='phone'
            />
          </div>
          <div className='input-cells'>
            <Input
              required={true}
              type='date'
              label='Start Date'
              value={form.sDate}
              onChange={handleFormChange}
              placeHolder='20/03/2020'
              name='sDate'
              id='sDate'
            />
            <Input
              required={true}
              type='email'
              label='Email'
              value={form.email}
              placeHolder='Email'
              onChange={handleFormChange}
              name='email'
              id='email'
            />
          </div>
        </div>
        <div className='second-cell'>
          <h2>Office Info</h2>
          <div className='second-cell-container'>
            <Input
              required={false}
              type='text'
              label='Office'
              value={form.office}
              onChange={handleFormChange}
              name='office'
              id='office'
            />
            <div className='two-cells-container'>
              <div className='select-container'>
                <label for='office' className='select-label'>
                  Department
                </label>
                <select
                  value={form.department}
                  name='department'
                  onChange={handleFormChange}
                  id='department'
                >
                  <option value='dep1'>department 1</option>
                  <option value='dep2'>department 2</option>
                </select>
              </div>
              <div className='select-container'>
                <label for='attendance' className='select-label'>
                  Attendance Profile
                </label>
                <select
                  value={form.attendance}
                  name='attendance'
                  onChange={handleFormChange}
                  id='attendance'
                  placeholder='Select'
                >
                  <option value='present'>Present</option>
                  <option value='weekend'>Weekend</option>
                  <option value='absent'>Absent</option>{" "}
                  <option value='holdiay'>Holiday</option>{" "}
                  <option value='onleave'>On leave</option>{" "}
                </select>
              </div>
            </div>
            <div className='two-cells-container'>
              <Input
                required={false}
                type='text'
                label='Role'
                value={form.role}
                onChange={handleFormChange}
                name='role'
                id='role'
              />
              <Input
                required={false}
                type='text'
                label='Position'
                value={form.position}
                onChange={handleFormChange}
                name='position'
                id='position'
              />
            </div>
            <div className='select-container'>
              <label for='dManager' className='select-label'>
                Direct Manager
              </label>
              <select
                value={form.dManager}
                name='dManager'
                onChange={handleFormChange}
                id='dManager'
                placeholder='Select Option'
              >
                <option value='manager1'>Manager 1</option>
                <option value='manager2'>Manager 2</option>
                <option value='manager3'>manager 3</option>
                <option value='manager4'>manager 4</option>
              </select>
            </div>
          </div>
        </div>
        <h2>Work form home</h2>
        <div className='checkbox-container'>
          <input
            type='checkbox'
            id='workFromHome'
            onChange={() =>
              setForm((prev) => ({ ...prev, workFromHome: !form.workFromHome }))
            }
            name='workFromHome'
            checked={form.workFromHome}
          />
          <label className='checkbox-label' for='workFromHome'>
            Allow Emplowee to work from home
          </label>
        </div>
        <div className='form-btns-container'>
          <button className='form-btn submit' type='submit'>
            Submit
          </button>
          <button
            className='form-btn cancel'
            onClick={() => setModalOpen(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
