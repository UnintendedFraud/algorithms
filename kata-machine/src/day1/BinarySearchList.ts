export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    do {
        const m_idx = Math.floor(low + (high-low)/2);
        const v = haystack[m_idx];

        if (v === needle) {
            return true;
        } else if (needle > v) {
            low = m_idx + 1; 
        } else {
            high = m_idx;
        }
    } while(low < high);

    return false;
}
