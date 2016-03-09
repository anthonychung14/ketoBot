# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field

class RecipeItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = Field()
    image = Field()
    recipe_nutrition= Field()
    recipe_directions= Field()
    recipe_ingredients= Field()
    ingredient_nutrition = Field()


