import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple
from portionAlgo.FindSolution import FindSolution
from .testData import testTarget, macroDict, macroDict2

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises

class SolutionTest_ComboFit(unittest.TestCase):
    def setUp(self):
        staple1 = Staple(macroDict)
        staple2 = Staple(macroDict2)
        stapleList = [staple1, staple2]    
        self.combo = Combo(stapleList)        
        FindSolution(self.combo, testTarget)

    def test_incrementEasySol(self):        
        for staple in self.combo.staples:                         
            assert_equal(staple.servings, 4)

    def test_returnsTheRightNumericalSolution(self):        
        totals = self.combo.totals
        for macro in totals:
            assert_equal(totals[macro], testTarget[macro])
    
    def test_returnsProperDifference(self):        
        diff = self.combo.diff
        for macro in diff:
            assert_equal(diff[macro], 0)

    def test_returnsStaplesObject(self):
        assert_equal(len(FindSolution(self.combo, testTarget)), 2)


                
