const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url.includes("/webcrawler")) {
    let urlToCrawl = new URL("http://localhost:5000" + req.url);
    let options = {
      host: urlToCrawl.searchParams.get("url"),
      path: "/",
    };

    let request = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(data);
      });
    });

    request.on("error", (err) => console.log(err.message));
    request.end();
  }
  res.end("Website Crawled Successfully!");
});

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
