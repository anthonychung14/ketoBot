import csv
import glob
import os
import psycopg2

# Connect to DB
con = None
con = psycopg2.connect(database='keto', user='ACKeepingitCoo', host='localhost')
cur = con.cursor()

# cur.execute('CREATE TABLE SnackDB (Id INTEGER PRIMARY KEY, Name VARCHAR(20), Calories INT, Fats INT, Carbs INT, Fiber INT, NetCarbs INT, Protein INT, ServingSize INT)')
# con.commit();

copy_sql = """
           COPY snackdb FROM stdin WITH CSV HEADER
           DELIMITER as ','
           """

with open('./testSnack.csv', 'r') as f:
  cur.copy_expert(sql=copy_sql, file=f)
  con.commit();
  cur.close()
