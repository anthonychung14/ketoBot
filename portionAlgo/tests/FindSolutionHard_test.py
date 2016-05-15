import unittest
import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from portionAlgo.Combo import Combo
from portionAlgo.Staple import Staple

from .testDataHard import fridgeCombos, fridgeData
from portionAlgo.FindSolution import FindSolution, IterateStaples, IterateFoods, ConvertCombo

from nose.tools import assert_equal
from nose.tools import assert_not_equal
from nose.tools import assert_raises
from nose.tools import raises
from nose.tools import ok_

class SolutionTest_LiveData(unittest.TestCase):
  def test_generatesComboInstances(self):
    newData= ConvertCombo(fridgeCombos[2])
    print(newData)
    assert_equal(newData.diff['protein'], 0)
    ok_(newData.staples)
    ok_(newData.staples[0])
