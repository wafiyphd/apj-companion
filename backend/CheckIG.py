from flask_restful import Api, Resource, reqparse
from flask import request
from instaloader import Instaloader, Profile

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

    args = parser.parse_args()

    print(args)
    # the post request from the frontend needs to match the strings here (e.g. 'username')

    request_json = args['username']
    inUsername = request_json

    if inUsername:
        try:
            L = Instaloader(max_connection_attempts=1)
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