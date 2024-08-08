import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./form.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    id: "",
    employeeName: "",
    employeeEmail: "",
    managerName: "",
    managerEmail: "",
  });

  const navigate = useNavigate();

  const validObject = (data) => {
    if (!data.employeeName) {
      enqueueSnackbar("Employee name is mandatory", { variant: "warning" });
      return false;
    }
    if (!data.employeeEmail) {
      enqueueSnackbar("Employee email is mandatory", { variant: "warning" });
      return false;
    }
    if (!data.managerName) {
      enqueueSnackbar("Manager name is mandatory", { variant: "warning" });
      return false;
    }
    if (!data.managerEmail) {
      enqueueSnackbar("Manager email is mandatory", { variant: "warning" });
      return false;
    }
    return true;
  };

  const register = async () => {
    if (validObject(data)) {
      try {
        const res = await axios.post("http://localhost:8080/xto10x/employees", {
          id: data.id,
          employeeName: data.employeeName,
          employeeEmail: data.employeeEmail,
          managerName: data.managerName,
          managerEmail: data.managerEmail,
        });
        enqueueSnackbar("Registration is Successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("There was an error while registering the employee!", {
          variant: "warning",
        });
      }
    }
  };

  const updateDetails = async () => {
    if (validObject(data)) {
      try {
        const res = await axios.put(
          `http://localhost:8080/xto10x/employees/${data.id}`,
          data
        );
        enqueueSnackbar("Successfully updated details", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(
          "There was an error while updating the employee details!",
          { variant: "warning" }
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    setData({
      id: "",
      employeeName: "",
      employeeEmail: "",
      managerName: "",
      managerEmail: "",
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3>Enter the details to get registered/update details</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data.id}
          name="id"
          placeholder="Enter employee id"
          onChange={handleChange}
        />
        <input
          type="text"
          value={data.employeeName.toLowerCase()}
          name="employeeName"
          placeholder="Enter employee name"
          onChange={handleChange}
        />
        <input
          type="email"
          value={data.employeeEmail.toLowerCase()}
          name="employeeEmail"
          placeholder="Enter employee email"
          onChange={handleChange}
        />
        <input
          type="text"
          value={data.managerName.toLowerCase()}
          name="managerName"
          placeholder="Enter manager name"
          onChange={handleChange}
        />
        <input
          type="email"
          value={data.managerEmail.toLowerCase()}
          name="managerEmail"
          placeholder="Enter manager email"
          onChange={handleChange}
        />
        <div className="formDiv">
          <input type="submit" value="Submit" />
          <input type="button" value="Update" onClick={updateDetails} />
        </div>
      </form>
      <div className="row1">
        <button onClick={() => navigate("/getEmployeeById")}>
          Get Details By Id
        </button>
        <button onClick={() => navigate("/getEmployers")}>
          Get employees under the Manager
        </button>
      </div>
      <div className="row2">
        <button onClick={() => navigate("/TableView")}>Get table data</button>
        <button onClick={() => navigate("/simpleTree")}>
          Organization Hierarchy
        </button>
      </div>
    </div>
  );
}