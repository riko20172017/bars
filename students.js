const headers = require("./credential.json");

show_students();

async function show_students(groups) {
  const students = await get_students();

  for (let index = 0; index < students.length; index++) {
    const student = students[index];
    console.log(`${student.fullname}*${student.actual_group_name}`);
  }
}

async function get_students() {
  try {
    const response = await fetch(
      "https://college.07.edu.o7.com/actions/student/studentrowsaction",
      {
        headers,
        body: `period_id=21&limit=2050&start=0`,
        method: "POST",
      }
    );
    const r = await response.json();
    return r.rows;
  } catch (error) {
    console.error("Error fetching students rows:", error);
    return;
  }
}
