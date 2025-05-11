from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from scraper import get_cached_events

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Louder World API is running."

@app.route("/api/events")
def events():
    return jsonify(get_cached_events())

@app.route("/api/redirect", methods=["POST"])
def email_and_redirect():
    data = request.json
    email = data.get("email")
    event_url = data.get("event_url")
    # Here you could store the email to a DB or send to a service
    print(f"Collected email: {email} for event: {event_url}")
    return jsonify({"redirect_url": event_url})

if __name__ == "__main__":
    app.run(debug=True)
