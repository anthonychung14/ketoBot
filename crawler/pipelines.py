import re
from ketoBot.models import Recipe, Ingredient, Recipe_Nutrition
from fractions import Fraction
import pandas as pd
from crawler.items import RecipeItem, IngredientData, RecipeElastic


#Saves metadata on recipe to psql
class RecipePipeline(object):
    def process_item(self, item, spider):        
        #PSQL save
        recipe = Recipe(title=item['title'], image=item['image'], date=item['date'], time=item['time'])
        recipe.save()
        item['id'] = recipe.id          
        item['pk'] = Recipe.objects.get(id = recipe.id)

        #item = RecipeItem
        return item
                      
#Parse ingredients from dataframe given a string
class IngredientPipeline(object):
    def process_item(self, item, spider):              
        for index, dataTable in enumerate(item['rawTable']):        
          ingredList = []
          ingredientColumn = list(dataTable.index.values)
          recipeForeignKey = item['pk']

          #Parse function
          def split_on_letter(s):    
              item = re.compile("[A-Z][^A-Z]*").search(s)
              quantity = s[:item.start()]
              match = re.compile("[^\W\d]").search(quantity)      
              
              if re.compile("[^\W\d]").search(quantity):
                match = re.compile("[^\W\d]").search(quantity)
                amount = s[:match.start()]
                grocery = s[item.start():]
                if '/' not in amount:
                  amount = float(amount)
                else:
                  amount = round(float(sum(Fraction(s) for s in amount.split())), 2)
                measure = " ".join(re.findall("[a-zA-Z]+", s[:item.start()]))
                ingredList.append([amount, measure, grocery])
              else:
                ingredList.append([0.0, "", s])

          for s in ingredientColumn:
            if "Totals" not in s and "serving" not in s.lower():
              #Adding raw ingredient text to ElasticSearch
              item['rawIngredients'].append(s)
              split_on_letter(s)
            
          for ingred in ingredList:
             #PSQL save
             ingred = Ingredient(r=recipeForeignKey, amount=ingred[0], measurement=ingred[1], name=ingred[2])
             ingred.save()
             item['ingredients'].append({'amount': ingred.amount, 'measurement': ingred.measurement, 'name': ingred.name})

          return item
        
#Grabs total recipe nutritional data from panda
class RecipeNutritionPipeline(object):
    def process_item(self, item, spider):
      #iterates through all dataframes
      for table in item['rawTable']:        
        df_calories = table.loc['Totals'][0]
        df_fat = table.loc['Totals'][1]
        df_carb = table.loc['Totals'][2]
        df_fiber = table.loc['Totals'][3]
        df_net_carb = table.loc['Totals'][4]
        df_protein = table.loc['Totals'][5]

        recipe_foreignKey = item['pk']
        recipeNutrition = Recipe_Nutrition(r=recipe_foreignKey, calories=df_calories, fat=df_fat, carb=df_carb, fiber=df_fiber, net_carb=df_net_carb, protein=df_protein);
        recipeNutrition.save()

        item['recMacros'] ={"calories": df_calories, "fat": df_fat, "carb": df_carb, "fiber": df_fiber, "net_carb": df_net_carb, "protein": df_protein }

        return item

#Compiles item to be sent to ElasticSearch
class ElasticReducer(object):
    def process_item(self, item, spider):
      recipeCopy = item.copy()
      item = RecipeElastic()      

      item['id'] = recipeCopy['id']
      item['title'] = recipeCopy['title']
      item['date'] = recipeCopy['date']
      item['time'] = recipeCopy['time']      
      item['ingredients'] = recipeCopy['rawIngredients']
      item['recMacros'] = recipeCopy['recMacros']

      return item



        
