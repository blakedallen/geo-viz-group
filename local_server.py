import json
from flask import Flask
from flask import request
from flask import Response
from flask import render_template

from model import gen_slr

app = Flask(__name__, 
        static_folder="", 
        static_url_path="")




@app.route('/')
def hello_world():
    return render_template('seattle.html')

@app.route("/predict", methods=["POST"])
def predict():
    content = request.get_json()

    return json.dumps(content)

if __name__ == "__main__":
    app.run(debug=True)
