from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple

from copy import deepcopy
from sets import Set
import operator

def FindSolution(combo, target):
  combo.findDiff(target)
  while not combo.findConflict(target):
    combo.incrementAll()
  combo.adjustConflict(target)
  combo.findDiff(target)        
  return combo

def IterateStaples(combo, target):        
  bestCombo = []
  bestDiffs = []

  def helper(combo):
    combo.calcTotals()      
    combo.findDiff(target)
    if all(combo.diff[macro] < 2 for macro in combo.diff):                                          
      print(combo.totals)
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


def ComboGenerator(arr):  
 for i in range(len(arr) + 1):
     for combo in map(list, combinations(arr, i)):
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


def IterateFoods(combo, target):        
    for staple in combo.staples:
      staple.increment()                    
      combo.calcTotals()      
      combo.findDiff(target)

      if not combo.findConflict(target):  
          result = IterateStaples(combo, target)               
          if result is not None:                    
              return result

      staple.decrement()  
      combo.calcTotals()     
      combo.findDiff(target) 

    if all(combo.diff[macro] < 2 for macro in combo.diff):                   
      return combo 

    return None