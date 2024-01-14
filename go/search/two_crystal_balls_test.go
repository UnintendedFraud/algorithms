package main

import "testing"

type TCExample struct {
    name string
    breaks []bool
    expected int
}

func Test_TwoCrystalBalls(t *testing.T) {
    var examples = []TCExample{
        {
            name:"first element",
            breaks: []bool{true, true, true, true, true},
            expected: 0,
        },
        {
            name:"last element",
            breaks: []bool{false, false, false, true},
            expected: 3,
        },
        {
            name:"somewhere in the middle",
            breaks: []bool{false, false, true, true, true, true},
            expected: 2,
        },
        {
            name:"not there",
            breaks: []bool{false, false, false, false, false},
            expected: -1,
        },
    }

    for _, ex := range examples {
        result := TwoCrystalBalls(ex.breaks)

        if result != ex.expected {
            t.Errorf(
                "%s - Breaks [%+v], expected [%d] but got [%d]",
                ex.name,
                ex.breaks,
                ex.expected,
                result,
            )
        }
    }
}


