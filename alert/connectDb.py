import MySQLdb


conns = {
    "registered": {
        "user": "root",
        "password": "123.com",
        "db": "uinfo",
        "host": "192.168.3.177",
        "port": 3306
    }
}


def getConn(tableType):
    '''
    返回连接游标
    '''
    conn = conns[tableType]
    user = conn["user"]
    password = conn["password"]
    db = conn["db"]
    host = conn["host"]
    port = conn["port"]
    conn = MySQLdb.connect(user=user, password=password, db=db, host=host, port=port, charset="utf8")
    return conn
