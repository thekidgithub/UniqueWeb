class treeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}//使用class建树

const root = new treeNode(5);
insert(root, 5, 3, 'L');
insert(root, 3, 2, 'L');
insert(root, 3, 4, 'R');
insert(root, 5, 7, 'R');

const preButton = document.querySelector('.pre');
const inButton = document.querySelector('.in');
const postButton = document.querySelector('.post');
const levelButton = document.querySelector('.level');

preButton.addEventListener('click', () => {
    let choice = prompt("0/1(递归/非递归)");
    if(choice == 0)  
    preOrderTraverse(root);
    if(choice == 1)
    preOrderTraverse1(root); 
});
inButton.addEventListener('click', () => {
    let choice = prompt("0/1(递归/非递归)");
    if(choice == 0)  
    inOrderTraverse(root);
    if(choice == 1)
    inOrderTraverse1(root); 
});
postButton.addEventListener('click', () => {
    let choice = prompt("0/1(递归/非递归)");
    if(choice == 0)  
    postOrderTraverse(root);
    if(choice == 1)
    postOrderTraverse1(root); 
});
levelButton.addEventListener('click', () => { levelOrderTraverse(root); });

function insert(root, parentData, data, LR) {//插入操作，先查找父节点，再根据LR确定是左孩子还是右孩子
    let parentNode = search(root, parentData);
    let newNode = new treeNode(data);
    if (LR == 'L') {
        parentNode.left = newNode;
    }
    if (LR == 'R') {
        parentNode.right = newNode;
    }
}

function search(root, data) {//递归查找结点
    if (root == null) return null;
    else if (root.data == data) return root;
    else {
        let leftChild = search(root.left, data);
        if (leftChild) return leftChild;
        let rightChlid = search(root.right, data);
        if (rightChlid) return rightChlid;
    }
    return null;
}
//递归实现三种遍历
function preOrderTraverse(root) {
    if (root != null) {
        console.log(root.data);
        preOrderTraverse(root.left);
        preOrderTraverse(root.right);
    }
}

function inOrderTraverse(root) {
    if (root != null) {
        inOrderTraverse(root.left);
        console.log(root.data);
        inOrderTraverse(root.right);
    }
}

function postOrderTraverse(root) {
    if (root != null) {
        postOrderTraverse(root.left);
        postOrderTraverse(root.right);
        console.log(root.data);
    }
}

function preOrderTraverse1(root) {//非递归先序，利用辅助栈
    if (root == null) return;
    let stack = [];
    stack.push(root);
    while (stack.length > 0) {
        let top = stack.pop();
        console.log(top.data);
        if (top.right) stack.push(top.right);//先右后左
        if (top.left) stack.push(top.left);
    }
}

function inOrderTraverse1(root) {//非递归中序
    if (root == null) return;
    let stack = [];
    let node = root;
    while (stack.length > 0 || node) {//先找到最左，然后左-根-右遍历
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        console.log(node.data);
        node = node.right;
    }
}

function postOrderTraverse1(root) {//非递归后序
    if (root == null) return;
    let stack = [];
    let pre = null;
    let flag = 0;
    let node = root;
    do {
        while (node) {//先找到最左
            stack.push(node);
            node = node.left
        }
        pre = null;
        flag = 1;
        while (stack.length > 0 && flag) {
            node = stack[stack.length - 1];
            if (node.right == pre) {//判断右结点是否已遍历，如果是，就遍历根
                console.log(node.data);
                pre = stack.pop();
            }
            else {//如果不是，就遍历右结点
                node = node.right;
                flag = 0;
            }
        }
    } while (stack.length > 0)
}

function levelOrderTraverse(root) {//按层遍历，使用辅助队列
    if (root == null) return;
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
        let top = queue.shift();
        console.log(top.data);
        if (top.left) queue.push(top.left);
        if (top.right) queue.push(top.right);
    }
}