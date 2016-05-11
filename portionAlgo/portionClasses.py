macroDict = { 
  'id': 1,
  'baseMacros': {
    'protein': 10,
    'fat': 12,
    'carbs': 15
    },
  'totalMacros': {
    'protein': 0,
    'fat': 0,
    'carbs': 0
  },
  'servings': 1              
}

class Combo:
  def __init__(self, macro):
    self.macros = macro['baseMacros']
    self.totals = macro['totalMacros']
    self.servings = 2

  def calcTotals(self):
    for x in self.totals:
      self.totals[x] += self.macros[x] * self.servings
    return self.totals   
  
class Staple:
  def __init__(self, macro):
    

combo = Combo(macroDict)

print(combo.calcTotals())

