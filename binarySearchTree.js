'use strict';
/* binary tree */
/* reference: https://github.com/nzakas/computer-science-in-javascript/blob/master/data-structures/binary-search-tree/binary-search-tree.js */
var binarySearchTree = function() {
    this.root = null;
};

binarySearchTree.prototype.contains = function(value){
    var found = false;
    var current = this.root;
    while(!found && current){
        if(value < current.value){
            current = current.left;
        }
        else if(value > current.value){
            current = current.right;
        }
        else{
            found = true;
        }
    }
    return found;
};

binarySearchTree.prototype.add = function(value){
    var new_node = {value: value, left: null, right: null};
    var current;
    if(this.root === null){
        this.root = new_node;
    }
    else{
        current = this.root;
        while(true){
            if(value < current.value){
                if(current.left === null){
                    current.left = new_node;
                    break;
                }
                else{
                    current = current.left;
                }
            }
            else if(value > current.value){
                if(current.right === null){
                    current.right = new_node;
                    break;
                }
                else{
                    current = current.right;
                }
            }
            else{
                break;
            }
        }
    }
};

binarySearchTree.prototype.delete = function(value){
    var found = false;
    var parent = null;
    var current = this.root;
    var childCount, replacement, replacementParent;
    while(!found && current){
        if(value < current.value){
            parent = current;
            current = current.left;
        }
        else if(value > current.value){
            parent = current;
            current = current.right;
        }
        else{
            found = true;
        }
    }
    if(found){
        childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
        if(current === this.root){
            switch (childCount){
                case 0:
                    this.root = null;
                    break;
                case 1:
                    this.root = (current.left === null ? current.right : current.left);
                    break;
                case 2:
                    replacement = this.root.left;
                    while(replacement.right !== null){
                        replacementParent = replacement;
                        replacement = replacement.right;
                    }
                    if(replacementParent !== null){
                        replacementParent.right = replacement.left;
                        replacement.right = this.root.right;
                        replacement.left = this.root.left;
                    }
                    else{
                        replacement.right = this.root.right;
                    }
                    this.root = replacement;
            }
        }
        else{
            switch (childCount) {
                case 0:
                    if(current.value < parent.value){
                        parent.left = null;
                    }
                    else{
                        parent.right = null;
                    }
                    break;
                case 1:
                    if(current.value < parent.value){
                        parent.left = (current.left === null ? current.right : current.left);
                    }
                    else{
                        parent.right = (current.left === null ? current.right : current.left);
                    }
                    break;

                case 2:
                    replacement = current.left;
                    replacementParent = current;
                    while(replacement.right !== null){
                        replacementParent = replacement;
                        replacement = replacement.right;
                    }
                    replacementParent.right = replacement.left;
                    replacement.right = current.right;
                    replacement.left = current.left;
                    if(current.value < parent.value) {
                        parent.left = replacement;
                    }
                    else{
                        parent.right = replacement;
                    }
            }
        }
    }

};

binarySearchTree.prototype.traverse = function(process){

    /* Depth-First: In-Order */
    function inOrder(node){
        if(node){
            if(node.left !== null){
                inOrder(node.left);
            }
            process.call(this, node);
            if(node.right !== null){
                inOrder(node.right);
            }
        }
    }
    inOrder(this.root);

    /* Depth-First: Pre-Order */
    function preOrder(node){
        if(node){
            process.call(this, node);
            if(node.left !== null){
                preOrder(node.left);
            }
            if(node.right !== null){
                preOrder(node.right);
            }
        }
    }
    //preOrder(this.root);


    /* Depth-First: Post-Order */
    function postOrder(node){
        if(node){
            if(node.left !== null){
                postOrder(node.left);
            }
            if(node.right !== null){
                postOrder(node.right);
            }
            process.call(this, node);
        }
    }
    //postOrder(this.root);
};

binarySearchTree.prototype.size = function(){
    var length = 0;
    this.traverse(function(){
        length++;
    });
    return length;
};

binarySearchTree.prototype.toArray = function(){
    var result = [];
    this.traverse(function(node){
        result.push(node.value);
    });
    return result;
};

binarySearchTree.prototype.toString = function(){
    return this.toArray().toString();
};


/* Test inOrder*/
var tree = new binarySearchTree();
tree.add(3);
tree.add(2);
tree.add(21);
tree.add(5);
tree.add(11);
tree.add(1);
tree.add(15);
console.log(tree.size());                       // 7
console.log(tree.toArray());                    // [1, 2, 3, 5, 11, 15, 21]
console.log(tree.toString());                   // 1,2,3,5,11,15,21
console.log(tree.contains(11));                 // true
console.log(tree.root);                         // Object {value: 3, left: Object, right: Object}
console.log(tree.root.left);                    // Object {value: 2, left: Object, right: null}
console.log(tree.root.left.left);               // Object {value: 1, left: null, right: null}
console.log(tree.root.right);                   // Object {value: 21, left: Object, right: null}
console.log(tree.root.right.left);              // Object {value: 5, left: null, right: Object}
console.log(tree.root.right.left.right);        // Object {value: 11, left: null, right: Object}
console.log(tree.root.right.left.right.right);  // Object {value: 15, left: null, right: null}

tree.delete(11);
console.log(tree.toArray());                    // [1, 2, 3, 5, 15, 21]
console.log(tree.contains(11));                 // false
