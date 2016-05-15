#A fully recursive implementation that runs without completion?
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

def FindSolution(combo, target):
  combo.findDiff(target)
  while not combo.findConflict(target):
    combo.incrementAll()
  combo.adjustConflict(target)
  combo.findDiff(target)        
  return combo