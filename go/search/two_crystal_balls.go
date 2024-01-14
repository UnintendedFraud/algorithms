package main

import (
	"math"
)

func TwoCrystalBalls(breaks []bool) int {
    l := float64(len(breaks))
    sqrtLen := int(math.Floor(math.Sqrt(l)))
    i := sqrtLen

    for i = int(sqrtLen); i<len(breaks); i += int(sqrtLen) {
        if breaks[i] {
            break
        }
    }

    start := int(i - sqrtLen)

    for j:=start; j<=i && j<int(l); j++ {
        if breaks[j] {
            return j
        }
    }

    return -1
}
