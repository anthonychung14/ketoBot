import csv
import pandas as pd
import psycopg2

# Connect to DB
con = None
con = psycopg2.connect(database='keto', user='ACKeepingitCoo', host='localhost')
cur = con.cursor()

sql = "SELECT * from snackdb;"

rows = pd.read_sql_query(sql, con)

matrix = rows.as_matrix

print(matrix)

