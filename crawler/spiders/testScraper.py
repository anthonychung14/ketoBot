import requests
from bs4 import BeautifulSoup

url = 'http://www.ruled.me/slow-cooker-keto-chicken-tikka-masala/'

response = requests.get(url)
html = response.content
soup = BeautifulSoup(html, 'lxml')      

recipe_body = soup.find('div', attrs={'class': 'hfeed'})

recipe_titleParent = soup.find('div', attrs={'class': 'articleTitle'})
recipe_title = recipe_titleParent.find('h1').text

imageParent = soup.findChild('div', attrs={'class': 'postImage_f'})
image = imageParent.find('img')['src']

print (recipe_title)
