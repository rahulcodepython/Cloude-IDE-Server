# Cloude-IDE-Server

Cloude-IDE-Server is a real-time collaborative coding environment. Users can write code in their browser, access the terminal, and handle files, all of which will be reflected on the server. The project utilizes several key packages: Socket.io, Express, Node-pty, and Chokidar.

## Features

- **Real-time Collaboration**: Multiple users can write code in the browser simultaneously.
- **Terminal Access**: Full terminal access directly from the browser.
- **File Handling**: Users can create, edit, and delete files within the environment.
- **Live Updates**: All changes are instantly reflected on the server.

## Future Goals

- **Docker Integration**: Spin up a Docker container for each new user request, providing an isolated and secure environment for coding.

## Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm (Node Package Manager)
- Git

## Installation

Follow these steps to set up and run the Cloude-IDE-Server:

1. Clone the repository:
   ```git clone https://github.com/rahulcodepython/Cloude-IDE-Server.git ```

2. Navigate to the project directory:
   ```cd Cloude-IDE-Server```

3. Install the dependencies:
   ```npm i```

4. Start the server using nodemon:
   ```nodemon index.js```

## Technologies Used

- **Socket.io**: Enables real-time bidirectional event-based communication.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node-pty**: Provides access to pseudo-terminal functionality in Node.js.
- **Chokidar**: A neat wrapper around node.js fs.watch / fs.watchFile / fsevents.


## Contributing

Contributions are welcome! If you have suggestions or find any issues, please open an issue or submit a pull request.
