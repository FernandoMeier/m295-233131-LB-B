# Test cases for the API

## Navigation:

* [GET /tasks](<#get-tasks>)
* [GET /tasks/{id}](<#get-tasksid>)
* [POST /tasks/](<#post-tasks>)
* [SET /tasks](<#set-tasksid>)
* [DELETE /tasks](<#delete-tasks>)
* [POST /login](<#post-login>)
* [GET /verify](<#get-verify>)
* [DELETE /logout](<#delete-logout>)

<br><br><br>

## GET /tasks

### success: 
<br>http://localhost:3000/tasks
<br>result:  
```
[{"id":1,"content":"Feed the dog","finished":false,"createdate":"2023-05-05T12:43:42.242Z"},{"id":2,"content":"new content","createdate":"2023-05-05T12:43:42.242Z","finished":true,"finishdate":"2023-05-05T12:44:01.149Z"},{"id":3,"content":"Empty task","finished":false,"createdate":"2023-05-05T12:44:08.027Z"},{"id":4,"content":"hello there","finished":false,"createdate":"2023-05-05T12:44:38.998Z"},{"id":5,"content":"Empty task","finished":false,"createdate":"2023-05-05T12:44:46.465Z"}]
```
<br>

### fail:
<br>http://localhost:3000/tasks/valuehere 
<br>result:  
```
"Task not found"
```

http://localhost:3000/tasks/!!!
<br>result: 
```
"Task not found"
```

<br><br><br>

## GET /tasks/{id}

### success: 
<br>http://localhost:3000/tasks/1
<br>result: 
```
[{"id":1,"content":"Feed the dog","finished":false,"createdate":"2023-05-05T12:43:42.242Z"}]
```
<br>

### fail:
<br>http://localhost:3000/tasks/-2 
<br>result: 
```
"Task not found"
```

http://localhost:3000/tasks/nonumber
<br>result: 
```
"Task not found"
```

<br><br><br>

## POST /tasks/

### success:
<br>empty body http://localhost:3000/tasks:
<br>result:
```
{"id":5,"content":"Empty task","finished":false,"createdate":"2023-05-05T12:44:46.465Z"}
```
with body http://localhost:3000/tasks:
<br>body content:
<br>{"content": "hello there"}

result:
```
{"id":6,"content":"hello there","finished":false,"createdate":"2023-05-05T13:47:33.139Z"}
```
<br>

### fail:
<br>http://localhost:3000/tasks/new
<br>result: 
```
Error 404
```

<br><br><br>

## SET /tasks/{id}

### success:
<br>body content http://localhost:3000/tasks/2:
```
{"content": "new content", "finished": "true"}
```

<br>result:
```
{"id":2,"content":"new content","createdate":"2023-05-05T12:43:42.242Z","finished":true,"finishdate":"2023-05-05T13:51:25.823Z"}
```
<br>

### fail:
<br>body content http://localhost:3000/tasks/-8:
```
{"content": "new content", "finished": "true"}
```

<br>result:
```
Task not found
```

<br><br><br>

## DELETE /tasks

### success:
<br>http://localhost:3000/tasks/1
<br>result:
```
[{"id":1,"content":"Feed the dog","finished":false,"createdate":"2023-05-05T12:43:42.242Z"}]
```

### fail:
<br>http://localhost:3000/tasks
<br>result:
```
Error 404
```

<br><br><br>

## POST /login/

### success:
<br>http://localhost:3000/login
<br>body content:
```
{"email": "mymail@hotmail.com", "password": "m295"}
```

<br>result:
```
{"email": "mymail@hotmail.com"}
```

### fail:
<br>http://localhost:3000/login
<br>body content:
```
{"email": "thisIsNotAMail", "password": "m295"}
```

<br>result:
```
"invalid email format"
```

<br><br><br>

## GET /verify/

### success:
<br>http://localhost:3000/verify
<br>logged in:
<br>result:
```
{"email": "mymail@hotmail.com"}
```

### fail:
<br>http://localhost:3000/verify
<br>logged out:
<br>result:
```
"currently not logged in"
```

<br><br><br>

## DELETE /logout/

### success:
<br>http://localhost:3000/logout
<br>logged in:
<br>result:
```
Status 204
```

### fail:
<br>http://localhost:3000/logout
<br>logged out:
<br>result:
```
"cannot log out since you are not logged in"
```