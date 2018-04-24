# import datetime
# from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

import MySQLdb
import copy
import os
import datetime
import random
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'

# Create your views here.


@api_view(["POST", "GET"])
def index(request):
    '''
    '''
    if request.method == "POST":
        return HttpResponse("xxx")
    elif request.method == "GET":
        testData = {
            "regNum": 15,
            "chargeNum": 22,
            "checkNum": 18,
            "detail": [
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521", "color": ""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521", "color": ""},
            ]
        }
        return JsonResponse(testData)


STATUS = {
    "等待就诊": {"color": "yellow", "times": 30},
    "正在就诊": {"color": "green", "times": 30},
    "等待缴费": {"color": "yellow", "times": 30},
    "等待检查": {"color": "yellow", "times": 30},
    "等待检验": {"color": "yellow", "times": 30},
    "正在检查": {"color": "green", "times": 30},
    "等待检查报告": {"color": "yellow", "times": 30},
    "等待检验报告": {"color": "yellow", "times": 30},
    "等待取药": {"color": "yellow", "times": 30},
    "取药完毕": {"color": "blue", "times": 30},

}

DATA = []
n1 = (int(datetime.datetime.now().strftime('%H')) - 8) * 220 + random.randint(-50, 50)
n2 = int(n1 / 3) + random.randint(-30, 30)
n3 = n1 - n2 - random.randint(100, 300)
n6 = (int(datetime.datetime.now().strftime('%H')) - 8) * 75 + random.randint(-50, 50)
n4 = int(n6 / 8) + random.randint(-30, 30)
n5 = int(n6 / 5) + random.randint(-30, 30)


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
                    i["time"] = 0
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
