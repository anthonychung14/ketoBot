def main():
    f("314150265358", 27182)

def f(numbers, target):
    for i in range(1, len(numbers)):
        current = int(numbers[0:i])
        to_end = numbers[i:-1]
        evaluate(0, current, to_end, target, current)

def evaluate(sum, previous, numbers, target, out):
    if len(numbers) == 0:
        if sum + previous == int(target):
            print (str(out) + "=" + str(target))

    else:
        for i in range(1, len(numbers)):
            current = int(numbers[0:i])
            to_end = numbers[i:-1]
            evaluate(sum + previous, int(current), to_end, target, str(out) + "+" + str(current))
            evaluate(sum, previous * int(current), to_end, target, str(out) + "*" + str(current))
            evaluate(sum, previous / int(current), to_end, target, str(out) + "/" + str(current))
            evaluate(sum + previous, -int(current), to_end, target, str(out) + "-" + str(current))

main()