import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Staple import Staple

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises

class StapleTest(unittest.TestCase):    
    def setUp(self):
        macroDict = { 
          'id': 1,
          'baseMacros': {
            'protein': 10,
            'fat': 12,
            'carbs': 15
            },
          'totalMacros': {
            'protein': 0,
            'fat': 0,
            'carbs': 0
          },
          'servings': 1              
        }                
        self.combo = Staple(macroDict)

    def test_servings(self):                                
        assert_equal(self.combo.servings, 1)
        assert_not_equal(2, "Incorrect Value")

    # def test_totalMacros(self):        
    #     assert_equal(self.combo.totals['protein'], 0)
    #     assert_equal(self.combo.totals['fat'], 0)
    #     assert_equal(self.combo.totals['carbs'], 0)

    # def test_adjustServings(self):
    #     self.combo.servings += 1
    #     self.combo.calcTotals()
    #     assert_equal(self.combo.totals['protein'], 20)
    #     assert_equal(self.combo.totals['fat'], 24)
    #     assert_equal(self.combo.totals['carbs'], 30)

    # def test_incrementServings(self):
    #     self.combo.increment()
    #     assert_equal(self.combo.servings, 2)

    # def test_decrementServings(self):
    #     self.combo.decrement()
    #     assert_equal(self.combo.servings, 0)

    # def test_incrementAndCalc(self):
    #     self.combo.increment()
    #     assert_equal(self.combo.totals['protein'], 20)
    #     assert_equal(self.combo.totals['fat'], 24)
    #     assert_equal(self.combo.totals['carbs'], 30)

    # def test_decrementAndCalc(self):
    #     self.combo.decrement()
    #     assert_equal(self.combo.totals['protein'], 0)
    #     assert_equal(self.combo.totals['fat'], 0)
    #     assert_equal(self.combo.totals['carbs'], 0)

    # def test_findsConflict(self):
    #     self.findConflict()
    #     assert_equal(self.findConflict())