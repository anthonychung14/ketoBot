# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from ketoBot.models import Recipe

class RecipePipeLine(object):
    def process_item(self, item, spider):
        print(item)
        recipe = Recipe(recipe_title="booya")
        recipe.save()
        return recipe
