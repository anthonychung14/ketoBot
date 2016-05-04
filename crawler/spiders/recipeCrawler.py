# -*- coding: utf-8 -*-
#Crawls website
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector

from bs4 import BeautifulSoup
import pandas as pd
import requests
import re

#Creates the item.
from crawler.items import RecipeItem

class RecipeCrawlerSpider(CrawlSpider):  
  name = 'ruledMeCrawler'
  allowed_domains = ['ruled.me']  
  start_urls = ['http://www.ruled.me/keto-recipes/dinner/']

  # start_urls= ['http://www.ruled.me/keto-recipes/lunch/']
  # start_urls= ['http://www.ruled.me/']

  rules = (
      #make this 0-9 when you're ready to get all of it
      Rule(LinkExtractor(allow=r'page/[0-9]/'), callback='parse_item', follow=True),
  )

  def parse_item(self, response):
      recipes = Selector(response).xpath('//h2[@class="entry-title"]/a')
      for recipe in recipes:
          url = recipe.xpath('@href').extract()[0]          
          yield scrapy.Request(url, callback=self.parse_recipe)

  def parse_recipe(self, response):      
      #Retrieves all relevant data from ruled.me
      got_data = requests.get(response.url)
      html=got_data.content
      soup = BeautifulSoup(html, 'lxml')

      recipe = RecipeItem()
      #Hard-coded for now. consider parsing the url to get lunch       

      recipe['time'] = "dinner"
      
      #get dataframe from html table.
      table = pd.read_html(html, header=0, index_col=0, flavor="bs4", encoding="utf-8")
      dataframe = [];
      for tab in table:
        dataframe.append(tab)
 
      #get metadata on recipe
      
      recipe['rawTable'] = dataframe

      meta = soup.find('div', attrs={'class': 'entry-content'})
      meta_titleParent = soup.find('div', attrs={'class': 'articleTitle'})
      meta_title = meta_titleParent.find('h1').text
      recipe['title'] = meta_title

      imageParent = soup.findChild('div', attrs={'class': 'postImage_f'})
      image = imageParent.find('img')['src']
      recipe['image_urls'] = [image]

      date_parent = soup.find('div', attrs={'class': 'articleData'})
      date_dirty = date_parent.text
      date_final = date_dirty.split('on ')[1]
      recipe['date'] = date_final
      recipe['ingredients'] = []

      yield recipe

