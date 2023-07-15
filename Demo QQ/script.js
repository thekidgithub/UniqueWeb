const input = document.querySelector('.input');
const send = document.querySelector('.send');
const groupText = document.querySelector('.chat-text');
const image = document.querySelector('.image');
const groupApps = document.querySelector('.group-apps');
const groupAppsLis = document.querySelectorAll('.group-apps li');
const modelBlock = document.querySelector('.model-block');
const models = document.querySelectorAll('.model');
const buttonsOfModelBlock = document.querySelectorAll('.modelbutton');
const container = document.querySelector('.container');
const more = document.querySelector('.more');
const moreSettings = document.querySelector('.more-settings');
const lastMessage = document.querySelector('.last-message');
const listTime = document.querySelector('.time');
let lastMinute = 61;
let lastHour = 25;
updButton();

input.addEventListener('keydown', (e) => {//输入文本时，对不同的按键决定换行/发送
    if (e.shiftKey && e.key == 'Enter' || e.altKey && e.key == 'Enter') {
        e.preventDefault();
    }
    else if (e.ctrlKey && e.key == 'Enter') {
        input.value += '\n';
    }
    else if (e.key == 'Enter') {
        e.preventDefault();
        if (input.value.trim() != '') sendText();
    }
    updButton();
})

send.addEventListener('click', () => {//发送按钮
    if (input.value.trim() != '') sendText();
})

image.addEventListener('click', sendImage);//发送图片

function updButton() {//更新按钮的状态（输入框内是否有文本）
    if (input.value.trim() != '') send.classList.add('hastext');
    else send.classList.remove('hastext');
}

function sendText() {//发送一个新的文本块（清空输入框，在消息框渲染一个新的块）
    let text = input.value;
    input.value = '';
    updButton();
    const newText = document.createElement('div');
    const profile = document.createElement('div');
    const content = document.createElement('div');
    const id = document.createElement('div');
    const textContent = document.createElement('div');
    const newTime = document.createElement('div');
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    newText.classList.add('newtext');
    profile.classList.add('newprofile');
    content.classList.add('content');
    id.classList.add('id');
    textContent.classList.add('textcontent');
    newTime.classList.add('newtime');
    id.innerHTML = 'thekid';
    textContent.innerHTML = text;
    newTime.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
    listTime.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
    lastMessage.innerHTML = 'thekid:' + text;
    if (text.length > 8)
        lastMessage.innerHTML = 'thekid:' + text.slice(0, 8) + '...';
    content.appendChild(id);
    content.appendChild(textContent);
    newText.appendChild(content);
    newText.appendChild(profile);
    if (minute != lastMinute || hour != lastHour) {
        groupText.appendChild(newTime);
        lastMinute = minute;
        lastHour = hour;
    }
    groupText.appendChild(newText);
}

function sendImage() {//发送图片
    const newText = document.createElement('div');
    const profile = document.createElement('div');
    const content = document.createElement('div');
    const id = document.createElement('div');
    const fileContent = document.createElement('input');
    const imgContent = document.createElement('img');
    const newTime = document.createElement('div');
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    newTime.classList.add('newtime');
    newTime.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
    //这段我之前没有学过，通过查阅资料写的
    fileContent.type = 'file';
    fileContent.click();
    fileContent.addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imgContent.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        listTime.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        lastMessage.innerHTML = 'thekid:[图片]';
        if (minute != lastMinute || hour != lastHour) {
            groupText.appendChild(newTime);
            lastMinute = minute;
            lastHour = hour;
        }
        groupText.appendChild(newText);
    });
    newText.classList.add('newtext');
    profile.classList.add('newprofile');
    content.classList.add('content');
    id.classList.add('id');
    imgContent.classList.add('imgcontent');
    id.innerHTML = 'thekid';
    content.appendChild(id);
    content.appendChild(imgContent);
    newText.appendChild(content);
    newText.appendChild(profile);
}

groupApps.addEventListener('click', () => {//群应用下拉框
    groupAppsLis.forEach(e => {
        e.classList.toggle('show');
    })
})
//打开/关闭模态框
models.forEach(e => {
    e.addEventListener('click', () => {
        modelBlock.classList.add('show');
        modelBlock.classList.remove('hidden');
        container.classList.add('show');
    })
})

buttonsOfModelBlock.forEach(e => {
    e.addEventListener('click', () => {
        modelBlock.classList.remove('show');
        modelBlock.classList.add('hidden');
        container.classList.remove('show');
    })
})
//拉起“更多”框
more.addEventListener('click', () => {
    moreSettings.classList.toggle('show');
})