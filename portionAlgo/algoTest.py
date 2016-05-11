import unittest

class FirstTest(unittest.TestCase):
  def test(self):
    self.assertEqual(4, 3)

def main():
    unittest.main()

if __name__ == '__main__':
    main()
    