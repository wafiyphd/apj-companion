import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import {} from "dotenv/config";

function App() {
  const [getMessage, setMessage] = useState({});
  const [getBiography, setBiography] = useState({});
  const [getURL, setURL] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="container-fluid">
      <div className="container py-5 min-vh-100">
        <div className="my-auto">
          <div id="header" className="row justify-content-center my-5">
            <div className="col-12 d-flex justify-content-center">
              <img
                src="/alfred.png"
                className="img-fluid my-4 mx-auto"
                alt="logo"
              />
            </div>
            <div className="col-12 text-center">
              <h1>APJC</h1>
            </div>
            <div className="col-12 text-center my-4">
              <p>
                A <b>work in progress</b>. Fetch the profile picture and
                biography of an Instagram account by entering their username.
                Just enter the username in the input field below and you are
                good to go!
                <br />
                <br />
                <small>Not for external use.</small>
              </p>
            </div>
          </div>

          <Formik
            initialValues={{ inUsername: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.inUsername) {
                errors.inUsername = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              //const API_URL = process.env.REACT_APP_API_URL;
              //const FETCH_URL = API_URL + "/flask/ig";

              setTimeout(() => {
                axios
                  .post("https://apjc.herokuapp.com/flask/ig", {
                    username: values.inUsername,
                  })
                  .then((response) => {
                    setMessage(response);
                    if (response.data.status === "success") {
                      setURL("/ig/" + values.inUsername + ".jpg");
                      setBiography(response.data.biography);
                    } else {
                      setURL({});
                      setBiography({});
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="w-100" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center my-5">
                  <div className="col-11 col-md-7">
                    <div className="card input-card">
                      <h2>Who are you looking for...?</h2>
                      <label className="input my-4">
                        <input
                          className="input-field"
                          type="text"
                          name="inUsername"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.inUsername}
                          placeholder="e.g. apasajabrunei"
                          autoComplete="off"
                        />
                        <span className="input-label">IG Username</span>
                        <span className="form-error">
                          {errors.inUsername &&
                            touched.inUsername &&
                            errors.inUsername}
                        </span>
                      </label>

                      {isSubmitting ? (
                        <div className="lds-ring">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        <button className="btn" type="submit">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>

          <div className="row my-5 justify-content-center">
            <div className="col-11 col-md-5 card card-fetch">
              <div className="row">
                <div className="col-12 text-center mb-4">
                  <h2>Fetch details</h2>
                </div>
                {Object.keys(getURL).length === 0 && (
                  <div className="col-12 text-center my-5">
                    <p>
                      Nothing to see here yet, go ahead and fetch a username!
                    </p>
                  </div>
                )}
                {Object.keys(getURL).length !== 0 && (
                  <div className="col-12 text-center justify-content-center">
                    <img src={getURL} className="img-fluid" alt="logo" />
                  </div>
                )}
                {getMessage.status === 200 && (
                  <div className="col-12 text-center mt-4">
                    <p>{getMessage.data.message}</p>
                  </div>
                )}
                {Object.keys(getBiography).length !== 0 && (
                  <div className="col-12 text-center justify-content-center">
                    <p className="mb-4">{getBiography}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p className="py-4 text-center">
          Copyright &copy; 2021. All Rights Reserved.
          <br />A <b>Wafiy</b> Project.
        </p>
      </footer>
    </div>
  );
}

export default App;
