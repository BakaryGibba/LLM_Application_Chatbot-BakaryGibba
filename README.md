# LLM_Application_Chatbot-BakaryGibba

## Overview

This project is a simple AI chatbot built using Facebook's Blenderbot model and the Hugging Face Transformers library, integrated into a Flask web application. The chatbot is designed to engage in human-like conversations, and it leverages the capabilities of a transformer-based model to understand and generate responses.

The project demonstrates how to integrate a pre-trained language model into a web application and provides a basic framework that can be further developed and customized for various use cases.

## Features

- Conversational AI: The chatbot is powered by Facebook's Blenderbot-400M-distill model, a distilled version of Blenderbot that is optimized for conversational tasks.
- Web Interface: The chatbot can be accessed via a simple web interface, allowing users to interact with it through a browser.
Stateful Conversations: The chatbot maintains a conversation history, allowing it to remember past exchanges and respond in context.
- Modular Design: The project is structured to allow easy modifications and extensions

## Installation

### Prerequisites
- Python 3.8 or higher
- Docker (optional, for containerized deployment)

### Step-by-Step Installation
1. Ckone the Repository:
   
           git clone https://github.com/yourusername/simple-ai-chatbot.git
            cd simple-ai-chatbot
   
3. Set Up a Virtual Environment (Optional but Recommended)
   
             python3 -m venv venv
          source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   
5. Install Dependencies:
   
             pip install -r requirements.txt
   
7. Run Flask Application:
   python app.py
   
9. Access the Chatbot:
   Open your web browser and go to **'http: //127.0.0.1:5000/'** to interact with the chatbot.

## Docker Deployment (Optional)
To run the application in a Docker container:
1. **Build the Docker Image:**
   
             docker built -t simple-ai-chatbot .
   
3. **Run the Docker Container:**
   
             docker run -p 5000:5000 simple-ai-chatbot
   
5. **Access the chatbot:**
    Open your web browser and go to **'http: //127.0.0.1:5000/'** to interact with the chatbot.

## Usage 

To interact with the chatbot, simply enter a message into the input field on the web interface and press "Send." The chatbot will respond based on the conversation history. You can continue the conversation naturally, and the chatbot will maintain context across multiple exchanges.

## Customization
- **Change the Model:** You can switch to a different conversational model by changing the model_name variable in app.py.
- **Modify the Frontend:** Customize index.html to improve the user interface or integrate it into a larger application.
- **Extend Functionality** Add features like user authentication, logging, or advanced conversation management to enhance the chatbot.

## Contribution
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License

## The Outcome of the System:




https://github.com/user-attachments/assets/892403cc-03a0-4e37-bb3f-f7e98f0e4c1d

