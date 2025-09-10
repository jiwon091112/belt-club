# Smart Scheduler

Smart Scheduler is a web application designed to help users manage their schedules efficiently. By allowing users to input their existing schedules, the application suggests the most suitable times for new events, ensuring optimal time management.

## Project Structure

The project consists of the following files and directories:

- **public/**: Contains all the front-end files.
  - **index.html**: The main HTML document for the web application.
  - **styles.css**: CSS styles for the webpage.
  - **script.js**: JavaScript code for handling user interactions.

- **src/**: Contains the server-side application files.
  - **app.js**: Entry point of the server-side application, setting up the Express server and middleware.
  - **routes/**: Contains route definitions.
    - **schedule.js**: Defines routes related to scheduling.
  - **logic/**: Contains the core scheduling logic.
    - **scheduler.js**: Implements the logic for determining the best time for new events.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

## Getting Started

To get started with the Smart Scheduler application, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd smart-scheduler
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to access the application.

## Features

- Input existing schedules and events.
- Get suggestions for new events based on current schedules.
- User-friendly interface for easy interaction.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.