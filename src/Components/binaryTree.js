import RoundRobin from "./RoundRobin";

class BinaryTree {
  constructor() {
    this.tree = [];
    this.n = 0;
  }

  swap(index, parent) {
    let temp = this.tree[index];
    this.tree[index] = this.tree[parent];
    this.tree[parent] = temp;
  }
  heapifyUsingBurstTime(tree, index) {
    let parent = Math.floor((index - 1) / 2);

    if (tree[index].burstTime < tree[parent].burstTime) {
      this.swap(index, parent);
      index = parent;
      if (index == 0) return;
      else this.heapifyUsingBurstTime(tree, index);
    } else if (tree[index].burstTime == tree[parent].burstTime) {
      if (tree[index].arrivalTime < tree[parent].arrivalTime) {
        this.swap(index, parent);
        index = parent;
        if (index == 0) return;
        else this.heapifyUsingBurstTime(tree, index);
      }
    } else return;
  }
  heapifyUsingArrivalTime(tree, index) {
    let parent = Math.floor((index - 1) / 2);
    if (tree[index].arrivalTime < tree[parent].arrivalTime) {
      this.swap(index, parent);
      index = parent;
      if (index == 0) return;
      else this.heapifyUsingBurstTime(tree, index);
    } else return;
  }

  heapifyUsingPriority(tree, index) {
    let parent = Math.floor((index - 1) / 2);
    if (tree[index].priority < tree[parent].priority) {
      this.swap(index, parent);
      index = parent;
      if (index == 0) return;
      else this.heapifyUsingPriority(tree, index);
    } else if (tree[index].priority == tree[parent].priority) {
      if (tree[index].arrivalTime < tree[parent].arrivalTime) {
        this.swap(index, parent);
        index = parent;
        if (index == 0) return;
        else this.heapifyUsingPriority(tree, index);
      }
    } else return;
  }

  siftdownUsingBurstTime(tree, index) {
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let child;
    if (leftChild >= this.n) return;
    let smallest = tree[leftChild];

    child = leftChild;
    if (rightChild < this.n) {
      if (smallest.burstTime > tree[rightChild].burstTime) {
        smallest = tree[rightChild];
        child = rightChild;
      } else if (smallest.burstTime == tree[rightChild.burstTime]) {
        if (smallest.arrivalTime > tree[rightChild].arrivalTime) {
          smallest = tree[rightChild];
          child = rightChild;
        }
      }
    }

    if (tree[index].burstTime < smallest.burstTime) {
      this.swap(index, child);
    } else if (tree[index].burstTime == smallest.burstTime) {
      if (tree[index].arrivalTime > smallest.arrivalTime) {
        this.swap(index, child);
      }
    }
    index = child;
    this.siftdownUsingBurstTime(tree, index);
  }
  siftdownUsingArrivalTime(tree, index) {
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let child;
    if (leftChild >= this.n) return;
    let smallest = tree[leftChild];

    child = leftChild;
    if (rightChild < this.n) {
      if (smallest.arrivalTime > tree[rightChild].arrivalTime) {
        smallest = tree[rightChild];
        child = rightChild;
      }
    }

    if (tree[index].arrivalTime < smallest.arrivalTime) {
      this.swap(index, child);
    }
    index = child;
    this.siftdownUsingArrivalTime(tree, index);
  }
  siftdownUsingPriority(tree, index) {
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let child;
    if (leftChild >= this.n) return;
    let smallest = tree[leftChild];

    child = leftChild;
    if (rightChild < this.n) {
      if (smallest.priority > tree[rightChild].priority) {
        smallest = tree[rightChild];
        child = rightChild;
      } else if (smallest.priority == tree[rightChild.priority]) {
        if (smallest.arrivalTime > tree[rightChild].arrivalTime) {
          smallest = tree[rightChild];
          child = rightChild;
        }
      }
    }

    if (tree[index].priority > smallest.priority) {
      this.swap(index, child);
    } else if (tree[index].priority == smallest.priority) {
      if (tree[index].arrivalTime > smallest.arrivalTime) {
        this.swap(index, child);
      }
    }
    index = child;
    this.siftdownUsingPriority(tree, index);
  }

  insertion(item, type, second = 0) {
    item.arrivalTime = parseInt(item.arrivalTime) + parseInt(second);
    this.tree[this.n] = item;
    if (this.n > 0) {
      if (type == "burstTime") {
        this.heapifyUsingBurstTime(this.tree, this.n);
      } else if (type == "arrivalTime" || type == "RoundRobin") {
        this.heapifyUsingArrivalTime(this.tree, this.n);
      } else if (type == "priority") {
        this.heapifyUsingPriority(this.tree, this.n);
      }
    }

    this.n++;
  }
  deletion(type) {
    if (this.n == 0) return null;
    let temp = this.tree[0];
    this.tree[0] = this.tree[this.n - 1];
    if (this.n > 1) {
      if (type == "burstTime") this.siftdownUsingBurstTime(this.tree, 0);
      else if (type == "arrivalTime")
        this.siftdownUsingArrivalTime(this.tree, 0);
      else if (type == "priority") this.siftdownUsingPriority(this.tree, 0);
    }
    this.n--;
    return temp;
  }
  print() {
    for (let i = 0; i < this.n; i++) {
      console.log(this.tree[i]);
    }
  }
}

export { BinaryTree };
