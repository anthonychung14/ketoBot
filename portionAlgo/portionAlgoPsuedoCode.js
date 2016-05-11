create test cases for algo given staples

Input
Test #1 => I get three objects in an array as my first argument
Test #2 => I have an array of length 3 as my second argument
Test #3 => I get the right number of things to test
Test #4 => I return an array of new objects


Solution 
Test #1 => when solution doesn't exist, it returns null

1. if no solution exists. what do you try and do? eliminate from results completely

2. solution exists =>

  a. increment all servings across the board
  b. calculate total
  c. check for violations

  d. if violation => 
      1. decrement all by one to reset
      2. get the difference between vectors
      3. generate all possible combos again, but with your current choices
      
      4. iterate through all ingredients.
        a. increment individually
        b. decrement by one serving to reset        