import { createApp } from 'vue'

const filters = {//函数对象
    all:(todos)=>todos,
    active:(todos)=>todos.filter((todo)=>!todo.completed),
    completed:(todos)=>todos.filter((todo)=>todo.completed)
};

createApp({

    data: ()=>({//todos数组，更改时的暂存todo和显示模式
        todos:JSON.parse(localStorage.getItem('vue-todos')||'[]'),
        editedTodo: null,
        visibility: 'all'
    }),

    computed: {//根据模式筛选的todos数组和待办事项数
        filteredTodos(){
            return filters[this.visibility](this.todos);
        },

        remaining(){
            return filters.active(this.todos).length;
        }
    },

    watch: {//侦听器，监测todos数组的改变实现客户端存储
        todos:{
            handler(todos) {
                localStorage.setItem('vue-todos',JSON.stringify(todos));
            },
            deep:true
        }
    },

    mounted() {
        window.addEventListener('hashchange', this.onHashChange)
        this.onHashChange()
      },

    methods: {
        toggleAll(e){//全选或者全不选按钮
            this.todos.forEach(todo => {
                todo.completed = e.target.checked;
            })
        },

        addTodo(e){//增加
            const value = e.target.value.trim();
            if(!value) return;
            this.todos.push({
                id: Date.now(),
                title: value,
                completed: false
            });
            e.target.value = '';
        },

        removeTodo(todo){//删除
            this.todos.splice(this.todos.indexOf(todo),1);
        },

        editTodo(todo){//开始编辑
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit(todo){//完成编辑
            if(!this.editTodo) return;
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if(!todo.title) this.removeTodo(todo);
        },

        cancelEdit(todo){//取消编辑
            todo.title = this.beforeEditCache;
            this.editedTodo = null;
        },

        removeCompleted(){//清除所有已完成
            this.todos = filters.active(this.todos);
        },

        onHashChange() {
            let visibility = window.location.hash.replace(/#\/?/, '')
            if (filters[visibility]) {
              this.visibility = visibility
            } else {
              window.location.hash = ''
              this.visibility = 'all'
            }
          }
    }
}).mount('#app');