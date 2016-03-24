# conda info --envs

import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.selector import HtmlXPathSelector

class KetoSpider(scrapy.Spider):
  name = 'KetoRuled'
  allowed_domains = ['ruled.me']
  start_urls = ['http://www.ruled.me/keto-recipes/lunch/']

  def parse(self, response):
    for href in response.css('.hfeed div a::attr(href)'):
      full_url=response.urljoin(href.extract())
      yield scrapy.Request(full_url, callback=self.parse_recipe)

  def parse_recipe(self, response):
    yield {
      'title': response.css(".articleTitle h1::text").extract()[0]
    }
