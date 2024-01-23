export default function bfs(
    graph: WeightedAdjacencyMatrix, 
    source: number, 
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q = [source];

    do {
        const curr = q.shift() as number; 

        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];
        for (let i=0; i<adjs.length; ++i) {
            if (adjs[i] === 0 || seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }

        seen[curr] = true;

    } while(q.length > 0);

    // Build the path backwards
    let curr = needle;
    const path: number[] = [];

    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    
    if (path.length > 0) {
        path.push(source);
        return path.reverse();
    }

    return null;
}
