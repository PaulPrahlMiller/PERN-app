import React from "react";

const Table = (props) => {
  const tableRows =
    props.registered?.map((row, idx) => {
      return (
        <tr key={idx}>
          <td>{row.student_id}</td>
          <td>{row.student_name}</td>
          <td>{row.course_name}</td>
          <td>{row.unix_timestamp}</td>
        </tr>
      );
    }) || null;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr onClick={(e) => props.handleClick(e)}>
            <th id="student_id">Student ID</th>
            <th id="student_name">Student name</th>
            <th id="course_name">Course</th>
            <th id="unix_timestamp">Registration date</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div className="database-info">
        <span>
          Course codes: Mathematics 123, Fullstack 124, Philosophy 125
        </span>
        <span>Student IDs: Paul 1, Deema 2, John 3, Andrew 4, Ziggy 5</span>
      </div>
    </div>
  );
};

export default Table;
