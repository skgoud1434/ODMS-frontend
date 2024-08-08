import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import "./form.css";

export default function GetManager() {
  const navigate = useNavigate();

  const [manager, setManager] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/xto10x/employees/by-employee/${employee}`
        );
        let ans = res.data;
        setManager(ans.managerEmail);
      } catch (error) {
        console.error("Error fetching manager details:", error);
        enqueueSnackbar("Failed to fetch manager details.", { variant: "error" });
      }
    };

    const debounceTimeout = setTimeout(() => {
      if (employee) {
        fetchManager();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [employee, enqueueSnackbar]);

  return (
    <div>
      <h3>Enter Employee Email to get the Manager</h3>
      <input
        type="text"
        placeholder="Employee Email"
        value={employee.toLowerCase()}
        onChange={(e) => setEmployee(e.target.value)}
      />

      {manager ? <p>{manager}</p> : <p>No Data Found</p>}

      <button onClick={() => navigate("/form")}>Go Back</button>
    </div>
  );
}
