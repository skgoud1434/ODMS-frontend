import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [manager, setManager] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  async function getEmployeeByManagerName(manager) {
    try {
      const res = await axios.get(
        `https://docker-backend-0t2v.onrender.com/employees/${manager}`
      );
      setEmployees(res.data); // Update with the response data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  useEffect(() => {
    if (manager) {
      getEmployeeByManagerName(manager);
    } else {
      setEmployees([]); // Clear employees if manager is empty
    }
  }, [manager]);

  return (
    <div>
      <center>
        <h3>Enter Manager Email to get the employees</h3>
        <input
          type="text"
          placeholder="Manager Email"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
        {employees.length > 0 ? (
          <ul>
            {employees.map((ele) => (
              <li key={ele.employeeEmail}>{ele.employeeEmail}</li>
            ))}
          </ul>
        ) : manager ? (
          <p>No data found</p>
        ) : null}
      </center>
      <center>
        <button onClick={() => navigate("/form")}>Go Back</button>
      </center>
    </div>
  );
}