/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedAccountLoginMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { useHistory } from "react-router-dom";
import { loginSchema } from "./validation.schema";
import { AuthContext } from "contexts/auth/auth.context";
import { storeLoginDetails } from "utils";
import UserContext from "contexts/user/user.provider";
import GoogleSocialAuth from "./GoogleSocialAuth";
import { Typography } from "@material-ui/core";

const Login = () => {
  const { authDispatch } = React.useContext(AuthContext);
  const { setRefetchUser } = React.useContext(UserContext);
  const alert = useAlert();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const showNotification = (data, errors, alert) => {
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }

    const successful = maybe(() => data.tokenAuth.success);

    if (successful) {
      alert.show(
        {
          title: "Login Successful",
        },
        { type: "success", timeout: 5000 },
      );
      setRefetchUser((curr) => !curr);
    } else {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.tokenAuth.errors, []),
      );
      alert.show(
        {
          title: nonFieldErr?.nonFieldErrors,
        },
        { type: "error", timeout: 5000 },
      );
    }
  };

  return (
    <TypedAccountLoginMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(registerUser, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          registerUser({
            variables: values,
          }).then(({ data }) => {
            const successful = maybe(() => data.tokenAuth.success);
            if (successful) {
              storeLoginDetails(
                successful,
                history,
                data,
                setErrors,
                setSubmitting,
                "login",
              );
              authDispatch({
                type: "LOGIN_SUCCESS",
              });
              history.push("/dashboard");
            }
          });
        }
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="login">
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    icon="ln ln-icon-Mail"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Password"
                    name="password"
                    icon="ln ln-icon-Lock-2"
                  />

                  <hr />
                  <div style={{ marginTop: "10px" }}>
                    {/*<GoogleLogin
                      clientId="948225711672-3553sbnjkq2kcuma94grhd4hl7935ahp.apps.googleusercontent.com"
                      buttonText="Continue with Google"
                      onSuccess={googleResponse}
                      onFailure={googleResponse}
              />*/}
                  </div>

                  <div className="flex justify-end items-center text-sm font-bold mt-8 gap-4">
                    <a
                      className="text-blue-700 px-4 py-1 rounded"
                      onClick={() =>
                        authDispatch({
                          type: "FORGOTPASS",
                        })
                      }
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    fullwidth
                    isLoading={loading}
                    title={loading ? "authenticating... " : "Login"}
                    style={{ color: "#ffffff", margin: "16px 0" }}
                    //   {...(loading && { disabled: true })}
                  />
                  <Typography variant="body2" style={{ color: "grey" }}>
                    or
                  </Typography>
                  <GoogleSocialAuth />
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedAccountLoginMutation>
  );
};

export default Login;
