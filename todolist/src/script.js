const input = document.querySelector('.input');
const seleteAll = document.querySelector('.seleteall');
const todoListEle = document.querySelector('.todolist');
class todoList {
    constructor() {
        this.todos = [];
        this.undone = 0;
        this.done = 0;
        this.mode = 1;
    }

    add(innerText) {
        this.todos.push({
            text:innerText,
            done:0
        });
        this.undone++;
    }

    remove(i) {
        this.todos.splice(i,1);
    }

    removeDone(){
        this.todos = this.todos.filter((e,i)=>{
           return e.done === 0;
        })
        this.done = 0;
    }

    checkAll(){
        const checks = document.querySelectorAll('.check');
        const todos = document.querySelectorAll('.todo');
        checks.forEach(e=>e.innerHTML = '√');
        todos.forEach((e,i)=>{
            e.classList.add('checked');
            this.todos[i].done = 1;
            this.done++;
            this.undone--;
        })
    }

    uncheckAll(){
        const checks = document.querySelectorAll('.check');
        const todos = document.querySelectorAll('.todo');
        checks.forEach(e=>e.innerHTML = '');
        todos.forEach((e,i)=>{
            e.classList.remove('checked');
            this.todos[i].done = 0;
            this.done--;
            this.undone++;
        })
    }

    displayBottom(){
        const bottom = document.createElement('div');
        const left = document.createElement('div');
        const changeMode = document.createElement('div');
        const clear = document.createElement('div');
        bottom.classList.add('bottom');
        left.classList.add('left');
        changeMode.classList.add('changemode');
        clear.classList.add('clear');
        left.innerHTML = this.undone + 'items left';
        for(let k = 1;k<=3;k++){
            const mode = document.createElement('div');
            mode.classList.add('mode');
            switch(k){
                case 1: mode.innerHTML = 'All';break;
                case 2: mode.innerHTML = 'Active';break;
                case 3: mode.innerHTML = 'Completed';break;
            }
            changeMode.appendChild(mode);
        }
        changeMode.childNodes[this.mode-1].classList.add('seleted');
        clear.innerHTML = 'Clear Completed';
        bottom.appendChild(left);
        bottom.appendChild(changeMode);
        bottom.appendChild(clear);
        clear.addEventListener('click',()=>{
            this.removeDone();
            this.displaySwitch();
            this.updBottom();
        })
        todoListEle.appendChild(bottom);
        this.updBottom();
    }

    updBottom(){
        const left = document.querySelector('.left');
        const clear = document.querySelector('.clear');
        const modes = document.querySelectorAll('.mode');
        modes.forEach((mode,i)=>{
            mode.addEventListener('click',()=>{
                switch(i){
                    case 0: this.mode = 1;break;
                    case 1: this.mode = 2;break;
                    case 2: this.mode = 3;break;
                }
                this.displaySwitch();
            })
        })
        left.innerHTML = this.undone + 'items left'
        if(this.done>0) clear.classList.add('show');
        else clear.classList.remove('show');
    }

    displaySwitch(){
        todoListEle.innerHTML = '';
        this.todos.forEach((e, i) => {
            const todo = document.createElement('li');
            const check = document.createElement('div');
            const text = document.createElement('div');
            const close = document.createElement('div');
            todo.classList.add('todo');
            check.classList.add('check');
            text.classList.add('text');
            close.classList.add('close');
            if(e.done){
                todo.classList.add('checked');
                check.innerHTML = '√';
            }
            text.innerHTML = e.text;
            close.innerHTML = 'X';
            check.addEventListener('click', () => {
                e.done = (e.done === 1 ? 0 : 1);
                todo.classList.toggle('checked');
                check.innerHTML = (e.done ? '√' : '');
                this.done = (e.done? this.done+1 : this.done-1);
                this.undone = (e.done?this.undone-1:this.undone+1);
                this.updBottom();
            })
            text.addEventListener('dblclick',(e1)=>{
                e1.preventDefault();
                const inputAbove = document.createElement('input');
                inputAbove.classList.add('inputabove');
                inputAbove.value = text.innerHTML;
                inputAbove.addEventListener('keyup',(e2)=>{
                    if(e2.key=='Enter'){
                        if(e2.target.value.trim()!=''){
                            text.innerHTML = e2.target.value;
                            inputAbove.remove();
                        }
                        else{
                            if(e.done)
                                this.done--;
                            else
                                this.undone--;
                            this.remove(i);
                            this.displaySwitch();
                            this.updBottom();
                        }
                    }  
                })
                text.appendChild(inputAbove);
                inputAbove.focus();
            })
            close.addEventListener('click', () => {
                if(e.done)
                    this.done--;
                else
                    this.undone--;
                this.remove(i);
                this.displaySwitch();
                this.updBottom();
            }) 
            todo.appendChild(check);
            todo.appendChild(text);
            todo.appendChild(close);
            switch(this.mode){
            case 1: {
                todoListEle.appendChild(todo);
                break;
            }
            case 2: {
                if(!e.done) todoListEle.appendChild(todo);
                break;
            }
            case 3: {
                if(e.done) todoListEle.appendChild(todo);
                break;
            }
        }
        })
        if(this.undone+this.done>0){
            this.displayBottom();  
            seleteAll.classList.add('show1');
        }
    }
}

const myTodoList = new todoList();

input.addEventListener("keyup", (e) => {
    if (e.key == 'Enter') {
        if (e.target.value.trim() !== '') {
            const text = e.target.value.trim();
            e.target.value = '';
            myTodoList.add(text);
            myTodoList.displaySwitch();
        }
    }
})

seleteAll.addEventListener('click',()=>{
    if(myTodoList.undone+myTodoList.done>0){
        if(myTodoList.undone>0){
            myTodoList.checkAll();
            myTodoList.updBottom();
            seleteAll.classList.remove('show1');
            seleteAll.classList.add('show2');
        }
        else{
            myTodoList.uncheckAll();
            myTodoList.updBottom();
            seleteAll.classList.remove('show2');
            seleteAll.classList.add('show1');
        }
    }
})