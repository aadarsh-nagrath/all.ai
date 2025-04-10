from openai import OpenAI
import os
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("QWIN_API_KEY")
)

async def chat_with_ai(messages, conversation_history=None):
    try:
        # Initialize conversation history if not provided
        if conversation_history is None:
            conversation_history = [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                }
            ]
        
        # Add the new messages to the conversation history
        conversation_history.extend(messages)
        
        completion = client.chat.completions.create(
            model="qwen/qwen-vl-plus:free",
            messages=conversation_history,
            extra_headers={
                "HTTP-Referer": os.getenv("SITE_URL", "http://localhost:3000"),
                "X-Title": os.getenv("SITE_NAME", "My AI App"),
            }
        )
        
        # Get the AI's response
        ai_response = completion.choices[0].message.content
        
        # Add the AI's response to the conversation history
        conversation_history.append({
            "role": "assistant",
            "content": ai_response
        })
        
        return ai_response, conversation_history
    except Exception as e:
        logger.error(f"AI API error: {str(e)}")
        return "Sorry, I couldn't process your request right now.", conversation_history