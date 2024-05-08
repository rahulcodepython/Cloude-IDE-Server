import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import pty from 'node-pty'
import fs from 'fs/promises'
import path from 'path';
import cors from 'cors';
import chokidar from 'chokidar';

var ptyProcess = pty.spawn("bash", [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD,
    env: process.env
});

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server({
    cors: {
        origin: "*"
    }
});
io.attach(server);

chokidar.watch('./user').on('all', (event, path) => {
    io.emit("file:refresh", { event, path })
});

ptyProcess.write("cd user\n")

ptyProcess.onData(data => {
    io.emit("terminal:data", data)
})

io.on('connection', (socket) => {
    console.log("Socket connected: " + socket.id);

    socket.on("file:change", async ({ path, content }) => {
        await fs.writeFile('./user' + path, content)
    })

    socket.on("terminal:write", data => {
        ptyProcess.write(data)
    })
});

const generate_file_tree = async (directory) => {
    const tree = {}

    const build_tree = async (currentDir, currentTree) => {
        const files = await fs.readdir(currentDir)

        for (const file of files) {
            const filePath = path.join(currentDir, file)
            const stats = await fs.stat(filePath)

            if (stats.isDirectory()) {
                currentTree[file] = {}
                await build_tree(filePath, currentTree[file])
            } else {
                currentTree[file] = null
            }
        }
    }

    await build_tree(directory, tree);
    return tree;
}

app.get('/files/content', async (req, res) => {
    console.log("called")
    const path = req.query.path;
    const content = await fs.readFile('./user' + path, 'utf-8')
    return res.json({
        content
    })
})

app.get('/files', async (req, res) => {
    const fileTree = await generate_file_tree('./user')
    return res.json({
        tree: fileTree
    })
});

server.listen(9000, "localhost", () => {
    console.log('Server is running on port 9000');
});
