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
    p = request.get_json()
    years = p["years"]
    gt = p["gt"]
    res = gen_slr(years, gt)
    
    #Note: max sea level rise set here
    if res > 80:
        res = 80

    return json.dumps({"sea_level":res})

if __name__ == "__main__":
    app.run(debug=True)
