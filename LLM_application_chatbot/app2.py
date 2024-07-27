from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = Flask(__name__)
CORS(app)

model_name = "facebook/blenderbot-400M-distill"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
conversation_history = []

MAX_LENGTH = model.config.max_length  # Maximum token length for the model
MAX_HISTORY = 5  # Keep the last 5 exchanges


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/chatbot', methods=['POST'])
def handle_prompt():
    global conversation_history  # Declare conversation_history as global
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Debug log
        input_text = data['prompt']

        # Append the new user input to the conversation history
        conversation_history.append(input_text)

        # Limit the conversation history to the last MAX_HISTORY exchanges
        if len(conversation_history) > MAX_HISTORY * 2:  # Each exchange consists of a user prompt and a bot response
            conversation_history = conversation_history[-MAX_HISTORY * 2:]

        history_text = " ".join(conversation_history)

        # Tokenize the combined text
        input_ids = tokenizer.encode(history_text, return_tensors="pt")

        # Check if the token length exceeds the maximum length and truncate if necessary
        if input_ids.shape[1] > MAX_LENGTH:
            input_ids = input_ids[:, -MAX_LENGTH:]

        # Generate the response from the model
        outputs = model.generate(input_ids, max_length=MAX_LENGTH, temperature=0.7, top_p=0.9)

        # Decode the response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

        # Add the bot response to the conversation history
        conversation_history.append(response)

        print(f"Generated response: {response}")  # Debug log
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Failed to process the request"}), 500


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
