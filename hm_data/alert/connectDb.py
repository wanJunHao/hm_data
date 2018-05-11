import MySQLdb


def getC():
    '''
    返回连接游标
    '''
    # if tableType == "his":
    #     aa = cx_Oracle.connect("lchisjk/jklchis@10.10.102.1:1521/eryuan")

    # elif tableType == "lis":
    #     aa = pymssql.connect(host="10.10.102.20:1433", user="lisjk", password="lisjk", database="rmlis6")

    # elif tableType == "pacs":
    #     aa = cx_Oracle.connect("pacsjk/pacsjk@10.10.105.5:1521/ORCL")

    aa = MySQLdb.connect(user="root", password="123.com", host="localhost", port=3306, db="hm", charset="utf8")
    c = aa.cursor()
    return c


def changeTime(s):
    '''
    '''
    m, s = divmod(s.seconds, 60)
    h, m = divmod(m, 60)
    return "%02d:%02d:%02d" % (h, m, s)
