# import datetime
# from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse

import cx_Oracle
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
    conn = getC()
    c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)

    if request.method == "GET":
        global DATA, n1, n2, n3, n4, n5, n6
        if not DATA:
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
        c.close()
        conn.close()
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
        for i in jsonData["data"]:
            STATUS[i["link"]]["times"] = int(i["times"])
            STATUS[i["link"]]["new"] = i["new"]

        return JsonResponse({"status": "success"})


STATUS_1 = {
    "等待入院": {"color": "yellow", "times": 30, "new": ""},
    "等待接诊": {"color": "yellow", "times": 30, "new": ""},
    "校对医嘱": {"color": "yellow", "times": 30, "new": ""},
    "等待检验": {"color": "yellow", "times": 30, "new": ""},
    "等待检查": {"color": "yellow", "times": 30, "new": ""},
    "正在检查": {"color": "green", "times": 60, "new": ""},
    "正在检验": {"color": "green", "times": 60, "new": ""},
    "等待手术方案": {"color": "yellow", "times": 60, "new": ""},
    "等待手术": {"color": "yellow", "times": 4320, "new": ""},
    "正在手术": {"color": "green", "times": 100, "new": ""},
    "术后到出院": {"color": "yellow", "times": 8640, "new": ""},
    "已出院": {"color": "blue", "times": 30, "new": ""}
}

DATA_1 = []
nn1 = random.randint(95, 130)
nn2 = random.randint(95, 130)


@api_view(["GET"])
def zhuyuanInfo(request):
    '''
    '''
    conn = getC()
    c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
    if request.method == "GET":
        global DATA_1
        if not DATA_1:
            sql = '''
            SELECT inpatient_no, name, home_tel, home, idenno FROM zhuyuan
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
                    {"正在检查": random.randint(1, 80)},
                    {"正在检验": random.randint(3, 80)},
                    {"等待手术方案": random.randint(3, 80)},
                    {"等待手术": random.randint(3, 5000)},
                    {"正在手术": random.randint(3, 120)},
                    {"术后到出院": random.randint(3, 10000)},
                    {"已出院": 0}
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
                if i["link"] == "已出院":
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
                else:
                    count += 1

                if count == 0:
                    i["status"] = STATUS_1[i["link"]]["color"]
                    i["time"] = 1
                else:
                    i["time"] += 1
                    i["status"] = STATUS_1[i["link"]]["color"] if i["time"] < STATUS_1[i["link"]]["times"] else "red"
                i["settime"] = STATUS_1[i["link"]]["times"]

        DATA_1 = copy.deepcopy(data)
        context = {
            "data": data,
            "map": {
                "status": "颜色",
                "link": "环节",
                "name": "姓名",
                "inpatient_no": "住院号",
                "idenno": "身份证号",
                "home": "家庭住址",
                "home_tel": "联系电话"
            },
            "counts": [
                {"name": "今日入院患者", "count": nn1},
                {"name": "今日出院患者", "count": nn2}
            ]
        }
        c.close()
        conn.close()
        return JsonResponse(context)


@api_view(["GET", "POST"])
def zhuyuanTime(request):
    '''
    '''
    global STATUS_1
    if request.method == "GET":
        jsonData = request.data
        if jsonData:
            link = jsonData["link"]
            data = STATUS_1[link]
        else:
            data = STATUS_1
        return JsonResponse({"data": data})

    elif request.method == "POST":
        jsonData = request.data
        for i in jsonData["data"]:
            STATUS_1[i["link"]]["times"] = int(i["times"])
            STATUS_1[i["link"]]["new"] = i["new"]
        return JsonResponse({"status": "success"})


countryList = ["清河", "夏津", "高唐", "茌平", "东昌府区", "冠县", "馆陶", "临西", "临清"]
townList = ["唐园", "烟店", "潘庄", "八岔路", "刘垓子", "魏湾", "康庄", "老赵庄",
            "松林", "尚店", "戴湾", "金郝庄", "大辛庄办事处", "新华办事处", "青年办事处", "先锋办事处"]
methods = {
    "mz": {
        # "addr": "住址", "date": "挂号日期", "ks": "挂号科室", "zd": "诊断", "table": "view_mz"
        "addr": "addr", "date": "dates", "ks": "ks", "zd": "zd", "table": "view_mz"
    },
    "zy": {
        # "addr": "家庭住址", "date": "入院日期", "ks": "入院科室", "zd": "入院诊断", "table": "view_zyzd"
        "addr": "addr", "date": "dates", "ks": "ks", "zd": "zd", "table": "view_zyzd"
    }
}


@api_view(["GET"])
def areaMap(request, method, area):
    '''
    '''

    if request.method == "GET":
        jsonData = request.data
        method = methods[method]

        # conn = cx_Oracle.connect("lchisjk/jklchis@10.10.102.1:1521/eryuan")
        # c = conn.cursor()
        conn = getC()
        c = conn.cursor()
        sql = "select "
        for i in eval('{}List'.format(area)):
            sql += "sum(case when ({0} like '%{1}%') then 1 else 0 end) as {1}, ".format(method['addr'], i)
        if area == "town":
            sql += "sum(case when ({0} like '%临清%') then 1 else 0 end) as 临清, ".format(method['addr'])
        if not jsonData:
            sql += "max({0}) as 最大日期, min({0}) as 最小日期 from {1}".format(method['date'], method['table'])
        else:
            sql = sql[:-2] + " from {} where 1 = 1 ".format(method['table'])
            if "ks" in jsonData.keys():
                sql += "and {0} = '{1}' ".format(method['ks'], jsonData["ks"])
            if "bz" in jsonData.keys():
                sql += "and {0} = '{1}' ".format(method['bz'], jsonData["bz"])
            if "start" in jsonData.keys():
                sql += "and to_char({0}) >= '{1}' ".format(method['date'], jsonData["start"])
            if "end" in jsonData.keys():
                sql += "and to_char({0}) <= '{1}' ".format(method['date'], jsonData["end"])

        c.execute(sql)
        dataList = c.fetchall()
        colList = c.description

        data = []
        for i in range(len(colList)):
            dic = {}
            dic["name"] = colList[i][0]
            dic["value"] = dataList[0][i]
            data.append(dic)
        if area == "town":
            for i in data:
                if i['name'] == '临清':
                    lqsum = i['value']
                    for j in data[:-3]:
                        lqsum -= j['value']
                    i['value'] = lqsum
        c.close()
        conn.close()
        return JsonResponse({"data": data})


@api_view(["GET"])
def searchName(request, method, keyword):
    '''
    '''
    if request.method == "GET":
        conn = getC()
        c = conn.cursor()
        if method == "ks":
            # sql = "select distinct(科室名称) from view_ks where 科室名称 like '%{}%'".format(keyword)
            sql = "select distinct(name) from view_ks where name like '%{}%'".format(keyword)
        elif method == "bz":
            # sql = "select distinct(诊断名称) from view_zd where 诊断名称 like '%{}%'".format(keyword)
            sql = "select distinct(name) from view_zd where name like '%{}%'".format(keyword)
        c.execute(sql)
        ll = c.fetchall()
        data = []
        for i in ll:
            data.append(i[0])
        c.close()
        conn.close()
        return JsonResponse({"data": data})


def getC():
    '''
    '''
    # conn = MySQLdb.connect(user="root", password="123.com", host="172.21.45.53", port=3306, db="hm", charset="utf8")
    conn = MySQLdb.connect(user="root", password="123.com", host="192.168.1.109", port=3306, db="hm", charset="utf8")
    return conn
