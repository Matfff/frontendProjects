# Time: 2022/5/13 0013 15:39
# import os
# os.rename('templates/index.txt','templates/index.py')
# import os, sys, subprocess, tempfile, time
# EXEC = sys.executable
#

# from django.shortcuts import render, HttpResponse, redirect
# f = open("templates/index.py","r")
# data = f.read()
# f.close()
# print(data)
#
# def selenium(data):
#     data
#
# print


# outdata = subprocess.check_output([EXEC, data], stderr=subprocess.STDOUT, timeout=5)
# print('outdata:'+ outdata)

# stderr=subprocess.STDOUT,
# from demo1.flaskrun import index
# index()

# import openpyxl
# from openpyxl import Workbook,load_workbook
# from openpyxl.styles import *
# import warnings
# import re
# import speedtest


# 创建
# with open('templates/url_test.txt', mode='r', encoding='utf-8') as f:
#     url = f.readlines()
# # print(url)
# print('------------------------------------')
# pattern = r'(http(.*?)://(.+))'
# # match = re.search(pattern, url)
# # print(match.group())
# print('------------------------------------')
# for i in url:
#     match = re.search(pattern, i)
#     if match:
#         print(match.group())
# os.remove('templates/url_test.txt')

# # 测网速
# network_speed_test = speedtest.Speedtest()
# # 下载速度
# download_speed = network_speed_test.download()
# if download_speed > 1024 * 1024:
#     download_speed = round(network_speed_test.download() / 1024 / 1024, 3)
#     print("下载速度：" + str(download_speed) + " Mb/s")
# elif download_speed > 1024:
#     download_speed = round(network_speed_test.download() / 1024, 3)
#     print("下载速度：" + str(download_speed) + " Kb/s")
# else:
#     download_speed = round(download_speed, 3)
#     print("下载速度：" + str(download_speed) + " b/s")
#
# # 上传速度
# upload_speed = network_speed_test.upload()
# if upload_speed > 1024 * 1024:
#     upload_speed = round(network_speed_test.upload() / 1024 / 1024, 3)
#     print("上传速度：" + str(upload_speed) + " Mb/s")
# elif upload_speed > 1024:
#     upload_speed = round(network_speed_test.upload() / 1024, 3)
#     print("上传速度：" + str(upload_speed) + " Kb/s")
# else:
#     upload_speed = round(upload_speed, 3)
#     print("上传速度：" + str(upload_speed) + " b/s")

# _thread.start_new_thread ( function, args[, kwargs] )
# import _thread
# import time
#
# # 为线程定义一个函数
# def print_time( threadName, delay):
#    count = 0
#    while count < 5:
#       time.sleep(delay)
#       count += 1
#       print ("%s: %s" % ( threadName, time.ctime(time.time()) ))
#
# # 创建两个线程
# try:
#    _thread.start_new_thread( print_time, ("线程1", 2, ) )
#    _thread.start_new_thread( print_time, ("线程2", 4, ) )
#    print('ok')
# except:
#    print ("Error: 无法启动线程")
#
# while 1:
#    pass



import threading
import time
import requests


# 成功
success = 0
# 失败
fail = 0
# 开始时间



class myThread (threading.Thread):
    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name

    def run(self):
        # 开始线程
        test()




def test():
    global success
    global fail
    resp = requests.get('http://127.0.0.1:8000/test')
    if resp.status_code == 200:
        success += 1
    else:
        fail += 1


#线程数量
thread_amout = 100

print('开始线程')
print('线程数量：',thread_amout)
# 创建新线程列表
thread_list = []
for i in range(thread_amout):
    thread_list.append(myThread("Thread"))
# 启动线程
start_time = time.time()
for thread in thread_list:
    thread.start()
    thread.join()
end_time = time.time()

# 成功率
success_rate = round(((success / thread_amout) * 100), 3)



print('线程结束')
print('success:', success)
print('fail:', fail)
print('成功率：' + str(success_rate) + '%')
print('开始时间：', start_time)
print('结束时间：', end_time)
print('总耗时：', str((end_time - start_time) * 1000), 'ms')


