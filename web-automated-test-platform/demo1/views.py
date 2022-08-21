from django.shortcuts import render, HttpResponse, redirect
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import subprocess
import requests
import os, re, speedtest, threading, time

# -------------------------------主界面-------------------------------
def page(request):
    with open('demo1/templates/data.txt', mode='r', encoding='utf-8') as f:
        text = f.read()
    # request 是一个对象，里面封装了用户发过来的所有数据
    if request.method == "GET":
        # resps = requests.get('resp = requests.get(url, headers=headers)')
        # print(resps)
        return render(request, "page.html", {'text': text})

    # 如果是POST请求 获取用户数据
    url = request.POST.get("url")
    cookie = request.POST.get("ck")
    ua = request.POST.get("ua")
    charset = request.POST.get("charset")
    test = request.POST.get("test")
    host = request.POST.get("host")
    checkbox = request.POST.get("checkbox") # 框架选择
    text = request.POST.get("text")
    button = request.POST.get("bt") # 运行按钮
    submit = request.POST.get("submit")
    file_upload = request.POST.get("checkbox_file") # 文件
    network_speed_test = request.POST.get("network_speed_test") # 网速测试
    thread_test_only = request.POST.get("thread_test_only") # 压力测试
    # 请求头
    headers = { }

    if cookie != '':
        headers['Cookie'] = cookie
    if ua != '':
        headers['User-Agent'] = ua
    if host != '':
        headers['Host'] = host
    # 编码
    if charset == '':
        charset = 'utf-8'

    # -------------------------------URL批量测试-------------------------------
    if file_upload == 'file_up':
        try:
            # 接收文件
            file = request.FILES.get('file')
            # 存储
            path = default_storage.save('demo1/templates/'+file.name,ContentFile(file.read()))
            # 以列表形式读取
            with open(path, mode='r', encoding='utf-8') as f:
                url_txt = f.readlines()
            # 正则匹配
            pattern = r'(http(.*?)://(.+))'
            # 初始化列表
            times = ['Test results:<br><br>']
            # 将测试结果插入列表
            for i in url_txt:
                match = re.search(pattern, i)
                if match:
                    # print(match.group())
                    try:
                        resp = requests.get(match.group())
                        time = float((resp.elapsed.seconds * 1000) + (resp.elapsed.microseconds / 1000))
                        times.append(match.group())
                        times.append('<br>----------------------------------------------------')
                        times.append(time)
                        times.append('ms<br>')
                    except:
                        times.append(match.group())
                        times.append('<br>----------------------------------------------------')
                        times.append('error<br>')
            os.remove(path)
            # print(times)
            return HttpResponse(times)
        except:
            return HttpResponse('error')

   # -------------------------------网速测试-------------------------------
    if network_speed_test == 'speed':
        network_speed_test = speedtest.Speedtest()
        speed = []
        # 下载速度
        download_speed = network_speed_test.download()
        if download_speed > 1024 * 1024:
            download_speed = round(network_speed_test.download() / 1024 / 1024, 3)
            print("下载速度：" + str(download_speed) + "Mb/s")
            speed.append('下载速度：' + str(download_speed) + "Mb/s<br>")
        elif download_speed > 1024:
            download_speed = round(network_speed_test.download() / 1024, 3)
            print("下载速度：" + str(download_speed) + "Kb/s")
            speed.append('下载速度：' + str(download_speed) + "Kb/s<br>")
        else:
            download_speed = round(download_speed, 3)
            print("下载速度：" + str(download_speed) + "b/s")
            speed.append('下载速度：' + str(download_speed) + "b/s<br>")

        # 上传速度
        upload_speed = network_speed_test.upload()
        if upload_speed > 1024 * 1024:
            upload_speed = round(network_speed_test.upload() / 1024 / 1024, 3)
            print("上传速度：" + str(upload_speed) + " Mb/s")
            speed.append('上传速度：' + str(upload_speed) + "Mb/s<br>")
        elif upload_speed > 1024:
            upload_speed = round(network_speed_test.upload() / 1024, 3)
            print("上传速度：" + str(upload_speed) + " Kb/s")
            speed.append('上传速度：' + str(upload_speed) + "Kb/s<br>")
        else:
            upload_speed = round(upload_speed, 3)
            print("上传速度：" + str(upload_speed) + " b/s")
            speed.append('上传速度：' + str(upload_speed) + "b/s<br>")
        return HttpResponse(speed)

    # 判断url是否存在 、 selenium模式
    if url != '' and button != 'bt':
        resp = requests.get(url, headers=headers).content.decode(charset)
        return HttpResponse(resp)

    # selenium测试 -- 通道二
    if checkbox == 'only':
        with open('demo1/templates/index.py', mode='w', encoding=charset) as f:
            f.write(text)
        # subprocess.check_output(['python', 'demo1/templates/index.py'], encoding='utf-8')
        return redirect('http://127.0.0.1:5000/index')

    # -------------------------------压力测试redirect-------------------------------
    if thread_test_only == 'thread_test_only':
        return redirect('http://127.0.0.1:8000/thread/')

    # -------------------------------在线编译器-------------------------------
    if checkbox != 'only':
        with open('demo1/templates/index.py', mode='w', encoding='utf-8') as f:
            f.write(text)
        try:
            text2 = subprocess.check_output(['python', 'demo1/templates/index.py'], encoding='utf-8')
        except:
            text2 = subprocess.check_output(['python', 'demo1/templates/index.py'], encoding='gbk')
        return render(request, 'page.html', {'text2': text2, 'text': text})

# -------------------------------登录界面-------------------------------
def login(request):
    if request.method == "GET":
        return render(request, "login.html")

    # 如果是POST请求 获取用户数据
    #print(request.POST)
    username = request.POST.get("user")
    password = request.POST.get("pwd")
    if username == 'root' and password == '123':
        # return HttpResponse("登录成功")
        return redirect("http://127.0.0.1:8000/page/")
    return render(request, "login.html", {"error_mag":"用户名或密码错误!"})

# -------------------------------压力测试-------------------------------
# -- 初始化全局变量 --
# 成功
success = 0
# 失败
fail = 0
def thread(request):

    if request.method == 'GET':
        return render(request, 'thread.html')
    # 如果是POST请求 获取用户数据
    url = request.POST.get('url')
    cookie = request.POST.get('ck')
    ua = request.POST.get('ua')
    thread_amout = request.POST.get('thread_amout')

    if thread_amout == '':
         thread_amout = 1
    thread_amout = int(thread_amout)

    # 请求头
    headers = { }
    if cookie != '':
        headers['Cookie'] = cookie
    if ua != '':
        headers['User-Agent'] = ua
    if url == '':
        return HttpResponse('not find url')

    class myThread(threading.Thread):
        def __init__(self, name):
            threading.Thread.__init__(self)
            self.name = name

        def run(self):
            # 调用测试函数
            thread_test()

    def thread_test():
        global success
        global fail
        # resp = requests.get(url, headers=headers)
        try:
            requests.get(url, headers=headers)
            # resp.status_code == 200
            success += 1
        except:
            fail += 1

    # --初始化--

    # 结果输出列表
    test_result = ['测试结果：<br>']

    # 创建新线程列表
    thread_list = []
    for i in range(thread_amout):
        thread_list.append(myThread("Thread"))
    # 启动线程
    global success
    global fail
    success = 0
    fail = 0

    for thread in thread_list:
        thread.start()
    start_time = time.time()  # 开始时间
    for thread in thread_list:
        thread.join()
    end_time = time.time()  # 结束时间


    # 成功率
    success_rate = round(((success / thread_amout) * 100), 3)
    # 总耗时
    sum_time = (end_time - start_time) * 1000

    test_result.append('线程：' + str(thread_amout) + '<br>')
    test_result.append('success：' + str(success) + '<br>')
    test_result.append('fail：' + str(fail) + '<br>')
    test_result.append('成功率：' + str(success_rate) + '%' + '<br>')
    test_result.append('开始时间：' + str(start_time) + 's' + '<br>')
    test_result.append('结束时间：' + str(end_time) + 's' + '<br>')
    test_result.append('总耗时：' + str(sum_time) + 'ms' + '<br>')
    print(success)
    return HttpResponse(test_result)

# -------------------------------测试接口-------------------------------
def test(request):
    if request.method == 'GET':
        return render(request, 'test.html')
    return HttpResponse('POST')






# def index(request):
#     return HttpResponse(data)
#
# def data(request):
#     data = page(request)
#     # views_name = data
#     # return render(request, 'data.html', {'code': '200'})
#     return HttpResponse(data)
#
# def something(request):
#     # request 是一个对象，里面封装了用户发过来的所有数据
#
#     # 1.获取请求方式
#     print(request.method)
#
#     # 2. 获取通过URL传递过来的值
#     print(request.GET)
#
#     # 3. 在请求体中提交数据
#     print(request.POST)
#
#     # 4. 【响应】将字符串内容返回给请求者
#     # return HttpResponse('返回内容')
#
#     # 5.  【响应】读取HTML的内容 + 渲染（替换） -> 返回给用户
#     # return render(request, 'something.html', {'title':'来了'})
#     # 6.  【响应】浏览器重定向
#     return redirect("https://www.baidu.com")
#
#
# def muban(request):
#     return render(request, "muban.html")
