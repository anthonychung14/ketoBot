import csv
import requests
import psycopg2

from bs4 import BeautifulSoup

# Connect to DB
# con = None
# con = psycopg2.connect(database='keto', user='ACKeepingitCoo')
# cur = con.cursor()
# cur.execute('CREATE TABLE Recipe(Id Integer Primary Key, Name VARCHAR(20), Calories INT)')

# con.commit();


url = 'http://www.ruled.me/low-carb-mock-mcgriddle-casserole/'
response = requests.get(url)
html = response.content

listRows=[]

#Extract ingredient amounts and write to file
soup = BeautifulSoup(html, "lxml")
recipe = soup.find('div', attrs={'class': 'entry-content'})
ingredients = recipe.find('table')

for row in ingredients.findAll('tr'):
  listCells = [];
  for cell in row.findAll('td'):
    listCells.append(cell.text)
  listRows.append(listCells)
  
outfile = open("./testRecipe.csv",'w')
writer = csv.writer(outfile)

for row in listRows:
    writer.writerow(row)


