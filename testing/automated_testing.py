from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
driver = webdriver.Chrome()
driver.get("http://localhost:3000/")

driver.maximize_window()
logen=driver.find_element(By.ID,"Loginbutton")
logen.click()
time.sleep(2)
username=driver.find_element(By.ID,"username")
username.send_keys("jane")
password=driver.find_element(By.ID,"password")
password.send_keys("jane")
login=driver.find_element(By.ID,"submitt")
login.click()
time.sleep(2)
fileo=driver.find_element(By.CSS_SELECTOR,"input[type=file]")
fileo.send_keys("C:/Users/AASHIK/Desktop/project model handeling/1/Our image samples - Copy/powdery_mildew/pm2_change_90.jpg")
time.sleep(2)
driver.find_element(By.CSS_SELECTOR,"button[type=submit]").click()
time.sleep(2)
spans= driver.find_element(By.ID,'Out_put')
p_tags = spans.find_elements(By.TAG_NAME, 'p')
# Print the text from each <p> tag
for p in p_tags:
    print(p.text)
driver.close()