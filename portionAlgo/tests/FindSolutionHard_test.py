import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple

from .testDataHard import fridgeCombos, fridgeData, testTarget
from portionAlgo.FindSolution import FindSolution, IterateStaples, ConvertCombo, FindTenSols

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises
from nose.tools import ok_

class SolutionTest_LiveData(unittest.TestCase):
  def test_generatesComboInstances(self):
    newData= ConvertCombo(fridgeCombos.next())
    assert_equal(newData.diff['protein'], 0)
    
  def test_generatorOutputsCombo(self):
    fridgeCombos.next()
    test = []
    for x in range(4):      
      test.append(ConvertCombo(fridgeCombos.next()))
    assert_equal(len(test), 4)

  def test_operatesOnGeneratedCombo(self):
    fridgeCombos.next()
    
    result = IterateStaples(ConvertCombo(fridgeCombos.next()), testTarget)    
    for x in result.staples:
      print(x.servings)
    assert_equal(result.diff['protein'], 15)

  def test_operatesOnCombosToFind10(self):
    fridgeCombos.next()
    assert_equal(len(FindTenSols(fridgeData, testTarget)), 10)

