from flask_restful import Api, Resource, reqparse
from flask import request
from instaloader import Instaloader, Profile

class FetchIG(Resource):
  def get(self):
    return {
      'resultStatus': 'success',
      'message': "Hello! This is the mini APJC Web App"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str)

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_json = args['username']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    inUsername = request_json

    if inUsername:
        try:
            message = "Requested IG username: {}".format(inUsername)
            L = Instaloader(dirname_pattern="frontend/public/ig",title_pattern=inUsername,save_metadata=False,compress_json=False,max_connection_attempts=1)
            profile = Profile.from_username(L.context, inUsername)
            print(L.download_profile(inUsername,profile_pic_only=True))
            status = "success"
            
        except Exception as e:
            status = "fail"
            message = "An error has occured! {}".format(e)
            
    else:
      message = "No username received"
    
    final_ret = {"status": status, "message": message}

    return final_ret