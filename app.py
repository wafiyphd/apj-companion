from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from backend.FetchIG import FetchIG
from backend.CheckIG import CheckIG

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/session')
def instaloaderSession():
    return send_from_directory(app.static_folder, 'session')

api.add_resource(FetchIG, '/flask/ig')
api.add_resource(CheckIG, '/flask/check')