class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
  
    if (!this.root) {
      this.root = newNode;
      return this;
    }
  
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
  
    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }
  

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
  
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }
  

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) return this.findRecursively(val, current.left);
    return this.findRecursively(val, current.right);
  }
  

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];
  
    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
  
    if (this.root) traverse(this.root);
    return visited;
  }
  

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];
  
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }
  
    if (this.root) traverse(this.root);
    return visited;
  }
  

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];
  
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }
  
    if (this.root) traverse(this.root);
    return visited;
  }
  

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const queue = [];
    const visited = [];
  
    if (this.root) queue.push(this.root);
  
    while (queue.length) {
      const node = queue.shift();
      visited.push(node.val);
  
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  
    return visited;
  }
  
  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, current = this.root, parent = null) {
    if (!current) return undefined;
  
    if (val < current.val) {
      return this.remove(val, current.left, current);
    } else if (val > current.val) {
      return this.remove(val, current.right, current);
    } else {
      if (!current.left && !current.right) {
        if (parent) {
          if (parent.left === current) parent.left = null;
          else parent.right = null;
        } else {
          this.root = null;
        }
      } else if (!current.left) {
        if (parent) {
          if (parent.left === current) parent.left = current.right;
          else parent.right = current.right;
        } else {
          this.root = current.right;
        }
      } else if (!current.right) {
        if (parent) {
          if (parent.left === current) parent.left = current.left;
          else parent.right = current.left;
        } else {
          this.root = current.left;
        }
      } else {
        let successor = current.right;
        let successorParent = current;
  
        while (successor.left) {
          successorParent = successor;
          successor = successor.left;
        }
  
        current.val = successor.val;
  
        if (successorParent.left === successor) {
          successorParent.left = successor.right;
        } else {
          successorParent.right = successor.right;
        }
      }
  
      return current;
    }
  }
  

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function height(node) {
      if (!node) return -1;
      return 1 + Math.max(height(node.left), height(node.right));
    }
  
    function checkBalance(node) {
      if (!node) return true;
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
  
      return Math.abs(leftHeight - rightHeight) <= 1 &&
             checkBalance(node.left) &&
             checkBalance(node.right);
    }
  
    return checkBalance(this.root);
  }
  

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
  
    let current = this.root;
    let parent = null;
  
    while (current.right) {
      parent = current;
      current = current.right;
    }
  
    if (current.left) {
      current = current.left;
      while (current.right) current = current.right;
      return current.val;
    }
  
    return parent.val;
  }
  
  dfsInOrderIteratively() {
    const visited = [];
    const stack = [];
    let current = this.root;
  
    while (stack.length > 0 || current !== null) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      visited.push(current.val);
      current = current.right;
    }
  
    return visited;
  }
  
  
}

module.exports = BinarySearchTree;
