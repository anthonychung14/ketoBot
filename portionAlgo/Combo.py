class Combo:
  def __init__(self, macro):
    self.macros = macro['baseMacros']
    self.totals = macro['totalMacros']
    self.servings = 1

  def calcTotals(self):
    for x in self.totals:
      self.totals[x] += self.macros[x] * self.servings
    return self.totals

  def increment(self):
    self.servings += 1
    self.calcTotals()

  def decrement(self):
    self.servings -= 1
    self.calcTotals()

  
