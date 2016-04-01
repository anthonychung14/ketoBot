from scrapy import log
import logging

BOT_NAME = 'keto'

SPIDER_MODULES = ['crawler.spiders.recipeCrawler']
NEWSPIDER_MODULE = 'crawler.spiders'

DATABASE = {
  'drivername': 'postgres',
  'host': 'localhost',
  'port': '5432',
  'username': 'ACKeepingitCoo',
  'password': '',
  'database': 'keto'
}

DOWNLOAD_HANDLERS = {'s3': None}

#Django - Scrapy integration

def setup_django_env(path):
    import imp, os

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ketoMon.settings")
    from django.conf import settings

setup_django_env('./ketoMon/')

import sys
sys.path.append('../ketoMon')
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

#Pipeline order + ES integration
ITEM_PIPELINES = {
   'crawler.pipelines.RecipePipeline': 200,
   'crawler.pipelines.IngredientPipeline': 300,
   'crawler.pipelines.RecipeNutritionPipeline': 400,
   'crawler.pipelines.ElasticReducer': 500,
   'scrapyelasticsearch.scrapyelasticsearch.ElasticSearchPipeline': 1000
}

ELASTICSEARCH_SERVER = 'localhost' 
ELASTICSEARCH_PORT = 9200 
ELASTICSEARCH_INDEX = 'recipes'
ELASTICSEARCH_TYPE = 'snacks'
ELASTICSEARCH_UNIQ_KEY = ''
ELASTICSEARCH_LOG_LEVEL= logging.DEBUG


DOWNLOAD_DELAY=3
# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'stack (+http://www.yourdomain.com)'

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS=32

# Configure a delay for requests for the same website (default: 0)
# See http://scrapy.readthedocs.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN=16
#CONCURRENT_REQUESTS_PER_IP=16

# Disable cookies (enabled by default)
#COOKIES_ENABLED=False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED=False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
#}

# Enable or disable spider middlewares
# See http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'stack.middlewares.MyCustomSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'stack.middlewares.MyCustomDownloaderMiddleware': 543,
#}

# Enable or disable extensions
# See http://scrapy.readthedocs.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See http://scrapy.readthedocs.org/en/latest/topics/item-pipeline.html

# Enable and configure the AutoThrottle extension (disabled by default)
# See http://doc.scrapy.org/en/latest/topics/autothrottle.html
# NOTE: AutoThrottle will honour the standard settings for concurrency and delay
#AUTOTHROTTLE_ENABLED=True
# The initial download delay
#AUTOTHROTTLE_START_DELAY=5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY=60
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG=False

# Enable and configure HTTP caching (disabled by default)
# See http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED=True
#HTTPCACHE_EXPIRATION_SECS=0
#HTTPCACHE_DIR='httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES=[]
#HTTPCACHE_STORAGE='scrapy.extensions.httpcache.FilesystemCacheStorage'
