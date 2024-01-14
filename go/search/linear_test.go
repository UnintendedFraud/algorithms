package main

import "testing"

type Example[T comparable] struct {
    name string
    haystack []T
    needle T
    expected bool
}

func Test_Linear(t *testing.T) {
    var examples = []Example[string]{
        {
            name:"do not contain",
            haystack: []string{"one", "two", "three"},
            needle: "i am not there",
            expected: false,
        },
        {
            name:"does contain",
            haystack: []string{"one", "two", "three"},
            needle: "three",
            expected: true,
        },
    }

    for _, ex := range examples {
        result := LinearSearch(ex.haystack, ex.needle)

        if result != ex.expected {
            t.Errorf(
                "%s - Haystack [%+v], Needle [%s], expected [%t] but got [%t]",
                ex.name,
                ex.haystack,
                ex.needle,
                ex.expected,
                result,
            )
        }
    }
}
