import { Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import google from '../../images/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    photo: '',
    error: '',
    success: false,
  });
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        const { displayName, photoURL, email } = user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email
        }
        localStorage.setItem('user', JSON.stringify(signedInUser));
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      }).catch((error) => {
        const { code, message, credential, email } = error;
        console.log(code, message, email)
      });
  }

  const handleOnBlur = (e) => {
    let isFormValid = true;
    let isPassValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPassLen = e.target.value.length > 6;
      const passHasNum = /\d{1}/.test(e.target.value)
      isFormValid = isPassLen && passHasNum;
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
    if (e.target.name === 'ConfirmPassword') {
      const isPassLen = e.target.value.length > 6;
      const passHasNum = /\d{1}/.test(e.target.value)
      isFormValid = isPassLen && passHasNum;
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }

    if (isFormValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      newUser.isSignedIn = true;
      setUser(newUser);
      setLoggedInUser(newUser);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user };
          newUser.error = ''
          newUser.success = true;
          newUser.isSignedIn = true;
          setUser(newUser);
          updateUserName(user.name)
          setLoggedInUser(newUser);
          history.replace(from);

        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);
          setLoggedInUser(newUser)
        });
    }
    if (!newUser && user.name, user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user };
          newUser.error = ''
          newUser.success = true;
          newUser.name = res.user.displayName;
          newUser.isSignedIn = true;
          setUser(newUser);
          setLoggedInUser(newUser);
          history.replace(from);

        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);
          setLoggedInUser(newUser)

        });
    }
    e.preventDefault()
  }
  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('user name updated successfully')
    }).catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="container form-container">
      <div>
        <Form className="sing-form" onSubmit={handleSubmit}>
          {newUser ? <p className="login-header-info">Create an account</p> : <p className="login-header-info">Login</p>}
          {newUser && <Form.Group controlId="formBasicName">
            <Form.Label className='name-signup'>Name</Form.Label>
            <Form.Control type="name" onBlur={handleOnBlur} name="name" placeholder="Enter Name" />
          </Form.Group>}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className='email-from'>Email address</Form.Label>
            <Form.Control type="email" onBlur={handleOnBlur} name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='password-from'>Password</Form.Label>
            <Form.Control type="password" onBlur={handleOnBlur} name="password" placeholder="Password" />
          </Form.Group>
          {newUser && <Form.Group controlId="formBasicPassword">
            <Form.Label className='password-from'>Password</Form.Label>
            <Form.Control type="password" onBlur={handleOnBlur} name="ConfirmPassword" placeholder="Confirm Password" />
          </Form.Group>}
          <Button variant="primary" type="submit">
            {newUser ? 'Sign Up' : 'Sign In'}
          </Button>
          <div onClick={() => setNewUser(!newUser)}>
            {newUser ? <p>Already have an account?<Link>login</Link></p> : <p>Don't have an account? <Link>Create an account</Link></p>}
          </div>
        </Form>
      </div>
      <div>
        <p className="or-icon">------------------- or -------------------</p>
        <button onClick={handleGoogleSignIn} className="social-btn"><img src={google} alt="" className="icon-img" />Continue with Google</button>
      </div>

      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>}
    </div>
  );
};

export default Login;