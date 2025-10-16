const groups = require("./groups.json");
const headers = require("./credential.json");

async function get_work_plans(groups) {
  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];
    const course_number = group.group_actual_name.split(" ")[2];
    const group_id = group.id;
    const sub_periods = await get_sub_periods(group_id);
    const sub_period_id = get_sub_period_id(sub_periods, course_number);
    const work_plan = await get_work_plan(group_id, sub_period_id);

    for (let index = 0; index < work_plan.length; index++) {
      const plan = work_plan[index];
      const [plan_id_type, plan_id] = plan.id.split("_");
      let work_plan_object_rows;

      switch (plan_id_type) {
        case "1":
          work_plan_object_rows = await get_work_plan_sub_rows(
            group_id,
            plan_id,
            plan.object_id
          );
          break;
        case "2":
          work_plan_object_rows = await get_work_plan_mdk_rows(
            group_id,
            plan_id,
            plan.object_id
          );
          break;
        case "4":
          work_plan_object_rows = await get_work_plan_pra_rows(
            group_id,
            plan_id,
            plan.object_id
          );
          break;
        default:
          break;
      }

      const wps = Object.values(
        work_plan_object_rows?.length ? work_plan_object_rows[0] : {}
      )
        .slice(0, -2)
        .join(" ");

      console.log(
        `${group.group_actual_name}*${plan.employers}*${plan.name}*${wps}`
      );
    }
  }
}

async function get_sub_periods(group_id) {
  const response = await fetch(
    "https://college.07.edu.o7.com/actions/group_subperiod/objectrowsactionforgroup",
    {
      headers,
      body: `start=0&limit=50&groups_id=${group_id}`,
      method: "POST",
    }
  );

  const suberiods = await response.json();
  return suberiods;
}

async function get_work_plan(group_id, sub_period_id) {
  const response = await fetch(
    "https://college.07.edu.o7.com/actions/work_plan/work_plan_rows",
    {
      headers,
      body: `group_id=${group_id}&subperiod_id=${sub_period_id}`,
      method: "POST",
    }
  );
  const work_plan = await response.json();
  return work_plan.rows;
}

async function get_work_plan_sub_rows(
  group_id,
  wpsvp_id,
  work_plan_subject_id
) {
  try {
    const response = await fetch(
      "https://college.07.edu.o7.com/actions/work_plan_subject_employer/work_plan_subject_employer_rows",
      {
        headers,
        body: `group_id=${group_id}&wpsvp_id=${wpsvp_id}&work_plan_subject_id=${work_plan_subject_id}`,
        method: "POST",
      }
    );
    const work_plan_subject = await response.json();
    return work_plan_subject.rows;
  } catch (error) {
    console.log("group_id:", group_id);
    console.log("wpsvp_id:", wpsvp_id);
    console.log("work_plan_subject_id:", work_plan_subject_id);
    console.error("Error fetching work plan subject rows:", error);
    return;
  }
}

async function get_work_plan_mdk_rows(group_id, wpsmvp_id, work_plan_mdk_id) {
  try {
    const response = await fetch(
      "https://college.07.edu.o7.com/actions/work_plan_mdk_employer/work_plan_subject_employer_rows",
      {
        headers,
        body: `group_id=${group_id}&wpsmvp_id=${wpsmvp_id}&work_plan_mdk_id=${work_plan_mdk_id}`,
        method: "POST",
      }
    );
    const r = await response.json();
    return r.rows;
  } catch (error) {
    console.log("group_id:", group_id);
    console.log("wpsmvp_id:", wpsmvp_id);
    console.log("work_plan_mdk_id:", work_plan_mdk_id);
    console.error("Error fetching work plan subject rows:", error);
    return;
  }
}

async function get_work_plan_pra_rows(
  group_id,
  wppvp_id,
  work_plan_practice_id
) {
  try {
    const response = await fetch(
      "https://college.07.edu.o7.com/actions/work_plan_practice_employer/work_plan_subject_employer_rows",
      {
        headers,
        body: `group_id=${group_id}&wppvp_id=${wppvp_id}&work_plan_practice_id=${work_plan_practice_id}`,
        method: "POST",
      }
    );
    const work_plan_subject = await response.json();
    return work_plan_subject.rows;
  } catch (error) {
    console.log("group_id:", group_id);
    console.log("wppvp_id:", wppvp_id);
    console.log("work_plan_practice_id:", work_plan_practice_id);
    console.error("Error fetching work plan subject rows:", error);
    return;
  }
}

function get_sub_period_id(sub_periods, course_number) {
  const sub_period = sub_periods.rows.filter(
    (sub_period) =>
      sub_period.period__grouplevel__course == course_number &&
      sub_period.phase_id == 8
  );

  return sub_period[0].id;
}

get_work_plans(groups);
