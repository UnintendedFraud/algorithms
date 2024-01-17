type Node<T> = {
    value: T;
    next?: Node<T>;
}

export default class SinglyLinkedList<T> {
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
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.length-1) {
            return this.append(item);
        }

        if (idx >= this.length) {
            return; // error
        }

        this.length++;

        const previousNode = find_previous_node_at(this.head, idx);
        if (!previousNode) {
            return;
        }

        const newNode = { value: item, next: previousNode?.next }; 
        previousNode.next = newNode;
    }

    append(item: T): void {
        this.length++;

        const node = { value: item, next: undefined };
        if (this.tail) {
            this.tail.next = node;
        }

        this.tail = node;

        if (!this.head) {
            this.head = node;
        }
    }

    remove(item: T): T | undefined {
        if (this.head?.value === item) {
            return this.removeAt(0);
        }

        let previousNode = this.head;

        do {
            previousNode = previousNode?.next;
        } while(previousNode?.next?.value === item);

        if (!previousNode) {
            return;
        }

        this.length--;

        const deleted = previousNode.next?.value;
        previousNode.next = previousNode.next?.next;
        
        return deleted;
    }

    get(idx: number): T | undefined {
        if (idx === 0) {
            return this.head?.value;
        }

        const node = find_node_at(this.head, idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        this.length = Math.max(0, this.length-1);

        if (idx === 0) {
            const v = this.head?.value;
            this.head = this.head?.next;    
            return v;
        }

        const previousNode = find_previous_node_at(this.head, idx);
        if (!previousNode || !previousNode.next) {
            return;
        }

        const deleted = previousNode?.next.value;
        previousNode.next = previousNode.next.next;

        return deleted;
    }
}

function find_node_at<T>(head: Node<T> | undefined, idx: number): Node<T> | undefined {
    let node = head;
    let i = 0;
    do {
        node = node?.next;
        i++;
    } while(i < idx);

    return node; 
}

function find_previous_node_at<T>(head: Node<T> | undefined, idx: number): Node<T> | undefined {
    let node = head;
    let i = 1;
    while(i < idx-1) {
        node = node?.next;
        i++;
    };

    return node; 
}
