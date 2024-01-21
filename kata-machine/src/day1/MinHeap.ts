export default class MinHeap {
    public length: number;

    private data: number[];
    
    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data.push(value);
        this.length++;
        this.heapifyUp(this.length-1);
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];

        if (rightValue > leftValue && value > leftValue) {
            this.swapValues(idx, leftIdx);
            this.heapifyDown(leftIdx);
        } else if (leftValue > rightValue && value > rightValue) {
            this.swapValues(idx, rightIdx);
            this.heapifyDown(rightIdx);
        }
    }
    
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue > value) {
            this.swapValues(parentIdx, idx);
            return this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx-1)/2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }

    private swapValues(srcIdx: number, destIdx: number): void {
        const tmp = this.data[srcIdx];
        this.data[srcIdx] = this.data[destIdx];
        this.data[destIdx] = tmp;
    }
}
