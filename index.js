import { createServer } from "http";
import { readFileSync } from "fs";

const PORT = 3000;

// Function to simulate a stream of data
async function* generateStream() {
  const data = JSON.parse(readFileSync("mock_users.json", "utf8"));

  for (const record of data) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    yield JSON.stringify(record) + "\n";
  }
}

let indexHtml;
try {
  indexHtml = readFileSync("index.html", "utf8");
} catch (err) {
  console.error("Error reading index.html:", err);
  process.exit(1);
}

// Create the HTTP server
const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve the index.html file
    res.setHeader("Content-Type", "text/html");
    res.end(indexHtml);
    return;
  }

  if (req.method === "POST") {
    // Set headers for streaming response
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });

    try {
      for await (const chunk of generateStream()) {
        res.write(chunk); // Write each chunk of data
      }
      res.end(); // End the response after streaming is complete
    } catch (error) {
      console.error("Stream error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Stream error" }));
    }
    return;
  }

  // Handle unsupported routes or methods
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
