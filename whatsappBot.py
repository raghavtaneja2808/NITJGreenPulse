from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
import requests
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
import os
import random

app = Flask(__name__)
load_dotenv()

ACCOUNT_SID = os.getenv("ACCOUNT_SID")
AUTH_TOKEN = os.getenv("AUTH_TOKEN")


PDF_LINKS = [
"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
]

@app.route("/", methods=["GET"])
def home():
    return "WhatsApp bot is live!"

@app.route("/whatsapp", methods=["POST"])
def whatsapp_reply():
    incoming_msg = request.form.get("Body")
    sender = request.form.get("From")
    num_media = int(request.form.get("NumMedia", 0))

    print(f"New message from {sender}: {incoming_msg}")

    resp = MessagingResponse()
    msg = resp.message()

    if num_media > 0:
        media_url = request.form.get("MediaUrl0")
        content_type = request.form.get("MediaContentType0")

        print(f"Media URL: {media_url}")
        print(f"Content-Type: {content_type}")

        if content_type == "application/pdf":
            msg.body("Wait... I'm downloading the PDF")

            response = requests.get(media_url, auth=HTTPBasicAuth(ACCOUNT_SID, AUTH_TOKEN))
            if response.status_code == 200:
                file_name = f"received_{sender.replace('whatsapp:', '')}.pdf"
                with open(file_name, "wb") as f:
                    f.write(response.content)
                print(f"PDF saved as: {file_name}")
            else:
                print("Failed to download media.")
        else:
            msg.body("I only handle PDF files right now.")
    else:
        if incoming_msg:
            lower_msg = incoming_msg.lower()
            if "hi" in lower_msg:
                msg.body("Hey! How can I help you today?")
            elif "pdf" in lower_msg:
                selected_pdf = random.choice(PDF_LINKS)
                msg.body("Here's a random PDF for you!")
                msg.media(selected_pdf)

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
