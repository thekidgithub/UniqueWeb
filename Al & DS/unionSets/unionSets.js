const unionButton = document.querySelector('.union');
const findButton = document.querySelector('.find');
let n = prompt("输入规模：");
let parent = [];
initialize(n);

unionButton.addEventListener('click', () => {
    let x = prompt("x:");
    let y = prompt("y:");
    union(x, y);
})
findButton.addEventListener('click', () => {
    let x = prompt("x:");
    alert("the ancestor of x is " + find(x));
})

function initialize(n) {
    for (let i = 0; i < n; i++) parent[i] = i;
}

function find(x) {//递归向上查找
    if (parent[x] == x) return x;
    else return find(parent[x]);
}

function union(x, y) {//合并祖先
    let parx = find(x);
    let pary = find(y);
    parent[parx] = pary;
}

