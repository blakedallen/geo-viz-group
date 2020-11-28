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

@app.route("/chart2")
def chart2():
    return render_template("multiline_chart.html")

@app.route("/predict", methods=["POST"])
def predict():
    p = request.get_json()
    years = p["years"]
    gt = p["gt"]
    res = gen_slr(years, gt)
    
    #Note: max sea level rise set here
    #https://www.usgs.gov/faqs/how-would-sea-level-change-if-all-glaciers-melted?qt-news_science_products=0#qt-news_science_products
    if res > 70:
        res = 70

    return json.dumps({"sea_level":res})

if __name__ == "__main__":
    app.run(debug=True)
