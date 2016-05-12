class Combo:
  def __init__(self, staples):
    self.totals = {
      'protein': 0,
      'fat': 0,
      'carbs': 0
    }
    self.staples = staples
    self.calcTotals()    

  def calcTotals(self):
    self.totals = dict((k, 0) for k in self.totals)
    for item in self.staples:      
      for x in item.macros:
        self.totals[x] += item.macros[x] * item.servings
    return self.totals

  def incrementAll(self):
    for item in self.staples:
      item.servings += 1  
    self.calcTotals()

  def decrementAll(self):
    for item in self.staples:
      item.servings -= 1  
    self.calcTotals()



