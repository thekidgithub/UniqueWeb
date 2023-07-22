const input = document.querySelector('.input');
const seleteAll = document.querySelector('.seleteall');
const todoListEle = document.querySelector('.todolist');
let fragment = document.createDocumentFragment();//使用文档片段优化DOM操作
const TIME = /^(?:[1-9]|1\d|2[0-3]):[0-5]\d/;//正则表达式，匹配开头的时间字符串

class todoList {
    constructor() {//四个属性：事件数组，未完成数，已完成数，显示模式
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        this.undone = localStorage.getItem('undone') ? JSON.parse(localStorage.getItem('undone')) : 0;
        this.done = localStorage.getItem('done') ? JSON.parse(localStorage.getItem('done')) : 0;
        this.mode = localStorage.getItem('mode') ? JSON.parse(localStorage.getItem('mode')) : 1;
    }

    add(innerText) {//添加一个新的代办事项，使用一个对象存储
        console.log(TIME.test(innerText));
        if (TIME.test(innerText)) {//判断是否是定时任务
            const time = TIME.exec(innerText);
            this.todos.push({
                text: innerText,
                done: 0,
                time: time[0]
            });
        }
        else {
            this.todos.push({
                text: innerText,
                done: 0,
                time: ''
            });
        }
        this.undone++;
        this.updateValue();
    }

    remove(i) {//移除一个
        this.todos.splice(i, 1);
        this.updateValue();
    }

    removeDone() {//移除所有已完成事项，使用fliter方法
        this.todos = this.todos.filter((e, i) => {
            return e.done === 0;
        })
        this.done = 0;
        this.updateValue();
    }

    checkAll() {//所有事项设置为已完成
        const checks = document.querySelectorAll('.check');
        const todos = document.querySelectorAll('.todo');
        checks.forEach(e => e.innerHTML = '√');
        todos.forEach((e, i) => {
            if (!this.todos[i].done) {
                e.classList.add('checked');
                this.todos[i].done = 1;
                this.done++;
                this.undone--;
            }
        })
        this.updateValue();
    }

    uncheckAll() {//所有事项设置为未完成
        const checks = document.querySelectorAll('.check');
        const todos = document.querySelectorAll('.todo');
        checks.forEach(e => e.innerHTML = '');
        todos.forEach((e, i) => {
            e.classList.remove('checked');
            this.todos[i].done = 0;
            this.done--;
            this.undone++;
        })
        this.updateValue();
    }

    displayBottom() {//渲染底边栏
        const bottom = document.createElement('div');
        const left = document.createElement('div');
        const changeMode = document.createElement('div');
        const clear = document.createElement('div');
        bottom.classList.add('bottom');
        left.classList.add('left');
        changeMode.classList.add('changemode');
        clear.classList.add('clear');

        left.innerHTML = `${this.undone} items left`;
        for (let k = 1; k <= 3; k++) {//添加三个切换模式的按钮
            const mode = document.createElement('div');
            mode.classList.add('mode');
            switch (k) {
                case 1: mode.innerHTML = 'All'; break;
                case 2: mode.innerHTML = 'Active'; break;
                case 3: mode.innerHTML = 'Completed'; break;
            }
            changeMode.appendChild(mode);
        }
        changeMode.childNodes[this.mode - 1].classList.add('seleted');
        clear.innerHTML = 'Clear Completed';

        bottom.appendChild(left);
        bottom.appendChild(changeMode);
        bottom.appendChild(clear);

        clear.addEventListener('click', () => {//清除所有已完成事项
            this.removeDone();
            this.displaySwitch();
            this.updBottom();
        })

        todoListEle.appendChild(bottom);
        this.updBottom();
        this.updateValue();
    }

    updBottom() {//更新底部栏的显示
        const left = document.querySelector('.left');
        const clear = document.querySelector('.clear');
        const modes = document.querySelector('.changemode');

        modes.addEventListener('click', (e) => {//使用了事件委托
            const mode = e.target;
            const index = Array.from(mode.childNodes).indexOf(mode);
            switch (index) {
                case 0: this.mode = 1; break;
                case 1: this.mode = 2; break;
                case 2: this.mode = 3; break;
            }
            this.displaySwitch();
        })

        left.innerHTML = `${this.undone} items left`
        if (this.done > 0) clear.classList.add('show');
        else clear.classList.remove('show');

        this.updateValue();
    }

    displaySwitch() {//实时渲染列表，规定数组每改变一次，就刷新一次列表
        todoListEle.innerHTML = '';

        if (this.todos.length > 1)//排序定时任务
            this.sortByTime(this.todos);

        this.todos.forEach((e, i) => {
            const todo = document.createElement('li');
            const check = document.createElement('div');
            const text = document.createElement('div');
            const close = document.createElement('div');
            todo.classList.add('todo');
            check.classList.add('check');
            text.classList.add('text');
            close.classList.add('close');

            if (e.done) {
                todo.classList.add('checked');
                check.innerHTML = '√';
            }
            text.innerHTML = e.text;
            close.innerHTML = 'X';
            todo.appendChild(check);
            todo.appendChild(text);
            todo.appendChild(close);
            todo.draggable = true;
            switch (this.mode) {//判断显示模式
                case 1: {
                    fragment.appendChild(todo);
                    break;
                }
                case 2: {
                    if (!e.done) fragment.appendChild(todo);
                    break;
                }
                case 3: {
                    if (e.done) fragment.appendChild(todo);
                    break;
                }
            }
        })

        todoListEle.appendChild(fragment);
        if (this.undone + this.done > 0) {
            this.displayBottom();
            seleteAll.classList.add('show1');
        }


        this.updateValue();
    }

    sortByTime(arr) {//排序定时任务的函数
        arr.sort(function (a, b) {
            const h1 = a.time[1] === ':' ? Number(a.time[0]) : Number(a.time.slice(0, 2));
            const h2 = b.time[1] === ':' ? Number(b.time[0]) : Number(b.time.slice(0, 2));
            const m1 = a.time[1] === ':' ? Number(a.time.slice(2, 4)) : Number(a.time.slice(3, 5));
            const m2 = b.time[1] === ':' ? Number(b.time.slice(2, 4)) : Number(b.time.slice(3, 5));
            if (h1 === h2) return m1 - m2;
            else return h1 - h2;
        })
        this.updateValue();
    }

    updateValue() {//实现客户端存储
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('done', JSON.stringify(this.done));
        localStorage.setItem('undone', JSON.stringify(this.undone));
        localStorage.setItem('mode', JSON.stringify(this.mode));
    }
}

const myTodoList = new todoList();
myTodoList.displaySwitch();
console.log(myTodoList.todos);
input.addEventListener("keyup", (e) => {//输入
    if (e.key == 'Enter') {
        if (e.target.value.trim() !== '') {
            const TEXT = e.target.value.trim();
            e.target.value = '';
            myTodoList.add(TEXT);
            myTodoList.displaySwitch();
        }
    }
})

seleteAll.addEventListener('click', () => {//输入框左边的小箭头，用来全选/取消全选
    if (myTodoList.undone + myTodoList.done > 0) {
        if (myTodoList.undone > 0) {
            myTodoList.checkAll();
            myTodoList.updBottom();
            seleteAll.classList.remove('show1');
            seleteAll.classList.add('show2');
        }
        else {
            myTodoList.uncheckAll();
            myTodoList.updBottom();
            seleteAll.classList.remove('show2');
            seleteAll.classList.add('show1');
        }
    }
})

todoListEle.addEventListener('click', (event) => {//事件委托
    if (event.target.classList.contains('check')) {
        // alert('aaa');
        const todo = event.target.closest('li');
        const i = Array.from(todoListEle.childNodes).indexOf(todo);
        const e = myTodoList.todos[i];
        const check = todo.childNodes[0];
        e.done = (e.done === 1 ? 0 : 1);
        todo.classList.toggle('checked');
        check.innerHTML = (e.done ? '√' : '');
        myTodoList.done = (e.done ? myTodoList.done + 1 : myTodoList.done - 1);
        myTodoList.undone = (e.done ? myTodoList.undone - 1 : myTodoList.undone + 1);
        myTodoList.updBottom();
    }

    if (event.target.classList.contains('close')) {
        const todo = event.target.closest('li');
        const i = Array.from(todoListEle.childNodes).indexOf(todo);
        const e = myTodoList.todos[i];
        console.log(e);
        if (e.done)
            myTodoList.done--;
        else
            myTodoList.undone--;
        myTodoList.remove(i);
        myTodoList.displaySwitch();
        myTodoList.updBottom();
    }
})

todoListEle.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('text')) {
        const todo = event.target.closest('li');
        const i = Array.from(todoListEle.childNodes).indexOf(todo);
        const e = myTodoList.todos[i];
        const text = todo.childNodes[1];
        event.preventDefault();
        const inputAbove = document.createElement('input');
        inputAbove.classList.add('inputabove');
        inputAbove.value = text.innerHTML;
        inputAbove.addEventListener('keyup', (e2) => {
            if (e2.key == 'Enter') {
                if (e2.target.value.trim() != '') {
                    text.innerHTML = e2.target.value;
                    inputAbove.remove();
                }
                else {//如果更改后的内容为空，就删除该行
                    if (e.done)
                        myTodoList.done--;
                    else
                        myTodoList.undone--;
                    myTodoList.remove(i);
                    myTodoList.displaySwitch();
                    myTodoList.updBottom();
                }
            }
        })
        text.appendChild(inputAbove);
        inputAbove.focus();
    }
})
//实现拖拽排序
let draggedItem = null;
let lastEnteredItem = null;
todoListEle.addEventListener('dragstart', (e) => {
    // e.preventDefault();
    draggedItem = e.target;
})

todoListEle.addEventListener('dragenter', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('todo')) {
        lastEnteredItem = e.target;
    }
})

todoListEle.addEventListener('dragend', (e) => {
    if (lastEnteredItem) {
        const draggedIndex = Array.from(todoListEle.childNodes).indexOf(draggedItem);
        const enteredIndex = Array.from(todoListEle.childNodes).indexOf(lastEnteredItem);
        const [draggedTodo] = myTodoList.todos.splice(draggedIndex, 1);
        myTodoList.todos.splice(enteredIndex, 0, draggedTodo);
    }
    myTodoList.displaySwitch();
    draggedItem = null;
    lastEnteredItem = null;
});

todoListEle.addEventListener('dragover', (e) => {
    e.preventDefault();
})