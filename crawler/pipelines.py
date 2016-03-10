# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from ketoBot.models import Recipe, Recipe_Directions

class RecipePipeline(object):
    def process_item(self, item, spider):
        #should save to DB
        recipe = Recipe(recipe_title=item['title'], recipe_picture=item['image'], recipe_date=item['date'], recipe_type=item['recipe_type'])
        recipe.save()

        return recipe
