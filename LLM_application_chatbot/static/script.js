let savedpasttext = []; // Variable to store the message
let savedpastresponse = []; // Variable to store the message

// Section: get the Id of the talking container
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Section: function to create the dialogue window
const addMessage = (message, role, imgSrc) => {
  // Create elements in the dialogue window
  const messageElement = document.createElement('div');
  const textElement = document.createElement('p');
  messageElement.className = `message ${role}`;
  const imgElement = document.createElement('img');
  imgElement.src = `${imgSrc}`;
  // Append the image and message to the message element
  messageElement.appendChild(imgElement);
  textElement.innerText = message;
  messageElement.appendChild(textElement);
  messagesContainer.appendChild(messageElement);
  // Create the ending of the message
  const clearDiv = document.createElement('div');
  clearDiv.style.clear = 'both';
  messagesContainer.appendChild(clearDiv);
};

// Section: Calling the model
const sendMessage = async (message) => {
  addMessage(message, 'user', '../static/user.jpeg');
  // Loading animation
  const loadingElement = document.createElement('div');
  const loadingTextElement = document.createElement('p');
  loadingElement.className = 'loading-animation';
  loadingTextElement.className = 'loading-text';
  loadingTextElement.innerText = 'Loading....Please wait';
  messagesContainer.appendChild(loadingElement);
  messagesContainer.appendChild(loadingTextElement);

  const makePostRequest = async (msg) => {
    const url = 'http://127.0.0.1:5000/chatbot';  // Ensure this matches your Flask server URL
    const requestBody = { prompt: msg };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Failed to fetch response' };
    }
  };

  const data = await makePostRequest(message);

  // Deleting the loading animation
  const loadAnimation = document.querySelector('.loading-animation');
  const loadText = document.querySelector('.loading-text');
  loadAnimation.remove();
  loadText.remove();

  if (data.error) {
    addMessage(data.error, 'error', '../static/Error.png');
  } else {
    const responseMessage = data.response;
    addMessage(responseMessage, 'aibot', '../static/Bot_logo.png');
  }

  // Save the content in history
  savedpasttext.push(message);
  savedpastresponse.push(data.response);
};

// Section: Button to submit to the model and get the response
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    messageInput.value = '';
    await sendMessage(message);
  }
});
