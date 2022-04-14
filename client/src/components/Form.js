import React, { useState } from "react";

const Form = ({ registerStudent, removeStudent }) => {
  const initialState = {
    student_id: "",
    course_code: "",
  };
  const [formValues, setFormValues] = useState(initialState);

  const handleOnChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { student_id, course_code } = formValues;
    const type = e.nativeEvent.submitter.value;
    if (type === "register") {
      return (
        (await registerStudent(student_id, course_code)) &&
        setFormValues(initialState)
      );
    }
    return (
      type === "deregister" &&
      (await removeStudent(student_id, course_code)) &&
      setFormValues(initialState)
    );
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="student_id">Student ID</label>
        <input
          type="text"
          name="student_id"
          value={formValues.student_id}
          onChange={handleOnChange}
          pattern="[0-9]+"
          required
        />
        <label htmlFor="course_code">Course Code</label>
        <input
          type="text"
          name="course_code"
          value={formValues.course_code}
          onChange={handleOnChange}
          pattern="[0-9]+"
          required
        />
        <div className="form-buttons">
          <input type="submit" value="register" />
          <input type="submit" value="deregister" />
        </div>
      </form>
    </div>
  );
};

export default Form;
