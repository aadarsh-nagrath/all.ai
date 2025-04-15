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

async def chat_with_ai(messages):
    try:
        completion = client.chat.completions.create(
            model="qwen/qwen-2.5-72b-instruct:free",
            messages=messages,
            extra_headers={
                "HTTP-Referer": os.getenv("SITE_URL", "http://localhost:3000"),
                "X-Title": os.getenv("SITE_NAME", "My AI App"),
            }
        )
        return completion.choices[0].message.content
    except Exception as e:
        logger.error(f"AI API error: {str(e)}")
        return "Sorry, I couldn't process your request right now."