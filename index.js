//only http://localhost:3000/index.html -> Hello Success
//index.js -> Error 404: /index.js not a HTML file.
//about.html -> Error 404: /about.html does not exists.
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const port =3000;

//create server
const server = http.createServer((req,res)=>{
    // console.log(req.headers);


    console.log('request for' + req.url + 'by method' + req.method);

    //check it is GET method
    if(req.method=='GET'){
        var fileURL;
        if(req.url=='/'){
            fileURL="/index.html"
        }
        else{
            fileURL=req.url
        }

        //public folder-> address
        var filePath = path.resolve('./public' + fileURL);

        const fileExt = path.extname(filePath);

        //check -> .html file or not
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                 //check -> .html file is not passed, 404
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(
                        `<html>
                            <body>
                                <h1>Error 404: ${fileURL} does not exists.</h1>
                            </body>
                        </html>`
                    )
                }
                //check -> .html file is passed, 200
                res.statusCode=200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res); 
                //createReadStream through read the filePath, return the response.
            })
        } else {
              // not .html file, 404
            res.statusCode=404;
            res.setHeader('Content-Type', 'text/html');
            res.end(
                `<html>
                    <body>
                        <h1>Error 404: ${fileURL} not a HTML file.</h1>
                    </body>  
                </html>`
            )
        
        }
        

    }else{
        //check -> not GET method, 404
        res.statusCode=404;
        res.setHeader('Content-Type', 'text/html');
        res.end(
            `<html>
                <body>
                    <h1>Error 404: ${fileURL} not supported.</h1>
                </body>
            </html>`
        )
    }
    

    // res.statusCode=200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end(
    //     `<html>
    //         <body>
    //             <h1>Server Connection Success :)</h1>
    //         </body>
    //     </html>`
    // )
});

server.listen(port,hostname,()=>{
    console.log(`server run at http://${hostname}:${port}`);
});
