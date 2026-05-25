import http from "http";
import fs from "fs/promises";

async function getPage(path){
    const fileText = (await fs.readFile(path)).toString();
    return fileText;
}

const server = http.createServer();

server.on("request", async (req, res) => {
    if(req.method === "GET"){
        console.log(`[LOG] ${req.method} ${req.url}`);
        let path = null;
        let type = "html";
        let code = 200;
        if(req.url === "/"){
            path = "./pages/index.html";
            res.writeHead(code, {"Content-type": "text/html"});
        }
        else if(req.url === "/about-me"){
            path = "./pages/about.html";
            res.writeHead(code, {"Content-type": "text/html"});
        }
        else if(req.url === "/contact"){
            path = "./pages/contact-me.html";
            res.writeHead(code, {"Content-type": "text/html"});
        }
        else if(req.url === "/styles.css"){
            path = "./static/styles.css";
            res.writeHead(code, {"Content-type": "text/css"});
        }
        else {
            path = "./pages/404.html";
            res.writeHead(code, {"Content-type": "text/html"});
            code = 404;
        }
        
        let page = await getPage(path);
        res.end(page);
    }
});

server.listen(process.env.PORT || 8080, () => {
    console.log("Server is listening on port 8080!");
});