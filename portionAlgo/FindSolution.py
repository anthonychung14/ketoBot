from copy import deepcopy
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
      elif all(combo.diff[macro] < 2 for macro in combo.diff):                                          
        bestCombo.append(deepcopy(combo))                    
        return bestCombo;
      
      else:        
        helper(combo)
        staple.decrement()
        combo.calcTotals()
        combo.findDiff(target)

  helper(combo)    
  if not bestCombo:        
    bestDiffs.sort(key=lambda k: k.diff)    
    return bestDiffs[0]

  else:
    return bestCombo[0]

  
  




  
  #if the diff is negligible (w/in 1%), #return that config

  #check to see if the diff between any macro then changed
    #if not, you know that a solution is infeasible, return what you have

  #else we'll start iterating over the individual staple components
