# backend/backend.py
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

# --- 1. НАСТРОЙКА ---
app = Flask(__name__)
CORS(app)
client = OpenAI()

# --- 2. УЛУЧШЕННЫЙ СИСТЕМНЫЙ ПРОМПТ ---
SYSTEM_PROMPT = """
You are a master AI furniture designer, YGV-AI. Your task is to perform three actions and separate them with "---".

1.  **Analyze JSON:** Analyze the user's request and create a structured JSON object.
    Keys: 'style', 'furniture_type', 'material', 'color', 'features'.
    If a key isn't mentioned, use null.

2.  **Create DALL-E Prompts (Array):** Based on the JSON, create a JSON array of 4 distinct, highly detailed prompts for DALL-E 3.
    **Crucially, every prompt MUST end with**: ", on a pure white studio background, photorealistic."
    Each prompt should describe a unique variation (e.g., different leg shapes, slightly different materials, different compositions).

3.  **Write Chat Response:** Write a friendly chat response, inviting the user to choose their favorite option.

---
EXAMPLE
User: "a minimalist wooden chair"

Your Response:
{
  "style": "minimalist",
  "furniture_type": "chair",
  "material": "wood",
  "color": null,
  "features": null
}
---
[
  "A photorealistic image of a minimalist chair with a sleek, curved backrest made of light oak, on a pure white studio background, photorealistic.",
  "A photorealistic image of a minimalist chair with sharp, angular legs and a woven seat, crafted from dark walnut, on a pure white studio background, photorealistic.",
  "A photorealistic image of a minimalist ash wood chair with a tripod leg structure and a circular seat, on a pure white studio background, photorealistic.",
  "A photorealistic image of a low-profile minimalist lounge chair in teak wood, with simple geometric cushions, on a pure white studio background, photorealistic."
]
---
An inspiring idea! I've drafted 4 initial concepts for you. Which one speaks to you the most?
---
"""

# --- 3. ГЛАВНЫЙ API ЭНДПОИНТ ---
@app.route('/api/chat', methods=['POST'])
def chat_handler():
    data = request.get_json()
    user_message = data.get('message')
    if not user_message: return jsonify({"error": "No message"}), 400

    try:
        # --- Этап 1: Получаем промпты от GPT ---
        print("1. Requesting prompts from GPT...")
        gpt_completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        response_text = gpt_completion.choices[0].message.content
        parts = response_text.split('---', 2)
        
        structured_data_str, dalle_prompts_str, chat_response = parts[0], parts[1], parts[2]
        dalle_prompts = json.loads(dalle_prompts_str) # Превращаем строку в массив промптов

        # --- Этап 2: Параллельная генерация 4 изображений ---
        print(f"2. Generating {len(dalle_prompts)} images with DALL-E...")
        image_urls = []
        for prompt in dalle_prompts:
            image_response = client.images.generate(
                model="dall-e-3",
                prompt=prompt.strip(),
                size="1024x1024",
                quality="standard",
                n=1,
            )
            image_urls.append(image_response.data[0].url)
        
        print("3. All images generated. Sending response to frontend.")
        return jsonify({
            "structured_data": json.loads(structured_data_str),
            "bot_response": chat_response.strip(),
            "image_urls": image_urls # 👈 Отправляем массив ссылок
        })

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

# --- 4. ЗАПУСК СЕРВЕРА ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)