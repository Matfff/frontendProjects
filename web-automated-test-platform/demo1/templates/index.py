# python在线编译器，解析器为python3.10,驱动器为Chrome和firefox

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os,subprocess

driver = webdriver.Chrome()
driver.implicitly_wait(10)
driver.get("http://mh.mtxy.edu.cn/")
time.sleep(3)
driver.get("http://www.baidu.com/")
driver.find_element_by_id("kw").send_keys("selenium自动化测试")
time.sleep(3)
driver.find_element_by_id("su").click()
time.sleep(3)
driver.quit()
print('浏览器调用、对模块调用、点击、输入、页面跳转进行测试')
            
            