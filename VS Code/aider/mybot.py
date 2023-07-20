import openai
import tkinter as tk

openai.api_key = 'your-api-key'

def respond_to_user(prompt):
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=prompt,
      temperature=0.5,
      max_tokens=100
    )
    return response.choices[0].text.strip()

def send():
    user_input = user_input_entry.get()
    response = respond_to_user(user_input)
    chat_log.insert(tk.END, "User: " + user_input + "\n")
    chat_log.insert(tk.END, "Bot: " + response + "\n")

root = tk.Tk()
root.title("Chatbot")

chat_log = tk.Text(root)
chat_log.pack()

user_input_entry = tk.Entry(root)
user_input_entry.pack()

send_button = tk.Button(root, text="Send", command=send)
send_button.pack()

root.mainloop()
