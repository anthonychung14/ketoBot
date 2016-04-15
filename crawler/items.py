from scrapy.item import Item, Field

#This is the meat for the first phase
class RecipeItem(Item):
    #normalMetaData
    id = Field()
    pk = Field()
    title = Field()
    image_urls = Field()
    images = Field()
    date = Field()
    
    #Lunch/Dinner/Breakfast/Snack?
    time = Field()
    
    #array
    directions= Field()    
    
    #array of dictionaries
    ingredients = Field()
    
    #dictionary
    recMacros = Field()

    #rawTable
    rawTable = Field()
    rawIngredients = Field()

#Majority of parsed data lives here
#Post analysis will be done
class IngredientData(Item):
    recipe = Field()
    amount = Field()
    measurement = Field()
    name = Field()
    ingredMacros = Field()

class RecipeElastic(Item):
    id = Field()
    title = Field()
    date = Field()
    
    #Lunch/Dinner/Breakfast/Snack?
    time = Field()
    
    #array
    directions= Field()    
    
    #array of dictionaries
    ingredients = Field()    
    
    #dictionary
    recMacros = Field()
