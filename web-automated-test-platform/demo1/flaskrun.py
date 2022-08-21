# Time: 2022/5/13 0013 9:42
# -*- coding: utf-8 -*-
# __author__="ZJL"
# import zxby
# from flask import Flask, render_template
# import os,subprocess
# from flask import request


from flask import Flask
import subprocess
from flask import Response
import json

app = Flask(__name__)

@app.route('/index')
def index():
    # 将运行前端返回数据生成的.py文件，将结果返回
    return (subprocess.check_output(['python', 'templates/index.py'], encoding = 'utf-8'))
    # return ('success', os.system('python templates/index.py'))
# 请求错误判断
def Response_error(content):
    resp = Response(content)
    return resp
# 无法找到页面
@app.errorhandler(404)
def page_not_found(error):
    content = json.dumps({"error_code": "404"})
    resp = Response_error(content)
    return resp

if __name__ == '__main__':
    app.run(debug=True)






# @app.route('/run', methods=['POST'])
# def run():
#     if request.method == 'POST' and request.form['code']:
#         code = request.form['code']
#         print(code)
#         jsondata = zxby.main(code)
#         return Response_headers(str(jsondata))


# 请求错误判断
# def Response_error(content):
#     resp = Response(content)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp
