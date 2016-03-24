import requests
import re
import pandas as pd

from bs4 import BeautifulSoup
from fractions import Fraction
from scrapy.selector import Selector

url = 'http://www.ruled.me/seared-skirt-steak-with-cilantro-paste/'

response = requests.get(url)
html = response.content

ingredientList = Selector(text=html).xpath('//table/tbody/tr/td[1]/text()').extract()


table = pd.read_html(html, header=0, index_col=0, flavor="bs4")
x = table[0]

ingredientColumn = list(x.index.values)

for s in ingredientColumn:
  if "Totals" not in s and "serving" not in s.lower():
      print(s)
 



#prints complete row with columns
# print(lastRow.iloc[0])

#get record when row is specified
# print(totals[['Fat (g)']])










#BS4
# soup = BeautifulSoup(html, 'lxml')      

# recipe_body = soup.find('div', attrs={'class': 'hfeed'})
# recipe_titleParent = soup.find('div', attrs={'class': 'articleTitle'})
# recipe_title = recipe_titleParent.find('h1').text

# imageParent = soup.findChild('div', attrs={'class': 'postImage_f'})
# image = imageParent.find('img')['src']

# date_parent = soup.find('div', attrs={'class': 'articleData'})
# date = date_parent.text

# ingredient_parent = soup.find('div', attrs={'class': 'entry-content'})
# ingredient = ingredient_parent.findAll('li', attrs={'class': 'ingredient'})

# ingredients = []
# finalIngredients = []

# for ingred in ingredient:
#   ingredients.append(ingred.text)

# def split_on_letter(s):    
#     item = re.compile("[A-Z][^A-Z]*").search(s)
#     quantity = s[:item.start()]
    
#     if re.compile("[^\W\d]").search(quantity):
#       match = re.compile("[^\W\d]").search(quantity)
#       amount = s[:match.start()]
#       grocery = s[item.start():]
      
      
#       measure = " ".join(re.findall("[a-zA-Z]+", s[:item.start()]))
#       finalIngredients.append([amount, measure, grocery])
#     else:
#       finalIngredients.append(["", "", s])

# for s in ingredients:
#   split_on_letter(s)

#retrieve batch meal information from website.


    

#this means...find the row whose first column === totals, write to DB in the following order
#recipe nutrition should also have the suggested # of servings 

#then, we get the ingredient nutrition and fit that into the DB
#so as soon as you

# def split_on_letter(s):    
#     item = re.compile("[A-Z][^A-Z]*").search(s)
#     quantity = s[:item.start()]
    
#     if re.compile("[^\W\d]").search(quantity):
#       match = re.compile("[^\W\d]").search(quantity)
#       amount = s[:match.start()]
#       grocery = s[item.start():]
#       if '/' not in amount:
#         amount = float(amount)
#       else:
#         amount = round(float(sum(Fraction(s) for s in amount.split())), 2)
#       measure = " ".join(re.findall("[a-zA-Z]+", s[:item.start()]))
#       finalIngredients.append([amount, measure, grocery])
#     else:
#       finalIngredients.append([0, "", s])

# for s in column:
#   split_on_letter(s)

# print (finalIngredients, len(finalIngredients), len(column))



