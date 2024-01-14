package main

import "testing"

type BExample struct {
    name string
    haystack []int
    needle int
    expected int
}

func Test_BinarySearch(t *testing.T) {
    var examples = []BExample{
        {
            name:"does contain",
            haystack: []int{2, 3, 4, 5, 6},
            needle: 3,
            expected: 1,
        },
        {
            name:"does not contain",
            haystack: []int{2, 3, 4},
            needle: 7,
            expected: -1,
        },
        {
            name:"beginning of slice",
            haystack: []int{2, 3, 4},
            needle: 2,
            expected: 0,
        },
        {
            name:"end of slice",
            haystack: []int{2, 3, 4},
            needle: 4,
            expected: 2,
        },
    }

    for _, ex := range examples {
        result := BinarySearch(ex.haystack, ex.needle)

        if result != ex.expected {
            t.Errorf(
                "%s - Haystack [%+v], Needle [%d], expected [%d] but got [%d]",
                ex.name,
                ex.haystack,
                ex.needle,
                ex.expected,
                result,
            )
        }
    }
}

