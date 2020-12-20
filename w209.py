from flask import Flask, render_template
import json
from flask import request
from flask import Response
import os
app = Flask(__name__)
APP_FOLDER = os.path.dirname(os.path.realpath(__file__))

@app.route("/")
@app.route("/about")
def w209():
    return render_template("about.html")

@app.route("/a1p2")
def a1p2():
    # file="background.jpg"
    return render_template("index.html")


@app.route('/index')
def hello_world():
    return render_template('new_york.html')

@app.route('/sf')
def sf():
    return render_template('san_fran.html')

@app.route('/maui')
def maui():
    return render_template('maui.html')

@app.route('/ny')
def ny():
    return render_template('new_york.html')

@app.route("/seattle")
def sea_map():
    return render_template("seattle.html")

@app.route("/predict", methods=["POST"])
def predict():
    p = request.get_json()
    try:
        years = int(p["years"])
        gt = int(p["gt"])
        num_yrs = years - 2018
    except Exception as e:
        return json.dumps({
            "sea_level":0, 
            "error":str(e),
            "r":p})
    res = int((-34.74 + 0.136*(13.81+ 6.44*gt + 408.52) -21.36)/100*(1.016**num_yrs))
    #Note: max sea level rise set here
    #https://www.usgs.gov/faqs/how-would-sea-level-change-if-all-glaciers-melted?qt-news_science_products=0#qt-news_science_products
    if res > 70:
        res = 70
    if res < 0:
        res = 0
    

    return json.dumps({"sea_level":res, "r":p})


if __name__ == "__main__":
    app.run(debug=True)
