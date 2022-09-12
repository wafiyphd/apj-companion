from flask_restful import Api, Resource, reqparse
from flask import request
from instaloader import Instaloader, Profile
from pathlib import Path
from os import environ

class CheckIG(Resource):
  def get(self):
    return {
      'resultStatus': 'success',
      'message': "Hello! This is the IG checker API"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str)

    app_name = environ.get('APP_NAME')
    session_file_path = environ.get('SESSION_FILE')

    current_dir = Path(__file__)
    project_dir = [p for p in current_dir.parents if p.parts[-1]==app_name][0]
    session_file = str(project_dir) + session_file_path

    print(app_name)
    print(session_file_path)
    print(current_dir)
    print(session_file)

    args = parser.parse_args()

    print(args)
    # the post request from the frontend needs to match the strings here (e.g. 'username')

    request_json = args['username']
    inUsername = request_json

    if inUsername:
        try:
            L = Instaloader(max_connection_attempts=1)
            L.load_session_from_file('wafiyae', str(session_file))
            profile = Profile.from_username(L.context, inUsername)
            status = "Username exists"
            message = "The username {} is okay!".format(inUsername)
        except Exception as e:
            status = "Does not exists"
            message = "The username {} does not exist.".format(inUsername)
            
    else:
      message = "No username received"
    
    final_ret = {"status": status, "message": message }

    return final_ret