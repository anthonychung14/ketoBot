#Med mode -> returns 2 servings per

testTarget = {
  'protein': 34,
  'fat': 23,
  'carbs': 20
}


#Return the best possible in combinations
#Measure best possible by keeping a running tab on "diff"
#Goal is to get diff closest to 0
testTarget2 = {
  'protein': 36,
  'fat': 23,
  'carbs': 20
}

macroDict = { 
  'id': 1,
  'baseMacros': {
    'protein': 3,
    'fat': 0,
    'carbs': 10
    },
  'totalMacros': {
    'protein': 0,
    'fat': 0,
    'carbs': 0
  },
  'servings': 1              
}  

macroDict2 = { 
  'id': 2,
  'baseMacros': {
    'protein': 5,
    'fat': 5,
    'carbs': 2
    },
  'totalMacros': {
    'protein': 0,
    'fat': 0,
    'carbs': 0
  },
  'servings': 1              
}

macroDict3 = { 
  'id': 3,
  'baseMacros': {
    'protein': 4,
    'fat': 2,
    'carbs': 1
    },
  'totalMacros': {
    'protein': 0,
    'fat': 0,
    'carbs': 0
  },
  'servings': 1              
}