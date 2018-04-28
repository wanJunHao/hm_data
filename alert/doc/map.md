
Description
-----------

get map info
-------------
1. Request URI: alert/areaMap/<method>/<area>
method: mz<门诊> or zy<住院>
area: country<县数据> or town<乡镇数据>
2. Support Format: JSON
3. Request Method: GET
4. Response Data:
# 如果无条件查询, 什么也别发送.
# 支持仅仅发送部分条件
{
	"ks": <科室名字>,
	"bz": <病种名字>,
	"start": <开始时间>,
	"end": <结束时间>
}

date  '2018-01-02'

searchName/<method>/<keyword>
method: ks(科室)/bz(病重)

service mysql start
pwd yizhiyun2017
