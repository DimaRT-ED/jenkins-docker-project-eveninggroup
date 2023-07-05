const { parse } = require('url');
const { Todo } = require('../services/todo');
const { DB } = require('../services/db');



const router = async (req, res) => {
    const todo = new Todo();
    const { pathname, query } = parse(req.url, true);
    if (pathname === '/task' && req.method === "GET") {
        res.write(JSON.stringify(await DB.getAllTodos()));
        res.end();
    }
    else if (pathname === '/task' && req.method === "POST") {
        let data = '';
        req.on('data', (chunck) => {
            data += chunck;
        });
        req.on('end', async () => {
            res.write(JSON.stringify(await DB.addTodo(JSON.parse(data))));
            res.end();
        });
    } else if (pathname === '/task' && req.method === "DELETE") {
        let data = '';
        req.on('data', (chunck) => {
            data += chunck;
        });
        req.on('end', async () => {
            const { _id } = JSON.parse(data);
            res.write(JSON.stringify(await DB.removeTodo(_id)));
            res.end();
        });
    } else if (pathname === '/task' && req.method === "PUT") {

    } else if (pathname === '/task/done' && req.method === "GET") {

    } else if (pathname === '/task/todo' && req.method === "GET") {

    }


    else if (pathname === '/home' && req.method === "GET") {
        await todo.addTodos(await DB.getAllTodos());
        await todo.addTodoForm();
        res.write(todo.getHtml());
        res.end();
    }

}
module.exports = { router }