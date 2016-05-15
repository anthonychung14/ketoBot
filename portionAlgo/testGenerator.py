from itertools import combinations

def makeCombos(arr):
  yield (sum([map(list, combinations(arr, i)) for i in range(len(arr) + 1)], []))

def makeComboGenerator(arr):  
 for i in range(len(arr) + 1):
     for combo in map(list, combinations(arr, i)):
        yield combo


generate = makeComboGenerator([1,2,3,4,5])

print(generate.next())
print(generate.next())
print(generate.next())
print(generate.next())
