# -*- coding: utf-8 -*-

import requests
import re
import pandas as pd
import numpy as np

from bs4 import BeautifulSoup
from fractions import Fraction
from scrapy.selector import Selector

url = 'http://www.ruled.me/low-carb-chili-lime-meatballs/'

response = requests.get(url)
html = response.content

ingredientList = Selector(text=html).xpath('//table/tbody/tr/td[1]/text()').extract()


#Handling if there is an embedded recipe
table = pd.read_html(html, header=0, index_col=0, flavor="bs4", encoding="utf-8")
table = table[0].dropna(thresh=1)
ingredientColumn = list(table.index.values)

columnHeaders= list(table.columns)
newTable = pd.DataFrame(data=table, index=ingredientColumn, columns=columnHeaders)
newFood = []

# Solution #1 => Find first total and break
# for index, row in newTable.iterrows():
#   if "Totals" in index:
#     print(row[0])
#     break;


totals = list(newTable.loc['Totals'].iloc[0])

print(totals)

#creates a new list of ingredients to parse
#All attempting to split between sub-recipes
# flag = False
# for index, row in newTable.iterrows():        
#     if "serving" in index.lower() and flag==False:
#       flag = True
#       newIndex = newTable.index.get_loc(index)
#     if flag == True and 'serving' not in index.lower():
#       newFood.append(index)

# gotIndex = ""

# for index, item in enumerate(newIndex):
#   if item == True:
#     gotIndex = index
#     break;

# # print(newTable[:gotIndex+1])
# print(newTable[gotIndex+1:])

#Check to see if newFood ends up getting added





# print (ingredientColumn)

# for s 
#   float('nan') != float('nan')





# print(pd.isnull(table).any(1).nonzero()[0])

#gives a weird one dimensional array of row values
# print(np.where(table[0].notnull())[0])

#not possible because this is an object array with more than just integers
# print(table[np.isnan(table[0])])



# for s in ingredientColumn:
#   if "Totals" not in s and "serving" not in s.lower():
#     print("ingredient worked", s)
 



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



