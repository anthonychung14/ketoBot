/* SUDO CODE FOR NFOODS

SITUATION: 
1. You've filled your calories with your staples (maybe a recipe)
2. You have 2K - 3K leftover calories to spread out throughout the week

3. Split the leftover by the number of days

Begin recursion

  a. Split on macro (protein, fat, carb) and calculate totals
  
  b. If macroViolate (over), switch serving sizes
    1. decrement the one more responsible for macro violation, increment the other
    2. recalculate calories    
  
  c. if no macroViolate and/or when calories recalculated

  d. find difference between target and calculated
  d2. store resulting calorie total/object outside of function
  
  e. repeat process for fat (choosing from fat-dominant)


What is the purpose of this algorithm really supposed to be?
Press a button and compose a meal plan out of fridge and staple items

Given a set of macros, will output the appropriate portions/servings/choices

Linear Programming => 
1. Minimize carbohydrate intake given a list of items
2. You should still try and find a set of feasible solutions

Now this makes sense!

IF I go down this rabbit hole...

I should try and see if it is a higher leverage
point than trying to program it manually

That should only happen after I am able to finish the docker tutorial

1. Figure out how to deploy docker elasticsearch service
2. Webpack/Django still doesn't work...

There's plenty to do elsewhere while you let this sit.


*/


var test2 = {
  calories: 320,
  fat: 18,
  pro: 27,
  carbs: 21,  
}

var foods2 = [
  {
    id: 1,
    nutri: {
        calories: 80,
        fat: 6,
        pro: 6,
        carbs: 0,
        fiber: 0
    }
  },
  {
    id: 2,
    nutri: {
        calories: 40,
        fat: 0,
        pro: 3,
        carbs: 7,
        fiber: 4
    }
  }
]

function splitEven(target, foods, macro) {  
  //map servings hash
  var servings = foods.reduce(function(prev, curr) {    
    prev[curr['id']] = 1;    
    return prev
  }, {})

  //split calorie target
  var splitCalorie = target.macro/foods.length

  //find serving size for each
  foods.forEach(function(foo) {    
    servings[foo.id] = splitCalorie/foo.nutri.macro,
    servings['macroSplit'] = macro           
  })
  
  return servings;
}

function calculateTotals(servings, foods) {
  //calculate individual totals
  var newServing = foods.map(function(foo) {
    var newMP = {
      id: foo.id,
      nutri: {}
    }    
    for (var key in foo.nutri) {
      newMP.nutri[key] = foo.nutri[key] * servings[foo.id]
    }
    return newMP        
  })
  
  //create tentMP object
  var newTotal = {
    id: 1,
    nutri: {
       calories: 0,
       fat: 0,
       pro: 0,
       carbs: 0,
       fiber: 0
    },
    ingreds: foods.slice(),
    servings: Object.assign({}, servings)
  }
  
  //create newTotals from servings
  newServing.forEach(function(elem) {     
     for (var macro in elem.nutri) {
       newTotal.nutri[macro] += elem.nutri[macro]  
     }
  })

  //should return an object with servings and mutated calories
  return newTotal
}

var serveMap = splitEven(test2, foods2, 'calories')
var mealPlan = calculateTotals(serveMap, foods2)

function adjustCals(target, tentMP) {  
  if (isThereConflict(target, tentMP)) {
    //recursively adjust!
    //will need to recalculate mealplan based on servings object    
    tentMP.servings[1]++
    tentMP.servings[2]--
    console.log("need to adjust")
    return calculateTotals(tentMP.servings, tentMP.ingreds)
          
  }
  else {
    return tentMP.ingreds[0];
  }
}

var adjusted = adjustCals(test2, mealPlan)

console.log(isThereConflict(test2, adjusted))

function isThereConflict(target, tentMP) {        
    for (var key in target) {                
        if (tentMP.nutri[key] > target[key]) {                        
          return {
            type: key,
            diff: tentMP.nutri[key] - target[key]
          }
        }       
    }
    return false
}

//denominator
  function findServings(target, food, macro) {
    var denominator = Math.floor(target[macro]/food[macro])        
    return Object.keys(food).reduce(function(prev, curr) {
        prev[curr] = food[curr] * denominator
        return prev
    }, {})
  }