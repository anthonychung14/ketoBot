# -*- coding: utf-8 -*-
#Crawls website
import scrapy
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.selector import Selector

from bs4 import BeautifulSoup
import requests
import csv

#Creates the item.
#Django model should be imported here
from crawler.items import RecipeItem

class RecipeCrawlerSpider(CrawlSpider):
  name = 'keto_crawler'
  allowed_domains = ['ruled.me']
  start_urls = ['http://www.ruled.me/keto-recipes/lunch/']

  rules = (
      Rule(LinkExtractor(allow=r'page/[0-9]/'), callback='parse_item', follow=True),
  )

  def parse_item(self, response):
      recipes = Selector(response).xpath('//h2[@class="entry-title"]/a')
      for recipe in recipes:
          url = recipe.xpath('@href').extract()[0]
          yield scrapy.Request(url, callback=self.parse_recipe)

  def parse_recipe(self, response):
      got_data = requests.get(response.url)
      html=got_data.content
      listRows=[]

      #Consider storing this within the Scrapy Item
        #if first column, store in ingredients table (for now)
          #exclude last row of first column
        
        #if first row, first column,
          #store in recipe table

        #next: calories, fat, carbs, fiber, carbs, protein
          #store values with appropriate headers

      soup = BeautifulSoup(html, 'lxml')      
      recipe = soup.find('div', attrs={'class': 'entry-content'})
      ingredients = recipe.find('table')
      for row in ingredients.findAll('tr'):
        listCells = [];
        for cell in row.findAll('td'):
          listCells.append(cell.text.encode('utf-8').strip())
        listRows.append(listCells)
      

    ##Now...you insert each thing into the database somehow
      outfile = open("./testRecipe.csv",'w')
      writer = csv.writer(outfile)

      for row in listRows:
        writer.writerow(row)