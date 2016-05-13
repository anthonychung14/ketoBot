class Combo:
  def __init__(self, staples):
    self.totals = {
      'protein': 0,
      'fat': 0,
      'carbs': 0
    }

    self.diff = {
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

  def findDiff(self, target):
    for macro in self.totals:
      self.diff[macro] = target[macro] - self.totals[macro]
    return self.diff

  def findConflict(self, target):
    self.findDiff(target)
    for macro in self.diff:
      if self.diff[macro] < 0:
        return True;
    return False

  def adjustConflict(self, target):
    if self.findConflict(target):
        self.decrementAll()
        self.findDiff(target)
        self.adjustConflict(target)
    return True;






