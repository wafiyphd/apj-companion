import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";

function App() {
  const [getMessage, setMessage] = useState({});
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
                A <b>work in progress</b>. Fetch the profile picture of an
                Instagram account by entering their username. Just enter the
                username in the input field below and you are good to go!
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
              setTimeout(() => {
                axios
                  .post("http://localhost:5000/flask/ig", {
                    username: values.inUsername,
                  })
                  .then((response) => {
                    console.log(response);
                    setMessage(response);
                    if (response.data.status === "success") {
                      setURL("/ig/" + values.inUsername + ".jpg");
                    } else {
                      setURL({});
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                setSubmitting(false);
              }, 1200);
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
                <div className="row d-flex justify-content-center">
                  <div className="col-11 col-md-6">
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

          <div className="row my-5">
            <div className="col-12 text-center">
              {getMessage.status === 200 ? (
                <p>{getMessage.data.message}</p>
              ) : (
                <p>Fetch details goes here</p>
              )}
            </div>
          </div>
          <div className="row my-5">
            <div className="col-12 text-center justify-content-center">
              {Object.keys(getURL).length !== 0 && (
                <>
                  <img src={getURL} className="img-fluid" alt="logo" />
                </>
              )}
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
