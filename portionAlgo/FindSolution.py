def FindSolution(combo, target):
  combo.findDiff(target)
  while not combo.findConflict(target):
    combo.incrementAll()
  combo.adjustConflict(target)
  combo.findDiff(target)      
  
  if all(combo.diff[macro] % target[macro] < .01 for macro in combo.diff):
    return combo.staples

  return combo

##IterateStaples(combo, combo.diff)  

def IterateStaples(combo, target):
  for staple in combo.staples:    
      staple.increment()
      combo.calcTotals()
      if combo.findConflict(target):
        staple.decrement()
        return
      else:
        IterateStaples(combo, )



  
  #if the diff is negligible (w/in 1%), #return that config

  #check to see if the diff between any macro then changed
    #if not, you know that a solution is infeasible, return what you have

  #else we'll start iterating over the individual staple components
