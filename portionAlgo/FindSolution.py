def FindSolution(combo, target):
  combo.findDiff(target)
  while not combo.findConflict(target):
    combo.incrementAll()
  combo.adjustConflict(target)
  combo.findDiff(target)      
  
  if all(combo.diff[macro] % target[macro] < .05 for macro in combo.diff):
    return combo.staples

  
  #if the diff is negligible (w/in 5%), #return that config

  #check to see if the diff between any macro them changed
    #if not, you know that a solution is infeasible, return what you have

  #else we'll start iterating over the individual staple components
