import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./form.css";

import { useNavigate } from "react-router-dom";

export default function EmployeeTable() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const navigator = useNavigate();
  // Function to fetch all employee details
  async function getDetails() {
    try {
      const res = await axios.get("https://docker-backend-0t2v.onrender.com/employees");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      enqueueSnackbar(
        "There was an error while fetching the details of the Employees!",
        {
          variant: "warning",
        }
      );
    } finally {
      setLoad(false);
    }
  }

  // Function to delete an employee
  async function deleteEmployee(id) {
    try {
     axios.delete(`http://localhost:8080/xto10x/employees/${id}`)
      .then(response => {
        enqueueSnackbar("Successfully deleted details of ID: " + id, {
          variant: "success",
        });
          console.log('Employee deleted successfully');
      })
      .catch(error => {
          console.error('Error deleting employee:', error);
      });
        getDetails();
    } catch (error) {
      enqueueSnackbar("Something went wrong while deleting", {
        variant: "warning",
      });
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {load ? (
        <center>Loading...</center>
      ) : data.length > 0 ? (
        <center>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Manager Name</th>
                <th>Manager Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele) => (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.employeeName}</td>
                  <td>{ele.employeeEmail}</td>
                  <td>{ele.managerName}</td>
                  <td>{ele.managerEmail}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteEmployee(ele.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      ) : (
        <center>
          <p>No Data Present...! Please check the backend.</p>
        </center>
      )}
      <center>
        <button onClick={() => navigator("/form")}>Go Back</button>
      </center>
    </div>
  );
}