const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function walk(
    maze: string[], 
    wall: string, 
    curr: Point, 
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    if (curr.x < 0 && curr.x >= maze[0].length || curr.y < 0 && curr.y >= maze.length) {
        return false;
    }
 
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i=0; i<directions.length; i++) {
        const y = curr.y + directions[i][0];
        const x = curr.x + directions[i][1];
        const ended = walk(maze, wall, {x, y}, end, seen, path);

        if (ended) {
            return true;
        }
    }

    path.pop();

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i=0; i<maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    const success = walk(maze, wall, start, end, seen, path);

    return success ? path : [];
}
