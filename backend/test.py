from flask_restful import Api, Resource, reqparse
from flask import request
from instaloader import Instaloader, Profile
from pathlib import Path
from os import environ

class Test(Resource):
  def get(self):
    app_name = environ.get('APP_NAME')
    current_dir = Path(__file__)
    project_dir = [p for p in current_dir.parents if p.parts[-1]==app_name][0]
    return {
      'resultStatus': 'success',
      'message': "Hello! This is the mini APJC Web App",
      'test_current': str(current_dir),
      'test_project': str(project_dir)
      }