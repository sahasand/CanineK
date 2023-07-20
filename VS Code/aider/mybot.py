import openai
import tkinter as tk
from tkinter import ttk

openai.api_key = 'your-api-key'

def respond_to_user(prompt, role, top_p, temperature, include_markdown, include_questions, model):
    prompt_addendum = ""
    if include_markdown:
        prompt_addendum += " Please include headings, formatting, etc."
    if include_questions:
        prompt_addendum += " If you have any clarifying questions about the task, ask now before answering."
    prompt = f"As a {role}, {prompt}{prompt_addendum}"
    response = openai.Completion.create(
      engine=model,
      prompt=prompt,
      temperature=temperature,
      top_p=top_p,
      max_tokens=100
    )
    return response.choices[0].text.strip()

def send():
    user_input = base_prompt_entry.get()
    role = role_combobox.get()
    top_p = top_p_scale.get()
    temperature = temperature_scale.get()
    include_markdown = include_markdown_var.get()
    include_questions = include_questions_var.get()
    model = model_combobox.get()
    response = respond_to_user(user_input, role, top_p, temperature, include_markdown, include_questions, model)
    chat_log.insert(tk.END, "User: " + user_input + "\n")
    chat_log.insert(tk.END, "Bot: " + response + "\n")

root = tk.Tk()
root.title("Chatbot")

left_frame = tk.Frame(root, width=200)
left_frame.pack(side=tk.LEFT, fill=tk.Y)

right_frame = tk.Frame(root, width=800)
right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

role_combobox = ttk.Combobox(left_frame, values=["Lawyer", "Software Developer", "Marketing Specialist"])
role_combobox.pack()

top_p_scale = tk.Scale(left_frame, from_=0, to=1, resolution=0.01, orient=tk.HORIZONTAL)
top_p_scale.pack()

temperature_scale = tk.Scale(left_frame, from_=0, to=1, resolution=0.01, orient=tk.HORIZONTAL)
temperature_scale.pack()

include_markdown_var = tk.BooleanVar()
include_markdown_checkbox = tk.Checkbutton(left_frame, text="Include markdown", variable=include_markdown_var)
include_markdown_checkbox.pack()

include_questions_var = tk.BooleanVar()
include_questions_checkbox = tk.Checkbutton(left_frame, text="Include questions", variable=include_questions_var)
include_questions_checkbox.pack()

base_prompt_entry = tk.Entry(left_frame)
base_prompt_entry.pack()

generate_button = tk.Button(left_frame, text="Generate", command=send)
generate_button.pack()

resulting_prompt_text = tk.Text(left_frame)
resulting_prompt_text.pack()

model_combobox = ttk.Combobox(left_frame, values=["text-davinci-002", "text-curie-002"])
model_combobox.pack()

chat_log = tk.Text(right_frame)
chat_log.pack(fill=tk.BOTH, expand=True)

root.mainloop()
