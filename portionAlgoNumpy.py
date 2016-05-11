#Format the data within each of these combos
#For STAPLES. not fridge items
def makeCombos(arr):
  # return (sum([map(list, combinations(arr, i)) for i in range(len(arr) + 1)], []))
  return (sum([map(list, combinations(arr, 3))], []))


def makeComboDictionary(arr):  
  finalResult = []
  for i, combo in enumerate(makeCombos(arr)):
    #transform data into usable matrix form
    #we are within each combo of ordered dicts, the next step is to transform them into pfc matrices
    combinationResult = []
    #ideally, these would be generators to save memory, but let's do it brute force first
    
    #iterate through combo orderedDict
    #each staple needs an identifier so I can trace back the item information
    for j, staple in enumerate(combo):            
      mPro = []
      mFat = []
      mCarb = []
      for key, value in staple.iteritems():        
        if key == "protein":
          mPro.append(value)
        elif key == "fat":
          mFat.append(value)
        elif key == "carbs":
          mCarb.append(value)
        elif key == "net_carb":
          mCarb.append(value)
        elif key == "id":
          id = value
        elif key == "r":
          id = value
      combinationResult.append({id: mPro + mFat + mCarb})
    finalResult.append(combinationResult)
  return finalResult;