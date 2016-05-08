from sympy import *

# x, y, z = symbols("x, y, z")
# A = Matrix([76, 96], [297, 9, 24, 12])
# b = Matrix([172,306,36])

import numpy as np

pro = [24,19,32]
fat = [1,33,30]
carb = [3,6,14]

A = np.array((pro, fat, carb))
b = np.array([99,65,23])

print(np.linalg.lstsq(A, b))

#Finds A solution, but not integer solutions






