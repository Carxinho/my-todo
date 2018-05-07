var addButton = document.querySelector('#id-button-add')
addButton.addEventListener('click',function(){
    var todoInput = document.querySelector('#id-input-todo')
    var todo = todoInput.value
    insertTodo(todo,false)
    saveTodos()
})

var insertTodo = function(todo,done){
    var todoContainer = document.querySelector('.id-div-container')
    var t = templateTodo(todo,done)
    todoContainer.insertAdjacentHTML('beforeend',t);
    saveTodos()
}

var templateTodo = function(todo,done) {
    var status = ''
    if(done) {
        status = 'done'
    }
    var t = `
        <div class='todo-cell ${status}'>
            <i class="fa fa-check-circle todo-done" aria-hidden="true"></i>
            <span class='todo-content' contenteditable='true'>${todo}</span>
            <i class="fa fa-trash todo-delete" aria-hidden="true"></i>
        </div>
    `
    return t
}

var todoContainer = document.querySelector('.id-div-container')
// 通过 event.target 的 class 来检查点击的是什么
todoContainer.addEventListener('click', function(event){
    var target = event.target
    // classList.contains 可以检查元素是否有一个 class
    if(target.classList.contains('todo-done')) {
        // target.parentElement 用来获取按钮的父节点
        // 给 todo div 开关一个状态 class
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        // 改变 todo 完成状态之后，保存 todos
        saveTodos()
    } else if (target.classList.contains('todo-delete')) {
        // 找到按钮的父节点并且删除
        var todoDiv = target.parentElement
        todoDiv.remove()
        // 删除之后 保存 todos
        saveTodos()
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

var saveTodos = function() {
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组中
    // 4 保存数组
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}

var loadTodos = function() {
    var todos = load()
    // 添加到页面中
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}

loadTodos()

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleMenu = function(element, className){
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var bindTheme = function() {
    var b = document.querySelector('.theme')
    bindEvent(b, 'click', function(event) {
    console.log('click button')
    var c = document.querySelector('.choice')
    toggleMenu(c, 'menu-hide')
    })
}

bindTheme()

var bindPuple = function() {
    var p = document.querySelector('.purple')
    bindEvent(p, 'click', function() {
        document.querySelector('.left').style.background = 'purple'
        document.querySelector('.mission').style.background = 'rgb(196, 79, 196)'
        document.querySelector('.purple').style.background = 'rgb(196, 79, 196)'
        document.querySelector('.black').style.background = 'rgb(196, 79, 196)'
        document.querySelector('.theme').style.background = 'rgb(90, 1, 90)'  
        document.querySelector('.red').style.background = 'rgb(90, 1, 90)'          
    })
}
bindPuple()

var bindBlack= function() {
    var p = document.querySelector('.black')
    bindEvent(p, 'click', function() {
        document.querySelector('.left').style.background = 'rgb(56, 54, 54)'
        document.querySelector('.mission').style.background = 'rgb(66, 65, 65)'
        document.querySelector('.purple').style.background = 'rgb(66, 65, 65)'
        document.querySelector('.black').style.background = 'rgb(66, 65, 65)'
        document.querySelector('.theme').style.background = 'rgb(34, 33, 33)'   
        document.querySelector('.red').style.background = 'rgb(34, 33, 33)'           
    })
}
bindBlack()

var bindRed = function() {
    var p = document.querySelector('.red')
    bindEvent(p, 'click', function() {
        document.querySelector('.left').style.background = 'red'
        document.querySelector('.mission').style.background = 'rgb(247, 71, 71)'
        document.querySelector('.purple').style.background = 'rgb(247, 71, 71)'
        document.querySelector('.black').style.background = 'rgb(247, 71, 71)'
        document.querySelector('.theme').style.background = 'rgb(119, 10, 10)'      
        document.querySelector('.red').style.background = 'rgb(119, 10, 10)'          
    })
}
bindRed()