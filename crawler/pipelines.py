# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from ketoBot.models import Recipe, Recipe_Directions

class RecipePipeLine(object):
    def process_item(self, item, spider):
        #should save to DB
        recipe = Recipe(recipe_title=item['title'], recipe_picture=item['image'])
        recipe.save()


        #Test if it works on lists
        for direction in item['recipe_directions']
          recipe_Directions = Recipe_Directions(direction_step=direction)
          recipe_Directions.save()

        return recipe
