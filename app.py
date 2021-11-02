from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from backend.FetchIG import FetchIG

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(FetchIG, '/flask/ig')