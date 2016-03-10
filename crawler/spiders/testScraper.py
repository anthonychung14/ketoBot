import requests
import re
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

date_parent = soup.find('div', attrs={'class': 'articleData'})
date = date_parent.text

ingredient_parent = soup.find('div', attrs={'class': 'entry-content'})
ingredient = ingredient_parent.findAll('li', attrs={'class': 'ingredient'})

ingredients = []
finalIngredients = []

for ingred in ingredient:
  ingredients.append(ingred.text)

def split_on_letter(s):    
    item = re.compile("[A-Z][^A-Z]*").search(s)
    quantity = s[:item.start()]
    
    if re.compile("[^\W\d]").search(quantity):
      match = re.compile("[^\W\d]").search(quantity)
      amount = s[:match.start()]
      grocery = s[item.start():]
      measure = " ".join(re.findall("[a-zA-Z]+", s[:item.start()]))
      finalIngredients.append([amount, measure, grocery])
    else:
      finalIngredients.append(["", "", s])

for s in ingredients:
  split_on_letter(s)

print finalIngredients
