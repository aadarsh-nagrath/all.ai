from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve API key from environment
api_key = os.getenv("QWIN_API_KEY")

# Debugging: Print the API key to check if it's loaded (remove in production)
print(f"API Key Loaded: {api_key}")

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("QWIN_API_KEY"),
)

# Initialize the conversation with a system message
conversation_history = [
    {
        "role": "system",
        "content": "You are a helpful assistant."
    }
]

# Function to send a message and get a response
def chat_with_ai(message, conversation_history):
    # Add the new user message to the conversation history
    conversation_history.append({
        "role": "user",
        "content": message
    })

    # Send the entire conversation history to the API
    completion = client.chat.completions.create(
        extra_headers={
            "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "<YOUR_SITE_NAME>",
        },
        extra_body={},
        model="qwen/qwen-vl-plus:free",
        messages=conversation_history
    )

    # Get the AI's response
    ai_response = completion.choices[0].message.content

    # Add the AI's response to the conversation history
    conversation_history.append({
        "role": "assistant",
        "content": ai_response
    })

    return ai_response

# Start the conversation
print("AI: Hello! How can I assist you today?")
while True:
    # Prompt the user for input
    user_input = input("You: ")

    # Exit the loop if the user types 'exit' or 'quit'
    if user_input.lower() in ["exit", "quit"]:
        print("AI: Goodbye! Have a great day!")
        break

    # Get the AI's response
    ai_response = chat_with_ai(user_input, conversation_history)

    # Print the AI's response
    print(f"AI: {ai_response}")