from livereload import Server, shell
from flask import Flask
from flask import render_template

app = Flask(__name__, template_folder='.')

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/<path:u_path>')
def catch_all(u_path):
    #assumes a static file is being called
    return render_template(u_path)

# remember to use DEBUG mode for templates auto reload
# https://github.com/lepture/python-livereload/issues/144
app.debug = True

server = Server(app.wsgi_app)
# server.watch
server.serve()