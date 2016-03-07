from scrapy import Spider
from scrapy.selector import Selector
from keto.items import RecipeItem

import psycopg2

class RecipeSpider(Spider):
  name = "keto" 
  allowed_domains = ['ruled.me']
  start_urls = ['http://www.ruled.me/keto-recipes/lunch/']

#Goes through website, clicks each link, and then invokes parse_recipe
  def parse(self, response):
    recipes = Selector(response).xpath('//h2[@class="entry-title"]/a')
    for recipe in recipes:
      item = RecipeItem()
      item['recipeName'] = recipe.xpath('text()').extract()[0]
      item['recipeUrl'] = recipe.xpath('@href').extract()[0]
      yield item  

# #Inside each website, extracts the title
#   def parse_recipe(self, response):
    

