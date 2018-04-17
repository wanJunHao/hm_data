import datetime
# from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

from .connectDb import getConn

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
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待收费", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""},
                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":""}
            ]
        }
        return JsonResponse(testData)


@api_view(["GET"])
def getInfo(request):
    '''
    '''
    if request.method == "GET":
        today = datetime.datetime.now().strftime('%Y-%m-%d')

        # 已经挂号, 等待就诊的当天数据
        regConn = getConn(tableType="registered")
        regC = regConn.cursor()
        regSql = '''
        select CARD_NO, NAME, RELA_PHONE, ADDRESS, IDENNO, REG_DATE from FIN_OPR_REGISTER where REG_DATE = {}
        '''.format(today)
        regC.execute(regSql)
        regData = regC.fetchall()

        # 已经就诊, 等待缴费的当天数据
        chargeConn = getConn(tableType="charge")
        chargeC = chargeConn.cursor()
        chargeSql = '''
        select CARD_NO, 诊断结束时间 from 诊断表 where 诊断结束时间 = {}
        '''.format(today)
        chargeC.execute(chargeSql)
        chargeData = chargeC.fetchall()

        # 已经缴费, 等待检查或取药或检验的当天数据

        return JsonResponse(regData)
