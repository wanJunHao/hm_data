# import datetime
# from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse

import MySQLdb
import copy
import os
import datetime
import random
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

# Create your views here.


STATUS = {
    "等待就诊": {"color": "yellow", "times": 30, "new": ""},
    "正在就诊": {"color": "green", "times": 30, "new": ""},
    "等待缴费": {"color": "yellow", "times": 30, "new": ""},
    "等待检查": {"color": "yellow", "times": 30, "new": ""},
    "等待检验": {"color": "yellow", "times": 30, "new": ""},
    "正在检查": {"color": "green", "times": 30, "new": ""},
    "等待检查报告": {"color": "yellow", "times": 30, "new": ""},
    "等待检验报告": {"color": "yellow", "times": 30, "new": ""},
    "等待取药": {"color": "yellow", "times": 30, "new": ""},
    "取药完毕": {"color": "blue", "times": 30, "new": ""}
}

DATA = []
n1 = (int(datetime.datetime.now().strftime('%H')) - 7) * 220 + random.randint(-50, 50)
n2 = int(n1 / 3) + random.randint(-30, 30)
n3 = n1 - n2 - random.randint(100, 300)
n6 = (int(datetime.datetime.now().strftime('%H')) - 7) * 75 + random.randint(-30, 30)
n4 = random.randint(60, 70)
n5 = random.randint(98, 120)


@api_view(["GET"])
def getInfo(request):
    '''
    '''
    if request.method == "GET":
        global DATA, n1, n2, n3, n4, n5, n6
        if not DATA:
            conn = MySQLdb.connect(user="root", password="123.com", host="192.168.1.109", port=3306, db="hm", charset="utf8")
            c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
            sql = '''
            SELECT card_no, name, rela_phone, address, idenno FROM register
            '''
            c.execute(sql)
            data = c.fetchall()
            for i in data:
                randList = [
                    {"等待就诊": random.randint(1, 40)},
                    {"正在就诊": random.randint(1, 40)},
                    {"等待缴费": random.randint(5, 40)},
                    {"等待检查": random.randint(2, 40)},
                    {"等待检验": random.randint(2, 40)},
                    {"正在检查": random.randint(1, 40)},
                    {"等待检查报告": random.randint(3, 60)},
                    {"等待检验报告": random.randint(3, 60)},
                    {"等待取药": random.randint(3, 10)},
                    {"取药完毕": 0}
                ]
                randData = random.choice(randList)
                i["link"] = list(randData.keys())[0]
                if i["link"] == "取药完毕":
                    i["status"] = "blue"
                else:
                    i["time"] = list(randData.values())[0]
                    i["status"] = STATUS[i["link"]]["color"] if i["time"] < STATUS[i["link"]]["times"] else "red"
                    i["settime"] = STATUS[i["link"]]["times"]

        else:
            data = DATA
            for i in data:
                if i["link"] == "取药完毕":
                    continue

                a = random.randint(1, 15)
                if a == 3:
                    if i["link"] == "等待就诊":
                        i["link"] == "正在就诊"
                    elif i["link"] == "正在就诊":
                        i["link"] = "等待缴费"
                    elif i["link"] == "等待缴费":
                        i["link"] = random.choice(["等待检查", "等待检验", "等待取药"])
                    elif i["link"] == "等待检查":
                        i["link"] = "正在检查"
                    elif i["link"] == "等待检验":
                        i["link"] = "等待检验报告"
                    elif i["link"] == "正在检查":
                        i["link"] = "等待检查报告"
                    elif i["link"] == "等待取药":
                        i["link"] = "取药完毕"
                    elif i["link"] in ["等待检验报告", "等待检查报告"]:
                        i["link"] = "正在就诊"
                    i["status"] = STATUS[i["link"]]["color"]
                    i["time"] = 1
                else:
                    i["time"] += 1
                    i["status"] = STATUS[i["link"]]["color"] if i["time"] < STATUS[i["link"]]["times"] else "red"
                i["settime"] = STATUS[i["link"]]["times"]
            n1 += random.randint(0, 5)
            n2 += random.randint(-2, 2)
            n3 += random.randint(0, 3)
            n4 += random.randint(-2, 2)
            n5 += random.randint(-2, 2)
            n6 += random.randint(0, 2)

        DATA = copy.deepcopy(data)
        context = {
            "data": data,
            "map": {
                "status": "颜色",
                "link": "环节",
                "name": "姓名",
                "card_no": "门诊病历号",
                "idenno": "身份证号",
                "address": "家庭住址",
                "rela_phone": "联系电话"
            },
            "counts": [
                {"name": "挂号总人数", "count": n1},
                {"name": "正在诊断人数", "count": n2},
                {"name": "初诊完毕人数", "count": n3},
                {"name": "候检人数", "count": n4},
                {"name": "就检人数", "count": n5},
                {"name": "检查完毕人数", "count": n6}
            ]
        }
        return JsonResponse(context)


@api_view(["GET", "POST"])
def setTime(request):
    '''
    '''
    global STATUS
    if request.method == "GET":
        jsonData = request.data
        if jsonData:
            link = jsonData["link"]
            data = STATUS[link]
        else:
            data = STATUS
        return JsonResponse({"data": data})

    elif request.method == "POST":
        jsonData = request.data
        print(jsonData)
        links = jsonData["data"]
        for k, v in links.items():
            STATUS[k]["times"] = v["times"]
            STATUS[k]["new"] = v["new"]
        return JsonResponse({"status": "success"})


STATUS_1 = {
    "等待入院": {"color": "yellow", "times": 30, "new": ""},
    "等待接诊": {"color": "yellow", "times": 30, "new": ""},
    "校对医嘱": {"color": "yellow", "times": 30, "new": ""},
    "等待检验": {"color": "yellow", "times": 30, "new": ""},
    "等待检查": {"color": "yellow", "times": 30, "new": ""},
    "正在检查": {"color": "green", "times": 30, "new": ""},
    "正在检验": {"color": "green", "times": 30, "new": ""},
    "等待手术方案": {"color": "yellow", "times": 30, "new": ""},
    "等待手术": {"color": "yellow", "times": 30, "new": ""},
    "正在手术": {"color": "green", "times": 30, "new": ""},
    "术后到出院": {"color": "yellow", "times": 30, "new": ""},
    "已出院": {"color": "blue", "times": 30, "new": ""}
}

DATA_1 = []


@api_view(["GET"])
def zhuyuanInfo(request):
    '''
    '''
    if request.method == "GET":
        global DATA_1
        if not DATA_1:
            conn = MySQLdb.connect(user="root", password="123.com", host="192.168.1.109", port=3306, db="hm", charset="utf8")
            c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
            sql = '''
            SELECT card_no, name, rela_phone, address, idenno FROM register
            '''
            c.execute(sql)
            data = c.fetchall()
            for i in data:
                randList = [
                    {"等待入院": random.randint(1, 40)},
                    {"等待接诊": random.randint(1, 40)},
                    {"校对医嘱": random.randint(5, 40)},
                    {"等待检验": random.randint(2, 40)},
                    {"等待检查": random.randint(2, 40)},
                    {"正在检查": random.randint(1, 40)},
                    {"正在检验": random.randint(3, 60)},
                    {"等待手术方案": random.randint(3, 60)},
                    {"等待手术": random.randint(3, 10)},
                    {"正在手术": random.randint(3, 10)},
                    {"术后到出院": random.randint(3, 10)},
                    {"已出院": 0},
                ]
                randData = random.choice(randList)
                i["link"] = list(randData.keys())[0]
                if i["link"] == "已出院":
                    i["status"] = "blue"
                else:
                    i["time"] = list(randData.values())[0]
                    i["status"] = STATUS_1[i["link"]]["color"] if i["time"] < STATUS_1[i["link"]]["times"] else "red"
                    i["settime"] = STATUS_1[i["link"]]["times"]
        else:
            data = DATA_1
            for i in data:
                count = 0
                if i["link"] == "取药完毕":
                    continue

                a = random.randint(1, 60)
                if a == 3:
                    if i["link"] == "等待入院":
                        i["link"] == "等待接诊"
                    elif i["link"] == "等待接诊":
                        i["link"] = "校对医嘱"
                    elif i["link"] == "校对医嘱":
                        i["link"] = random.choice(["等待检查", "等待检验"])
                    elif i["link"] == "等待检查":
                        i["link"] = "正在检查"
                    elif i["link"] == "等待检验":
                        i["link"] = "正在检验"
                    elif i["link"] in ["正在检查", "正在检验"]:
                        i["link"] = "等待手术方案"
                    elif i["link"] == "等待手术方案":
                        b = random.randint(1, 3)
                        if b == 3:
                            i["link"] = "等待手术"
                        else:
                            count += 1
                    elif i["link"] == "等待手术":
                        b = random.randint(1, 100)
                        if b == 3:
                            i["link"] = "正在手术"
                        else:
                            count += 1
                    elif i["link"] == "正在手术":
                        b = random.randint(1, 3)
                        if b == 3:
                            i["link"] = "术后到出院"
                        else:
                            count += 1
                    elif i["link"] == "术后到出院":
                        b = random.randint(1, 200)
                        if b == 3:
                            i["link"] = "已出院"
                        else:
                            count += 1
                    if count == 0:
                        i["status"] = STATUS[i["link"]]["color"]
                        i["time"] = 1
                    else:
                        i["time"] += 1
                        i["status"] = STATUS[i["link"]]["color"] if i["time"] < STATUS[i["link"]]["times"] else "red"
                else:
                    i["time"] += 1
                    i["status"] = STATUS[i["link"]]["color"] if i["time"] < STATUS[i["link"]]["times"] else "red"
                i["settime"] = STATUS[i["link"]]["times"]
