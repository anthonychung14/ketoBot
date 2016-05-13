import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises

testTarget = {
    'protein': 100,
    'fat': 100,
    'carbs': 100
}

class ComboTest(unittest.TestCase):
    def setUp(self):               
        macroDict = { 
          'id': 1,
          'baseMacros': {
            'protein': 1,
            'fat': 2,
            'carbs': 3
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
            'protein': 1,
            'fat': 2,
            'carbs': 3
            },
          'totalMacros': {
            'protein': 0,
            'fat': 0,
            'carbs': 0
          },
          'servings': 1              
        }              

        staple1 = Staple(macroDict)
        staple2 = Staple(macroDict2)
        stapleList = [staple1, staple2]
    
        self.combo = Combo(stapleList)

    def test_totalMacros(self):        
        assert_equal(self.combo.totals['protein'], 2)
        assert_equal(self.combo.totals['fat'], 4)
        assert_equal(self.combo.totals['carbs'], 6)

    def test_incrementServingsAll(self):
        self.combo.incrementAll()
        totalServings = 0
        for x in self.combo.staples:
            totalServings += x.servings
        assert_equal(totalServings, 4)

    def test_decrementServingsAll(self):
        self.combo.decrementAll()
        totalServings = 0
        for x in self.combo.staples:
            totalServings += x.servings
        assert_equal(totalServings, 0)

    def test_incrementAndCalc(self):
        self.combo.incrementAll()
        assert_equal(self.combo.totals['protein'], 4)
        assert_equal(self.combo.totals['fat'], 8)
        assert_equal(self.combo.totals['carbs'], 12)

    def test_decrementAndCalc(self):
        self.combo.decrementAll()
        assert_equal(self.combo.totals['protein'], 0)
        assert_equal(self.combo.totals['fat'], 0)
        assert_equal(self.combo.totals['carbs'], 0)

    def test_findDiff(self):        
        self.combo.findDiff(testTarget)
        assert_equal(self.combo.diff['protein'], 98)
        assert_equal(self.combo.diff['fat'], 96)
        assert_equal(self.combo.diff['carbs'], 94)

    def test_incAllCheckDiff(self):
        self.combo.incrementAll()
        self.combo.findDiff(testTarget)
        assert_equal(self.combo.diff['protein'], 96)
        assert_equal(self.combo.diff['fat'], 92)
        assert_equal(self.combo.diff['carbs'], 88)

    def test_findConflict(self):
        targetConflict = {
            'protein': 0,
            'fat': 0,
            'carbs': 0 
        }
        assert_equal(self.combo.findConflict(targetConflict), True)        
    
    def test_adjustConflict(self):
        targetConflict = {
            'protein': 0,
            'fat': 0,
            'carbs': 0 
        }
        self.combo.adjustConflict(targetConflict)
        assert_equal(self.combo.totals['protein'], 0)
        assert_equal(self.combo.totals['fat'], 0)
        assert_equal(self.combo.totals['carbs'], 0)

    def test_adjustUpAndBackDown(self):
        targetConflict = {
            'protein': 6,
            'fat': 10,
            'carbs': 18 
        }
        self.combo.incrementAll()
        self.combo.incrementAll()
        self.combo.adjustConflict(targetConflict)

        assert_equal(self.combo.totals['protein'], 4)
        assert_equal(self.combo.totals['fat'], 8)
        assert_equal(self.combo.totals['carbs'], 12)
        




