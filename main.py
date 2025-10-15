import sys
import requests

sys.stdout.reconfigure(encoding='utf-8')


url = "https://college.07.edu.o7.com/actions/group_subperiod/objectrowsactionforgroup"

headers = {
    "accept": "*/*",
    "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest",
    "x-xsrftoken": "cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
    "cookie": "_ym_uid=1738241477713532996; _ym_d=1738241477; csrf_token_header_name=X-XSRFTOKEN; "
              "userNotifiedAboutCookieUsage=t; ssuz_sessionid=jv2ftt1dqvi3u1uhkb28k96a5c0vj04l; "
              "csrftoken=cBD1E3Xidgjx621rpuPe4g5afRtrEvvyzTlvhBGqNv8VbtqHBRoEuZW9RIAWaWkO",
    "Referer": "https://college.07.edu.o7.com/desk/",
}

data = {
    "start": "0",
    "limit": "50",
    "m3_window_id": "cmp_3801a17e",
    "groups_id": "2606"
}

response = requests.post(url, headers=headers, data=data)
response.raise_for_status()
print(response.json())
