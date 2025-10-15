import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

try:
    with open('groups.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    # for item in data:
    #     print(item)
    print(data[0])
    headers = {
        "accept": "*/*",
        "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrftoken": "1eOupmVLuRm84jII0R9YY6F9K0EmzUpxGqrGOiDWIIr8VYS09rshzlVREJ8bOIM8",
        "cookie": "_ym_uid=1738241477713532996; _ym_d=1738241477; csrf_token_header_name=X-XSRFTOKEN; userNotifiedAboutCookieUsage=t; ssuz_sessionid=pl6gxnqmpalldbru200yxwpqv67s0jxn; csrftoken=1eOupmVLuRm84jII0R9YY6F9K0EmzUpxGqrGOiDWIIr8VYS09rshzlVREJ8bOIM8",
        "Referer": "https://college.07.edu.o7.com/desk/"
    }
    body = {"start": 0, "limit": 50, "groups_id": 2758}

    r = requests.post(
        'https://college.07.edu.o7.com/actions/group_subperiod/objectrowsactionforgroup', headers=headers, json=data)
    print(r.text)

    # print(f"Parsed data: {data}")

except FileNotFoundError:
    print("Error: 'data.json' not found.")
except json.JSONDecodeError:
    print("Error: Failed to decode JSON from the file. Check for malformed JSON.")
