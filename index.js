const groups = require("./groups.json");


async function get_work_plans(groups) {
  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];
    const course_number = group.group_actual_name.split(" ")[2];
    const group_id = group.id;
    const sub_periods = await get_sub_periods(group_id);
    const sub_period_id = get_sub_period_id(sub_periods, course_number);
    const work_plan = await get_work_plan(group_id, sub_period_id);
    work_plan.forEach((plan) => {
      console.log(`${group.group_actual_name}*${plan.name}*${plan.employers}`);
    });
  }
}
async function get_sub_periods(group_id) {
  const response = await fetch(
    "https://college.07.edu.o7.com/actions/group_subperiod/objectrowsactionforgroup",
    {
      headers: {
        accept: "*/*",
        "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrftoken":
          "cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
        cookie:
          "_ym_uid=1738241477713532996; _ym_d=1738241477; csrf_token_header_name=X-XSRFTOKEN; userNotifiedAboutCookieUsage=t; ssuz_sessionid=jv2ftt1dqvi3u1uhkb28k96a5c0vj04l; csrftoken=cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
        Referer: "https://college.07.edu.o7.com/desk/",
      },
      body: `start=0&limit=50&m3_window_id=cmp_3801a17e&groups_id=${group_id}`,
      method: "POST",
    }
  );

  const suberiods = await response.json();
  return suberiods;
}

function get_sub_period_id(sub_periods, course_number) {
  const sub_period = sub_periods.rows.filter(
    (sub_period) =>
      sub_period.period__grouplevel__course == course_number &&
      sub_period.phase_id == 8
  );

  return sub_period[0].id;
}

async function get_work_plan(group_id, sub_period_id) {
  const response = await fetch(
    "https://college.07.edu.o7.com/actions/work_plan/work_plan_rows",
    {
      headers: {
        accept: "*/*",
        "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrftoken":
          "cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
        cookie:
          "_ym_uid=1738241477713532996; _ym_d=1738241477; csrf_token_header_name=X-XSRFTOKEN; userNotifiedAboutCookieUsage=t; ssuz_sessionid=jv2ftt1dqvi3u1uhkb28k96a5c0vj04l; csrftoken=cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
        Referer: "https://college.07.edu.o7.com/desk/",
      },
      body: `group_id=${group_id}&subperiod_id=${sub_period_id}`,
      method: "POST",
    }
  );
  const work_plan = await response.json();
  return work_plan.rows;
}


get_work_plans(groups);