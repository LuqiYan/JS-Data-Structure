'use strict';
/* Binary Min Heap */

var binaryHeap = function(){
    this.array = [];
};

binaryHeap.prototype.add = function(value){
    this.array.push(value);
    this.bubbleUp(this.array.length - 1, value);
};

binaryHeap.prototype.deleteRoot = function(){
    var lastElement = this.array.pop();
    this.array[0] = lastElement;
    this.bubbleDown(0, lastElement);
};

binaryHeap.prototype.shouldSwap = function(parentValue, childValue){
    if(parentValue > childValue){
        return true;
    }
};

binaryHeap.prototype.bubbleUp = function(childIndex, childValue){
    if(childIndex > 0){
        var parentIndex = Math.floor((childIndex - 1) / 2);
        var parentValue = this.array[parentIndex];

        if(this.shouldSwap(parentValue, childValue)){
            this.array[parentIndex] = childValue;
            this.array[childIndex] = parentValue;
            this.bubbleUp(parentIndex, childValue);
        }
    }
};

binaryHeap.prototype.bubbleDown = function(parentIndex, parentValue){
    if(parentIndex < this.array.length){
        var leftChildIndex = parentIndex * 2 + 1;
        var leftChildValue = this.array[leftChildIndex];
        var rightChildIndex = parentIndex * 2 + 2;
        var rightChildValue = this.array[rightChildIndex];
        var childIndex = (leftChildValue < rightChildValue ? leftChildIndex : rightChildIndex);
        var childValue = (leftChildValue < rightChildValue ? leftChildValue : rightChildValue);

        if(this.shouldSwap(parentValue, childValue)){
            this.array[parentIndex] = childValue;
            this.array[childIndex] = parentValue;
            this.bubbleDown(childIndex, parentValue);
        }
    }
};

/* Test Min Heap */
var tree = new binaryHeap();
tree.add(3);
tree.add(2);
tree.add(21);
tree.add(5);
tree.add(11);
tree.add(1);
tree.add(15);
console.log(tree.array);     // [1, 3, 2, 5, 11, 21, 15]
tree.deleteRoot();
console.log(tree.array);     // [2, 3, 15, 5, 11, 21]