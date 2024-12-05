# Simple Response Streaming Demo in Node.js

This mini project demonstrates a simple implementation of response streaming using Node.js. It serves mock user data through an HTTP server, simulating a delay between each record to showcase the streaming behavior.

## Features

- HTTP server built with Node.js native `http` module
- Streams mock user data from a JSON file
- Simulates delay between records for demonstration purposes
- Serves a static HTML file for the frontend
- Handles both GET and POST requests
- Zero dependencies except for the native `http` module

## Technologies Used

- Node.js
- Native `http` module
- JavaScript Fetch API
- JSON for mock data
- HTML/CSS for frontend

## Prerequisites

- Node.js (version 14 or later recommended)

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/soham901/simple-streaming-nodejs.git
   cd simple-streaming-nodejs
   ```

2. Create a `mock_users.json` file in the project root with your sample user data.

3. Create an `index.html` file in the project root for the frontend.

## Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. Open a web browser and navigate to `http://localhost:3000`

3. The page will automatically start fetching and displaying the streamed data.

## How it works

- The server reads the `mock_users.json` file and streams each record with a simulated delay.
- When a POST request is received, the server sets up a chunked transfer encoding and streams the data.
- The frontend JavaScript fetches the data using the Fetch API and processes the stream as it arrives.

Here's a snippet of the core streaming functionality:

```javascript
async function* generateStream() {
  const data = JSON.parse(readFileSync("mock_users.json", "utf8"));

  for (const record of data) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    yield JSON.stringify(record) + "\n";
  }
}

// In the request handler:
for await (const chunk of generateStream()) {
  res.write(chunk); // Write each chunk of data
}
```

## Customization

- Adjust the `PORT` constant in `server.js` to change the server port.
- Modify the delay in the `generateStream` function to change the streaming speed.
- Update the `mock_users.json` file to use different sample data.

## Use-Cases

- Simulating real-time data streaming for real-time applications.
- Demonstrating the concept of server-sent events (SSE).
- Exploring the capabilities of Node.js for handling large datasets.

## Why I built this

I was working on a client project where I'm using an AI API that was taking ~2m to return the data. I wanted to try utilizing streaming to improve the user experience, so I built this as an experiment.

## Drawbacks

- The code is not optimized for production use.
- The server doesn't handle errors gracefully.
- The server doesn't handle client disconnections gracefully.
- Not using TypeScript and other build tools.
- Not using a library for handling streaming or HTTP communication.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Soham Sagathiya - [@soham901](https://github.com/soham901)

- GitHub: https://github.com/soham901
- LinkedIn: https://www.linkedin.com/in/soham-sagathiya/
- X: https://x.com/soham901x

Let's collaborate and build something amazing together!
