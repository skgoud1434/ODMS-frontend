import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function GetEmployeeById() {
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();

  const [num, setNum] = useState("");
  const [employeeData, setEmployeeData] = useState(null);

  // Fetch employee details by ID
  const getEmployeeById = async () => {
    if (num) {
      try {
        const res = await axios.get(
          `https://docker-backend-0t2v.onrender.com/employees/${num}`
        );
        console.log(res);

        if (res.data.employeeEmail != null) {
          enqueueSnackbar("Details found", { variant: "success" });
          setEmployeeData(res.data); // Store the data in state
        } else {
          enqueueSnackbar("No details found", { variant: "warning" });
          setEmployeeData(null); // Clear previous data if not found
        }
      } catch (error) {
        enqueueSnackbar("Check the backend", { variant: "warning" });
        setEmployeeData(null); // Clear previous data on error
      }
    }
  };

  useEffect(() => {
    if (num) {
      getEmployeeById();
    }
  }, [num]);

  return (
    <div className="container">
      <center>
        <h3>Please enter the ID of the employee to get the details</h3>
        <input
          type="number"
          placeholder="Employee ID"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />

        {employeeData && (
          <div className="employee-details">
            <h4>Employee Details</h4>
            {/* <p>ID: {num}</p> */}
            <p>Name: {employeeData.employeeName}</p>
            <p>Email: {employeeData.employeeEmail}</p>
            <p>Manager Name: {employeeData.managerName}</p>
            <p>Manager Email: {employeeData.managerEmail}</p>
          </div>
        )}

        {!employeeData && num && <p>No data found for the provided ID.</p>}

        <button onClick={() => navigator("/form")}>Go Back</button>
      </center>
    </div>
  );
}
