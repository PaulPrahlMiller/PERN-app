import React, { useState, useEffect, Fragment } from "react";
import useInterval from "../hooks/useInterval";
import sortInOrder from "../../../utils/sort";
import Form from "./Form";
import Table from "./Table";
import Alert from "./Alert";

const RegisteredStudents = () => {
  const [registered, setRegistered] = useState([]);
  const [orderedBy, setOrderedBy] = useState("unix_timestamp");
  const [sortedBy, setSortedBy] = useState("DESC");
  const [alert, setAlert] = useState({
    type: null,
    msg: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRegistered((current) => sortInOrder(current, orderedBy, sortedBy));
  }, [orderedBy, sortedBy]);

  useInterval(() => {
    fetchData();
  }, 60 * 1000);

  const handleClick = (e) => {
    if (e.target.tagName === "TH") {
      const value = e.target.id;
      if (orderedBy === value) {
        setSortedBy((current) => (current === "ASC" ? "DESC" : "ASC"));
      } else {
        setOrderedBy(value);
        setSortedBy("ASC");
      }
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      setAlert({
        type: null,
        msg: "",
      });
    }, 3000);
  };

  const registerStudent = async (studentId, courseCode) => {
    let data = {
      studentId: parseInt(studentId),
      courseCode,
    };
    const response = await fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await response.json();

    if (response.status === 201) {
      setAlert({
        type: "success",
        msg: "Student Registered",
      });
      fetchData();
      clearAlert();
      return true;
    } else {
      setAlert({
        type: "error",
        msg: data.error,
      });
      clearAlert();
      return false;
    }
  };

  const removeStudent = async (studentId, courseCode) => {
    let data = {
      studentId: parseInt(studentId),
      courseCode,
    };

    const response = await fetch("/api/registration", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = await response.json();

    if (response.status === 200) {
      setAlert({
        type: "success",
        msg: "Student has been removed from the course",
      });
      fetchData();
      clearAlert();
      return true;
    } else {
      setAlert({
        type: "error",
        msg: data.error,
      });
      clearAlert();
      return false;
    }
  };

  async function fetchData() {
    let response = await fetch(`/api/registration`);
    if (response.status === 200) {
      let data = await response.json();
      setRegistered(sortInOrder(data, orderedBy, sortedBy));
    }
  }

  return (
    <Fragment>
      <Form registerStudent={registerStudent} removeStudent={removeStudent} />
      <Alert alert={alert} />
      <Table handleClick={handleClick} registered={registered} />
    </Fragment>
  );
};

export default RegisteredStudents;
