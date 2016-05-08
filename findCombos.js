//creating all permutations to test first

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13]

function findCombos(arr) {
  var results = []
  
  var generateCombo = function(pre, arr) {
    for (var i = 0; i < arr.length; i++) {
      var test = pre.concat(arr[i])
      
      //return the lin.lstsq solution to each.
      /*
        1. translate this code into python
        2. from django's backend, get the data looking like it should from base serving sizes

          pro = [24,19,32]
          fat = [1,33,30]
          carb = [3,6,14]

          A = np.array((pro, fat, carb))
          b = np.array([99,65,23])

          print(np.linalg.lstsq(A, b))


        3. figure out how to put it all in matrix form


      */

      results.push(test);
      generateCombo(test, arr.slice(i+1))
    }
  }

  generateCombo([], arr)
  
  //you should check results now for the legitimacy

  //if not, find the remainder,
  //run through gen combos again, but with the difference

  return results;
}

findCombos(arr)

//now, this just needs to be done with an array of objects

//as this is happening, you should be testing them with numpy