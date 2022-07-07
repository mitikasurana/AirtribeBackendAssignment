const connection = require("../helper/db");

var leadStatus = ["Accept", "Reject", "Waitlist"];

function emptyOrRows(rows) {
  if (rows.length===0) {
    console.log("No records found");
    return "No records found";
  }
  return rows;
}

async function tablesExist() {
  var res1 = await connection.query(
    `CREATE TABLE if not exists course 
      (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), instructor_id INT, start_date DATE, max_seats INT);`
  );
  var res2 = await connection.query(
    `CREATE TABLE if not exists leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(30),
        phone VARCHAR(15),
        course_name VARCHAR(30),
        linkedin_acc VARCHAR(30),
        status VARCHAR(10),
        comments VARCHAR(45));`
  );
}

async function createCourse(course) {
  const result = await connection.query(
    `INSERT INTO course 
    (id, name, instructor_id, start_date, max_seats) 
    VALUES 
    (${course.id}, "${course.name}", ${course.instructor_id}, "${course.start_date}", ${course.max_seats})`
  );

  let message = "Could not create course :(";

  if (result.affectedRows) {
    message = "Course created successfully!";
  }

  return { message };
}

async function updateCourse(id, course) {
  const result = await connection.query(
    `UPDATE course 
    SET name="${course.name}", start_date="${course.start_date}", max_seats=${course.max_seats} 
    WHERE id=${id}`
  );

  let message = "Could not update course :(";

  if (result.affectedRows) {
    message = "Course updated successfully!";
  }

  return { message };
}

async function createLead(user) {
  var pno = user.phone;
  const regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
  if (!regex.test(pno)) {
    return "Invalid phone number";
  }
  const result = await connection.query(
    `INSERT INTO leads 
    (id, name, email, phone, course_name, linkedin_acc ) 
    VALUES 
    (${user.id}, "${user.name}", "${user.email}", "${user.phone}", "${user.course_name}", "${user.linkedin_acc}")`
  );

  let message = "Could not create lead :(";

  if (result.affectedRows) {
    message = "Lead created successfully!";
  }

  return { message };
}

async function updateLeadStatus(id, status) {
  const result = await connection.query(
    `UPDATE leads 
    SET status="${status}"
    WHERE id=${id}`
  );

  let message = "Could not update lead status :(";

  if (result.affectedRows) {
    message = "Lead status updated successfully!";
  }

  return { message };
}

async function searchLead(lead) {
  var name = "null", email = "null";
  try {
    name = lead.name;
    email = lead.email;
  } catch {
    console.error(`Name or email missing `, err.message);
  }
  const result = await connection.query(
    `SELECT * from leads 
     WHERE name="${name}" or email="${email}"`
  );
  const data = emptyOrRows(result);

  return { data };
}

async function updateLeadComment(id, comment) {
  //check for null comments
  const result = await connection.query(
    `UPDATE leads 
    SET comments="${comment}"
    WHERE id=${id}`
  );

  let message = "Could not add comment :(";

  if (result.affectedRows) {
    message = "Comment added successfully!";
  }

  return { message };
}

module.exports = {
  tablesExist,
  createCourse,
  createLead,
  updateCourse,
  searchLead,
  updateLeadStatus,
  updateLeadComment
};