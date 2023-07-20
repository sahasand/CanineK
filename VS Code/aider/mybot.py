import openai

openai.api_key = 'your-api-key'

def respond_to_user(prompt):
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=prompt,
      temperature=0.5,
      max_tokens=100
    )
    return response.choices[0].text.strip()
