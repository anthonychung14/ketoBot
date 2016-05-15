import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple
from portionAlgo.FindSolution import FindSolution, IterateStaples
from .testDataMed import testTarget, testTarget2, macroDict, macroDict2, macroDict3

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises

class SolutionTest_ComboAdjDown(unittest.TestCase):
    def setUp(self):
        staple1 = Staple(macroDict)
        staple2 = Staple(macroDict2)
        staple3 = Staple(macroDict3)
        stapleList = [staple1, staple2, staple3]    
        self.combo = Combo(stapleList)        

    def test_adjustsServingAfterConflict(self):        
        FindSolution(self.combo, testTarget)
        for staple in self.combo.staples:
           assert_equal(staple.servings, 1) 
    
    def test_hasDiffAfterConflict(self):                
        FindSolution(self.combo, testTarget)
        protDiff = self.combo.diff['protein']
        fatDiff = self.combo.diff['fat']
        carbDiff = self.combo.diff['carbs']
        assert_equal(protDiff, 22)
        assert_equal(fatDiff, 16)
        assert_equal(carbDiff, 7)

    def test_iteratesThroughStaples(self):
        BestCombo = IterateStaples(self.combo, testTarget)
        
        assert_equal(BestCombo.staples[0].servings, 1)
        assert_equal(BestCombo.staples[1].servings, 3)
        assert_equal(BestCombo.staples[2].servings, 4)

    def test_givesBestPathCombo(self):
        NextCombo = IterateStaples(self.combo, testTarget)        
        print(NextCombo.diff)
        for x in NextCombo.staples:
            print(x.servings)
        assert_equal(NextCombo.totals['protein'], 34)    

    # def test_trueRecursion(self):
    #     BestCombo = IterateFoods(self.combo, testTarget)
    #     print(BestCombo.totals, testTarget)

    #     assert_equal(BestCombo.staples[0].servings, 1)
    #     assert_equal(BestCombo.staples[1].servings, 3)
    #     assert_equal(BestCombo.staples[2].servings, 4)

    # def test_trueRecursionPath(self):
    #     BestCombo = IterateFoods(self.combo, testTarget2)        
    #     for x in BestCombo.staples:
    #         print(x.servings)
        
    #     assert_equal(BestCombo.totals['protein'], 34)

        


                
