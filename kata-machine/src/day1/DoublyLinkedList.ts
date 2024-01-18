type Node<T> = {
    value: T | undefined;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;

    private head: Node<T> | undefined; 
    private tail: Node<T> | undefined; 

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        this.length++;

        const node = { value: item, next: this.head };

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        } else if (idx === this.length-1) {
            return this.append(item);
        }

        const node = this.get_node_by_idx(idx, this.head);
        if (!node) {
            return;
        }

        this.length++;

        const newNode = { value: item, prev: node.prev, next: node };
        if (node.prev) {
            node.prev.next = newNode;
        }
        node.prev = newNode;
    }

    append(item: T): void {
        if (!this.head) {
            return this.prepend(item);
        }

        const tail = this.get_node_by_idx(this.length-1, this.head); 
        if (!tail) {
            console.log("no tail found");
            return;
        }

        this.length++;

        const node = { value: item, prev: tail };
        tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        const node = this.get_node_by_value(item, this.head);
        if (!node) {
            return undefined;
        }

        this.length--;

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head?.value === item) {
            this.head = node.next;
        }
        if (this.tail?.value === item) {
            this.tail = node.prev;
        }

        const v = node.value;
        node.value = undefined;

        return v;
    }

    get(idx: number): T | undefined {
        return this.get_node_by_idx(idx, this.head)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.get_node_by_idx(idx, this.head);
        if (!node) {
            return undefined;
        }

        this.length--;

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (idx === 0) {
            this.head = node.next;
        }
        if (idx === this.length-1) {
            this.tail = node.prev;
        }

        const v = node.value;
        node.value = undefined;

        return v;
    }

    private get_node_by_idx(idx: number, node: Node<T> | undefined): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        for (let i=0; i<idx ; ++i) {
            node = node?.next;
        }

        return node;
    }

    private get_node_by_value(value: T, node: Node<T> | undefined): Node<T> | undefined {
        for (let i=0; i < this.length; ++i) {
            if (node?.value === value) {
                return node;
            }

            node = node?.next;
        }

        return undefined;
    }
}

