const http = require("http");
const fs = require("fs/promises")

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./static"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.get(["/", "/home"], (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/pages/index.html"));
});

app.get("/contact", (req,res) => {
    res.status(200).sendFile(path.join(__dirname, "pages/contact-me.html"));
})

app.get("/about-me", (req,res) => {
    res.status(200).sendFile(path.join(__dirname, "pages/about.html"));
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "pages/404.html"))
})

app.listen(8888, (err) => {
    if(err) throw(err);
    console.log("App is listening in port " + 8888);
})

// async function getPage(path){
//     const fileText = (await fs.readFile(path)).toString();
//     return fileText;
// }

// const server = http.createServer();

// server.on("request", async (req, res) => {
//     if(req.method === "GET"){
//         console.log(`[LOG] ${req.method} ${req.url}`);
//         let path = null;
//         let type = "html";
//         let code = 200;
//         if(req.url === "/"){
//             path = "./pages/index.html";
//             res.writeHead(code, {"Content-type": "text/html"});
//         }
//         else if(req.url === "/about-me"){
//             path = "./pages/about.html";
//             res.writeHead(code, {"Content-type": "text/html"});
//         }
//         else if(req.url === "/contact"){
//             path = "./pages/contact-me.html";
//             res.writeHead(code, {"Content-type": "text/html"});
//         }
//         else if(req.url === "/styles.css"){
//             path = "./static/styles.css";
//             res.writeHead(code, {"Content-type": "text/css"});
//         }
//         else {
//             path = "./pages/404.html";
//             res.writeHead(code, {"Content-type": "text/html"});
//             code = 404;
//         }
        
//         let page = await getPage(path);
//         res.end(page);
//     }
// });

// server.listen(process.env.PORT || 8080, () => {
//     console.log(`Server is listening on port ${process.env.PORT || 8080}!`);
// });