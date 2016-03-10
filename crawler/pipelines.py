# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from ketoBot.models import Recipe, Ingredient

class RecipePipeline(object):
    def process_item(self, item, spider):
        #should save to DB
        recipe = Recipe(recipe_title=item['title'], recipe_picture=item['image'], recipe_date=item['date'], recipe_type=item['recipe_type'])
        recipe.save()
        
        r_fk = Recipe.objects.get(id=recipe.id)        
        for ingredient in item['recipe_ingredients']:
          ingred = Ingredient(recipe_id=r_fk, amount=ingredient[0], measurement=ingredient[1], name=ingredient[2])
          ingred.save()
      

        
