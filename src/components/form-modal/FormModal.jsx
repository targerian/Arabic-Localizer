import React, { useContext, useState, useEffect } from "react";
import "./FormModal.css";
import { clientsContext } from "../../store/ContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GiTrumpet } from "react-icons/gi";
import useFetchFormData from "../../api/apiHooks/useFetchFormData";
import MultiSelectSort from "../multiSelect/MultiSelect.jsx";
import useAddUser from "../../api/apiHooks/useAddUser";
import { GET_USER_INFO } from "../../api/quereis";
import { useQuery } from "@apollo/client";
import { extendSchemaImpl } from "graphql/utilities/extendSchema";
import useUpdateUser from "../../api/apiHooks/useUpdateUser";

const FormModal = ({
  setModalOpen,
  fetchSearch,
  index,
  newForm,
  setnewForm,
}) => {
  const { error, res, loading } = useFetchFormData();
  const offices = res?.company_offices?.data;
  const departments = res?.departments?.data;
  const attendance = res?.attendance_profiles?.data;
  const positions = res?.positions.data;
  const managers = res?.managers;

  //==========================================================================================================

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
    copiedManager: "",
    workFromHome: false,
  });
  //initial rendering for edit================================================================================

  const editedData = useQuery(GET_USER_INFO, {
    variables: {
      id: index,
    },
    onCompleted: (data) => {
      console.log(data);
      const {
        name,
        starts_at,
        phone,
        email,
        office,
        position,
        attendance_profile,
        department,
        manager,
        copied_managers,
        can_work_home,
      } = data.user;
      const emplowee = {
        id: index,
        name: name,
        sDate: starts_at,
        email: email,
        phone: phone,
        office: office.id,
        department: department.id,
        attendance: attendance_profile.id,
        role: "Frontend Developer",
        position: position.id,
        dManager: manager.id,
        copiedManager: copied_managers.map((el) => ({
          label: el.name,
          value: el.id,
        })),
        workFromHome: Boolean(can_work_home),
      };
      setForm(emplowee);
    },
    skip: index == 0 || newForm,
  });

  //==========================================================================================================

  const [selectedImage, setSelectedImage] = useState(null);
  const { clientsData, setClientsData } = useContext(clientsContext);

  //==========================================================================================================

  // checking validity schema
  const [errors, setErrors] = useState({});

  const checkValidity = () => {
    const { name, sDate, role, phone, email, department, attendance, office } =
      form;
    const newErrors = {};
    // name errors
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
    else if (name.length > 40) newErrors.name = "Name is too long!";
    return newErrors;
  };
  // onSubmit, handeling both adding and updating==============================================================================================

  const [addUser, { addUserData, addUserLoading, addUserError }] = useAddUser();

  const [updateUser, { updateUserData, updateUserLoading, updateUserError }] =
    useUpdateUser();

  const onSubmit = async (e) => {
    const newErrors = checkValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.preventDefault();
    if (newForm) {
      await addUser({
        variables: {
          id: null,
          name: form.name,
          phone: form.phone,
          email: form.email,
          start_at: form.sDate,
          department_id: form.department,
          manager_id: form.dManager,
          company_id: 1,
          office_id: form.office,
          position_id: form.position,
          att_profile_id: form.attendance,
          copied_managers: form.copiedManager.map((el) => el.value),
          user_image: null,
        },
        onCompleted: () => alert("User added sucessfully"),
      });
    } else {
      await updateUser({
        variables: {
          id: index,
          name: form.name,
          phone: form.phone,
          email: form.email,
          start_at: form.sDate,
          department_id: form.department,
          manager_id: form.dManager,
          company_id: 1,
          office_id: form.office,
          position_id: form.position,
          att_profile_id: form.attendance,
          copied_managers: form.copiedManager.map((el) => el.value),
          user_image: null,
        },
        onCompleted: () => alert("User Updated sucessfully"),
      });
    }
    fetchSearch();
    // setClientsData((clientsData) => [...clientsData, employee]);
    setnewForm(false);
    setModalOpen(false);
  };

  // handle form change=========================================================================================
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  //remove manager from copied managers list and vice versa=====================================================
  const [filteredManagers, setFilteredManagers] = useState(managers);
  const [filteredCopiedManagers, setFilteredCopiedManagers] =
    useState(managers);
  const [filteredCopiedManagersReselect, setFilteredCopiedManagersReselect] =
    useState(managers);

  useEffect(() => {
    const managersForReselect = managers?.map((manager) => ({
      value: manager.id,
      label: manager.name,
    }));
    setFilteredCopiedManagersReselect(managersForReselect);
    setFilteredManagers(managers);
  }, [managers]);

  useEffect(() => {
    if (form.copiedManager && form.dManager) {
      const selectIds = form.copiedManager.map((el) => el.value);
      const filtered = managers.filter(
        (manager) => !selectIds.includes(manager.id)
      );
      setFilteredManagers(filtered);
    }
    if (form.dManager) {
      const filtered = managers.filter(
        (manager) => manager.id !== form.dManager
      );

      setFilteredCopiedManagersReselect(
        filtered.map((manager) => ({
          value: manager.id,
          label: manager.name,
        }))
      );
    } else if (form.copiedManager) {
      const selectIds = form.copiedManager.map((el) => el.value);
      const filtered = managers.filter(
        (manager) => !selectIds.includes(manager.id)
      );

      setFilteredManagers(filtered);
    } else {
      return filteredManagers;
    }
  }, [form.dManager, form.copiedManager, managers]);

  //==============================================================================================================

  return (
    <div className="modal-form-container d-flex justify-content-center align-items-start align-items-md-start">
      {loading || addUserLoading || editedData.loading || updateUserLoading ? (
        <h1>loading</h1>
      ) : (
        <Container className="form-con pt-3 pb-4 pb-md-3 ps-4 pe-4 pe-lg-5">
          <Form onSubmit={onSubmit} id="form" noValidate>
            <h3 className="form-header">NEW EMPLOYEE</h3>
            <hr className="main-hr" />
            <h4>Personal info</h4>
            <hr className="sub-hr" />
            <Row className="mb-3">
              <Col xs={12} md={3} className="mb-2 mb-md-0">
                <div className="bs-img-upload ">
                  <input
                    type="file"
                    id="file"
                    className="input-file"
                    name="myImage"
                    onChange={(event) => {
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
              <Col xs={12} md="auto" className="flex-fill">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={handleFormChange}
                    value={form.name}
                    name="name"
                    type="text"
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
                  <Form.Label>Phone</Form.Label>
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
              <Col xs={12} md="auto" className="flex-fill">
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
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
            <h4>Office Info</h4>
            <hr className="sub-hr" />
            <Form.Group
              required
              className="mb-3 relative-row"
              controlId="office"
            >
              <Form.Label>Office</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleFormChange}
                value={form.office}
                name="office"
                className="form-text-input form-select-extrapadding "
                isInvalid={!!errors.office}
                required
              >
                <option>
                  {editedData ? editedData?.user?.office?.name : "Name"}
                </option>
                {offices?.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                ))}
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
                    className="form-text-input form-select-extrapadding"
                    isInvalid={!!errors.department}
                    required
                  >
                    <option value="">
                      {editedData
                        ? editedData?.user?.department?.name
                        : "Select"}
                    </option>
                    {departments?.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="relative-row">
                <Form.Group className="mb-3" controlId="attendance">
                  <Form.Label>Attendance Profile</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleFormChange}
                    value={form.attendance}
                    name="attendance"
                    className="form-text-input"
                    isInvalid={!!errors.attendance}
                    required
                  >
                    <option value="">
                      {editedData
                        ? editedData?.user?.attendance_profile?.name
                        : "Select"}
                    </option>
                    {attendance?.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    ))}
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
                    className="form-text-input form-select-extrapadding"
                    isInvalid={!!errors.role}
                    required
                  >
                    <option value="">Select</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
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
                    <option>
                      {editedData ? editedData?.user?.position?.name : "Select"}
                    </option>
                    {positions?.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    ))}
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
                    className="form-text-input form-select-extrapadding"
                    // isInvalid={ !!errors.dManager }
                  >
                    <option>
                      {editedData
                        ? editedData?.user?.manager?.name
                        : "Select Option"}
                    </option>
                    {filteredManagers?.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.dManager}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="relative-row">
                <Form.Group className="mb-3" controlId="copiedManager">
                  <Form.Label>Copied Manager</Form.Label>
                  <MultiSelectSort
                    options={filteredCopiedManagersReselect}
                    value={form.copiedManager}
                    name="copiedManager"
                    onChange={(selectedOption) => {
                      setForm((prevState) => ({
                        ...prevState,
                        copiedManager: selectedOption,
                      }));
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dManager}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <h4>Work from home</h4>
            <hr className="sub-hr" />
            <Row className="mt-2">
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
            <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-3">
              <Button
                bg="danger"
                size="lg"
                className="form-btn cancel form-btn d-flex justify-content-center align-items-center"
                onClick={() => {
                  setModalOpen(false);
                  setnewForm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="form-btn save d-flex justify-content-center align-items-center "
                type="submit"
              >
                Save
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default FormModal;
