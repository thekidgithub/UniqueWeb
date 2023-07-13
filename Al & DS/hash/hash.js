const insertButton = document.querySelector('.insert');
const deleteButton = document.querySelector('.delete');
const searchButton = document.querySelector('.search');
const changeButton = document.querySelector('.change');
const SIZE = 100;
let hashTable = [];
insertButton.addEventListener('click', () => {
    let key = prompt("key:");
    let value = prompt("value:");
    insert(key, value);
});
deleteButton.addEventListener('click', () => {
    let key = prompt("key:");
    Delete(key);
});
searchButton.addEventListener('click', () => {
    let key = prompt("key:");
    alert(search(key));
});
changeButton.addEventListener('click', () => {
    let key = prompt("key:");
    let value = prompt("value:");
    change(key, value);
});

function insert(key, value) {//插入
    let index = key % SIZE;//取模确定索引
    if (hashTable[index] == undefined) {
        hashTable[index] = {//利用对象作为键值对
            key,
            value,
        };
    }
    else {//使用开放地址法解决冲突
        let i = index + 1;
        while (i != index) {
            if (hashTable[i] == undefined) {
                hashTable[i] = {
                    key,
                    value,
                };
            }
            i++;
        }
    }
}

function Delete(key) {//删除
    let index = key % SIZE;
    let i = index;
    while (hashTable[i] != undefined) {
        if (hashTable[i].key == key) {
            hashTable[i] = undefined;
            break;
        }
        i++;
    }
}

function search(key) {//查找
    let index = key % SIZE;
    let i = index;
    while (hashTable[i] != undefined) {
        if (hashTable[i].key == key) {
            return hashTable[i].value;
        }
        i++;
    }
    return -1;
}

function change(key, value) {//更改
    let index = key % SIZE;
    let i = index;
    while (hashTable[i] != undefined) {
        if (hashTable[i].key == key) {
            hashTable[i].value = value;
        }
        i++;
    }
}