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

async def chat_with_ai(messages, model_info=None):
    try:
        # Default model for backward compatibility
        model = "qwen/qwen-2.5-72b-instruct:free"
        
        # If model_info is provided, use it to determine the model
        if model_info and isinstance(model_info, dict):
            model_type = model_info.get("type", "").lower()
            api_model = model_info.get("api_model")
            
            logger.info(f"Processing model selection - Type: {model_type}, API Model: {api_model}")
            
            # For OpenRouter type models, use the api_model field
            if model_type == "openrouter" and api_model:
                model = api_model
                logger.info(f"Using OpenRouter model: {model}")
            # Add other model types here in the future
            # elif model_type == "other_provider":
            #     # Handle other providers
            #     pass
            else:
                logger.info(f"Unknown model type '{model_type}' or missing api_model, using default model: {model}")
        else:
            logger.info(f"No model_info provided, using default model: {model}")
        
        logger.info(f"Final model being used: {model}")
        
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            extra_headers={
                "HTTP-Referer": os.getenv("SITE_URL", "http://localhost:3000"),
                "X-Title": os.getenv("SITE_NAME", "My AI App"),
            }
        )
        return completion.choices[0].message.content
    except Exception as e:
        logger.error(f"AI API error: {str(e)}")
        return "Sorry, I couldn't process your request right now. Consider using a different model or try refreshing the page."