import json
from flask import Flask
from flask import request
from flask import Response
from flask import render_template
from model import gen_slr

application = Flask(__name__, 
        template_folder="templates",
        static_folder="",
        static_url_path="")

@application.route('/')
@application.route('/index')
def hello_world():
    return render_template('sf.html')

@application.route('/sf')
def sf():
    return render_template('san_fran.html')

@application.route('/maui')
def maui():
    return render_template('maui.html')

@application.route('/ny')
def ny():
    return render_template('new_york.html')

@application.route("/chart2")
def chart2():
    return render_template("multiline_chart.html")

@application.route("/seattle")
def sea_map():
    return render_template("seattle.html")

@application.route("/about")
def about():
    return render_template("home.html")

@application.route("/predict", methods=["POST"])
def predict():
    p = request.get_json()
    try:
        years = int(p["years"])
        gt = int(p["gt"])
    except Exception as e:
        return json.dumps({
            "sea_level":0, 
            "error":str(e),
            "r":p})
    res = gen_slr(years, gt)
    #Note: max sea level rise set here
    #https://www.usgs.gov/faqs/how-would-sea-level-change-if-all-glaciers-melted?qt-news_science_products=0#qt-news_science_products
    if res > 70:
        res = 70

    return json.dumps({"sea_level":res, "r":p})

if __name__ == "__main__":
    application.run(debug=True)
