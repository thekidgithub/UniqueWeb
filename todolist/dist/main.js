(()=>{const e=document.querySelector(".input"),t=document.querySelector(".seleteall"),o=document.querySelector(".todolist");let d=document.createDocumentFragment();const s=/^(?:[1-9]|1\d|2[0-3]):[0-5]\d/,n=new class{constructor(){this.todos=localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[],this.undone=localStorage.getItem("undone")?JSON.parse(localStorage.getItem("undone")):0,this.done=localStorage.getItem("done")?JSON.parse(localStorage.getItem("done")):0,this.mode=localStorage.getItem("mode")?JSON.parse(localStorage.getItem("mode")):1}add(e){if(console.log(s.test(e)),s.test(e)){const t=s.exec(e);this.todos.push({text:e,done:0,time:t[0]})}else this.todos.push({text:e,done:0,time:""});this.undone++,this.updateValue()}remove(e){this.todos.splice(e,1),this.updateValue()}removeDone(){this.todos=this.todos.filter(((e,t)=>0===e.done)),this.done=0,this.updateValue()}checkAll(){const e=document.querySelectorAll(".check"),t=document.querySelectorAll(".todo");e.forEach((e=>e.innerHTML="√")),t.forEach(((e,t)=>{this.todos[t].done||(e.classList.add("checked"),this.todos[t].done=1,this.done++,this.undone--)})),this.updateValue()}uncheckAll(){const e=document.querySelectorAll(".check"),t=document.querySelectorAll(".todo");e.forEach((e=>e.innerHTML="")),t.forEach(((e,t)=>{e.classList.remove("checked"),this.todos[t].done=0,this.done--,this.undone++})),this.updateValue()}displayBottom(){const e=document.createElement("div"),t=document.createElement("div"),d=document.createElement("div"),s=document.createElement("div");e.classList.add("bottom"),t.classList.add("left"),d.classList.add("changemode"),s.classList.add("clear"),t.innerHTML=`${this.undone} items left`;for(let e=1;e<=3;e++){const t=document.createElement("div");switch(t.classList.add("mode"),e){case 1:t.innerHTML="All";break;case 2:t.innerHTML="Active";break;case 3:t.innerHTML="Completed"}d.appendChild(t)}d.childNodes[this.mode-1].classList.add("seleted"),s.innerHTML="Clear Completed",e.appendChild(t),e.appendChild(d),e.appendChild(s),s.addEventListener("click",(()=>{this.removeDone(),this.displaySwitch(),this.updBottom()})),o.appendChild(e),this.updBottom(),this.updateValue()}updBottom(){const e=document.querySelector(".left"),t=document.querySelector(".clear");document.querySelector(".changemode").addEventListener("click",(e=>{const t=e.target;switch(Array.from(t.childNodes).indexOf(t)){case 0:this.mode=1;break;case 1:this.mode=2;break;case 2:this.mode=3}this.displaySwitch()})),e.innerHTML=`${this.undone} items left`,this.done>0?t.classList.add("show"):t.classList.remove("show"),this.updateValue()}displaySwitch(){o.innerHTML="",this.todos.length>1&&this.sortByTime(this.todos),this.todos.forEach(((e,t)=>{const o=document.createElement("li"),s=document.createElement("div"),n=document.createElement("div"),i=document.createElement("div");switch(o.classList.add("todo"),s.classList.add("check"),n.classList.add("text"),i.classList.add("close"),e.done&&(o.classList.add("checked"),s.innerHTML="√"),n.innerHTML=e.text,i.innerHTML="X",o.appendChild(s),o.appendChild(n),o.appendChild(i),o.draggable=!0,this.mode){case 1:d.appendChild(o);break;case 2:e.done||d.appendChild(o);break;case 3:e.done&&d.appendChild(o)}})),o.appendChild(d),this.undone+this.done>0&&(this.displayBottom(),t.classList.add("show1")),this.updateValue()}sortByTime(e){e.sort((function(e,t){const o=":"===e.time[1]?Number(e.time[0]):Number(e.time.slice(0,2)),d=":"===t.time[1]?Number(t.time[0]):Number(t.time.slice(0,2)),s=":"===e.time[1]?Number(e.time.slice(2,4)):Number(e.time.slice(3,5)),n=":"===t.time[1]?Number(t.time.slice(2,4)):Number(t.time.slice(3,5));return o===d?s-n:o-d})),this.updateValue()}updateValue(){localStorage.setItem("todos",JSON.stringify(this.todos)),localStorage.setItem("done",JSON.stringify(this.done)),localStorage.setItem("undone",JSON.stringify(this.undone)),localStorage.setItem("mode",JSON.stringify(this.mode))}};n.displaySwitch(),console.log(n.todos),e.addEventListener("keyup",(e=>{if("Enter"==e.key&&""!==e.target.value.trim()){const t=e.target.value.trim();e.target.value="",n.add(t),n.displaySwitch()}})),t.addEventListener("click",(()=>{n.undone+n.done>0&&(n.undone>0?(n.checkAll(),n.updBottom(),t.classList.remove("show1"),t.classList.add("show2")):(n.uncheckAll(),n.updBottom(),t.classList.remove("show2"),t.classList.add("show1")))})),o.addEventListener("click",(e=>{if(e.target.classList.contains("check")){const t=e.target.closest("li"),d=Array.from(o.childNodes).indexOf(t),s=n.todos[d],i=t.childNodes[0];s.done=1===s.done?0:1,t.classList.toggle("checked"),i.innerHTML=s.done?"√":"",n.done=s.done?n.done+1:n.done-1,n.undone=s.done?n.undone-1:n.undone+1,n.updBottom()}if(e.target.classList.contains("close")){const t=e.target.closest("li"),d=Array.from(o.childNodes).indexOf(t),s=n.todos[d];console.log(s),s.done?n.done--:n.undone--,n.remove(d),n.displaySwitch(),n.updBottom()}})),o.addEventListener("dblclick",(e=>{if(e.target.classList.contains("text")){const t=e.target.closest("li"),d=Array.from(o.childNodes).indexOf(t),s=n.todos[d],i=t.childNodes[1];e.preventDefault();const a=document.createElement("input");a.classList.add("inputabove"),a.value=i.innerHTML,a.addEventListener("keyup",(e=>{"Enter"==e.key&&(""!=e.target.value.trim()?(i.innerHTML=e.target.value,a.remove()):(s.done?n.done--:n.undone--,n.remove(d),n.displaySwitch(),n.updBottom()))})),i.appendChild(a),a.focus()}}));let i=null,a=null;o.addEventListener("dragstart",(e=>{i=e.target})),o.addEventListener("dragenter",(e=>{e.preventDefault(),e.target.classList.contains("todo")&&(a=e.target)})),o.addEventListener("dragend",(e=>{if(a){const e=Array.from(o.childNodes).indexOf(i),t=Array.from(o.childNodes).indexOf(a),[d]=n.todos.splice(e,1);n.todos.splice(t,0,d)}n.displaySwitch(),i=null,a=null})),o.addEventListener("dragover",(e=>{e.preventDefault()}))})();