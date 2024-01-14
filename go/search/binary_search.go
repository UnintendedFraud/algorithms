package main

// assume the haystack is ordered
func BinarySearch(haystack []int, needle int) int {
    var low = 0
    var high = len(haystack)

    for low < high {
        half := low + ((high - low) / 2)
        v := haystack[half]

        if v == needle {
            return half;
        } else if needle > v {
            low = half+1
        } else {
            high = half
        }
        
    }

    return -1;
}

