
import numpy as tedi
import matplotlib.pyplot as plt
target = "Tedi Susanto"

panjang_target = len(target)

random_number = tedi.random.randint(low = 32, high=126, size=panjang_target)

gen = "".join([chr(item) for item in random_number])

a = ['a','a']
b = ['c','b']
print(tedi.equal(a,b))