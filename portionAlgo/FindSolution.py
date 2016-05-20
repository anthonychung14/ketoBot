from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple
from copy import deepcopy
from itertools import combinations

def FindTenSols(data, target):
  results = []
  comboGen = ComboGenerator(data)
  comboGen.next()
  
  while len(results) < 5:
    if not comboGen.next():
      break;
    Combo = ConvertCombo(comboGen.next())
    solution = IterateStaples(Combo, target)
    totalDiff = 0
    for x in solution.diff:
      totalDiff += solution.diff[x]
    if totalDiff < 10:
      results.append(solution)  
  
  return results

def ComboGenerator(arr):  
 for i in range(len(arr) + 1):
     for combo in map(list, combinations(arr, i)):
        print(combo)
        yield combo

def ConvertCombo(arrayItem):  
  def makeDictionary(item):
    newDict = {}
    newDict['id'] = item['id']
    newDict['baseMacros'] = {
      'protein': item['protein'],
      'fat': item['fat'],
      'carbs': item['carbs']
    }
    newDict['totalMacros'] = {
      'protein': 0,
      'fat': 0,
      'carbs': 0
    }
    return Staple(newDict)

  newStaples = [makeDictionary(item) for item in arrayItem]
  newCombo = Combo(newStaples)
  return newCombo


#Operates on one combo at a time
def IterateStaples(combo, target):        
  bestCombo = []
  bestDiffs = []

  def helper(combo):
    combo.calcTotals()      
    combo.findDiff(target)
    if all(combo.diff[macro] < 2 for macro in combo.diff):                                          
      bestCombo.append(deepcopy(combo))                    
      return bestCombo    

    for staple in combo.staples:                                            
      staple.increment()         
      combo.calcTotals()      
      combo.findDiff(target)    
                
      if combo.findConflict(target):                              
        staple.decrement()        
        combo.calcTotals()                
        combo.findDiff(target)
        combo.adjustConflict(target)
        bestDiffs.append(deepcopy(combo))                                                      
            
      #Optimal solution            
      else:        
        helper(combo)
        staple.decrement()
        combo.calcTotals()
        combo.findDiff(target)
    
    return None

  helper(combo)    
  if not bestCombo:        
    bestDiffs.sort(key=lambda k: k.diff)            
    return bestDiffs[0]

  else:
    print("found the best")
    return bestCombo[0]

def FindSolution(combo, target):
  combo.findDiff(target)
  while not combo.findConflict(target):
    combo.incrementAll()
  combo.adjustConflict(target)
  combo.findDiff(target)        
  return combo