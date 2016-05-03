# -*- coding: utf-8 -*- 

import re
from ketoBot.models import Recipe, Ingredient, Recipe_Nutrition
from fractions import Fraction
import pandas as pd
from crawler.items import RecipeItem, IngredientData, RecipeElastic
from scrapy.exceptions import DropItem


#Saves metadata on recipe to psql
class RecipePipeline(object):
    def process_item(self, item, spider):        
        #PSQL save                
        baseURL = "https://s3-us-west-1.amazonaws.com/ketobot/"
        recipe = Recipe(title=item['title'], image=baseURL+item['images'][0]['path'], date=item['date'], time=item['time'])
        recipe.save()
        item['id'] = recipe.id          
        item['pk'] = Recipe.objects.get(id = recipe.id)
        item['rawIngredients'] = [];
        item['images'] = baseURL+item['images'][0]['path']

        #item = RecipeItem
        return item
                      
#Parse ingredients from dataframe given a string
class IngredientPipeline(object):
    def process_item(self, item, spider):              
        
        #Create proper dataframe
        rawTable = item['rawTable']
        rawTable = rawTable[0].dropna(thresh=1)

        ingredientColumn = list(rawTable.index.values)
        columnHeaders = list(rawTable.columns)
        item['rawTable'] = pd.DataFrame(data=rawTable, index=ingredientColumn, columns=columnHeaders)
        
        #Iterate through the indices and add to ingredients
        for index, row in item['rawTable'].iterrows():
          ingredList = []
          recipeForeignKey = item['pk']

          #things get messed up here
          #Parse function
          def split_on_letter(s):    
              item = re.compile("[A-Z][^A-Z]*").search(s)
              quantity = s[:item.start()]
              match = re.compile("[^\W\d]").search(quantity)      
              
              if re.compile("[^\W\d]").search(quantity):
                match = re.compile("[^\W\d]").search(quantity)
                amount = s[:match.start()]
                grocery = s[item.start():]                                
                if '/' in amount:                  
                  def tryAmount(amount):
                      try:
                        return round(float(sum(Fraction(s) for s in amount.split())), 2)
                      except ValueError:
                        return amount[0]
                  amount= tryAmount(amount)
                elif '-' in amount:
                  amount = float(amount[0])
                elif '/' not in amount:
                  amount = float(amount)
                else:
                  amount = float(amount[0])
                measure = " ".join(re.findall("[a-zA-Z]+", s[:item.start()]))
                ingredList.append([amount, measure, grocery, s])
              
              else:
                ingredList.append([0.0, "", s, s])

          if "Totals" not in index and "serving" not in index.lower():
              #Adding raw ingredient text to ElasticSearch              
              item['rawIngredients'].append(index)
              split_on_letter(index)          

          # # for s in ingredientColumn:
          #   if "Totals" not in s and "serving" not in s.lower():
          #     #Adding raw ingredient text to ElasticSearch
          #     item['rawIngredients'].append(s)
          #     split_on_letter(s)
            
          for ingred in ingredList:
             #PSQL save             
             ingred = Ingredient(r=recipeForeignKey, amount=ingred[0], measurement=ingred[1], name=ingred[2], rawString=ingred[3])
             ingred.save()
             item['ingredients'].append({'amount': ingred.amount, 'measurement': ingred.measurement, 'name': ingred.name})

        #item = RecipeItem
        return item
        
#Grabs total recipe nutritional data from panda
class RecipeNutritionPipeline(object):
    def process_item(self, item, spider):
      rawTable = item['rawTable']
      totals = rawTable.loc['Totals']

      df_calories = totals.iloc[0]
      df_fat = totals.iloc[1]
      df_carb = totals.iloc[2]
      df_fiber = totals.iloc[3]
      df_net_carb = totals.iloc[4]
      df_protein = totals.iloc[5]

      recipe_foreignKey = item['pk']
      recipeNutrition = Recipe_Nutrition(r=recipe_foreignKey, calories=int(df_calories), fat=int(df_fat), carb=int(df_carb), fiber=int(df_fiber), net_carb=int(df_net_carb), protein=int(df_protein));
      recipeNutrition.save()

      item['recMacros'] ={"calories": df_calories, "fat": df_fat, "carb": df_carb, "fiber": df_fiber, "net_carb": df_net_carb, "protein": df_protein }

      return item

#Compiles item to be sent to ElasticSearch
class ElasticReducer(object):
    def process_item(self, item, spider):
      recipeCopy = item.copy()
      image = recipeCopy['images']
      item = RecipeElastic()


      item['id'] = recipeCopy['id']
      item['title'] = recipeCopy['title']
      item['date'] = recipeCopy['date']
      item['time'] = recipeCopy['time']      
      item['imageURL'] = str(image)
      item['ingredients'] = recipeCopy['rawIngredients']
      item['recMacros'] = recipeCopy['recMacros']
      return item

        
