class Node {
    constructor(value) {
        this.value = value;
        this.childrens = [];
    }
}//结点类，使用childrens数组模拟邻接表

class DAG {//图类
    constructor() {
        this.nodes = new Map();
    }//使用map存储结点

    addNode(value) {//添加结点
        const node = new Node(value);
        this.nodes.set(value, node);
    }

    addEdge(from, to) {//添加边
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        fromNode.childrens.push(toNode);
    }

    DFS(start) {//递归实现DFS
        const startNode = this.nodes.get(start);
        const result = [];
        const visited = new Set();
        traverse(startNode);

        function traverse(node) {
            result.push(node.value);//访问
            visited.add(node);
            for (const child of node.childrens) {//递归遍历
                if (!visited.has(child)) traverse(child);
            }
        }

        return result;
    }

    BFS(start) {//使用队列实现BFS
        const visited = new Set();
        const startNode = this.nodes.get(start);
        const result = [];
        const queue = [];
        queue.push(startNode);
        visited.add(startNode);

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value);
            for (const child of node.childrens) {
                if (!visited.has(child)) {
                    queue.push(child);
                    visited.add(child)
                }
            }
        }

        return result;
    }

    topologicalSort() {//拓扑排序
        const visited = new Set();
        const result = [];
        for (const node of this.nodes.values()) {//遍历每个连通分量
            if (!visited.has(node))
                dfs(node);
        }

        function dfs(node) {
            visited.add(node);
            for (const child of node.childrens) {
                if (!visited.has(child)) dfs(child);
            }
            result.unshift(node.value);//先遍历完，再从后往前插入，保证顺序
        }

        return result;
    }
}

const graph = new DAG();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');

const dfsResult = graph.DFS('A');
console.log(dfsResult);

const bfsResult = graph.BFS('A');
console.log(bfsResult);

const togoResult = graph.topologicalSort();
console.log(togoResult);