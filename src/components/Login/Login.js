import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'Input_email') {
    return { value: action.value, isvalid: action.value.includes('@') }
  }
  if (action.type === 'Input_blur') {
    return { value: state.value, isvalid: state.value.includes('@') }
  }
  return {
    value: '',
    isvalid: false
  }
}

const passwordReducer = (state, action) => {
  if (action.type === 'Input_password') {
    return { value: action.value, isvalid: action.value.trim().length > 6 }
  }
  if (action.type === 'Input_blur') {
    return { value: state.value, isvalid: state.value.trim().length > 6 }
  }
  return {
    value: '',
    isvalid: false
  }
}

const Login = (props) => {
  const [emailstate, dispatchemail] = useReducer(emailReducer, {
    value: '',
    isvalid: false
  })

  const [passwordstate, dispatchpassword] = useReducer(passwordReducer, {
    value: '',
    isvalid: false
  })
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredColgname, setEnteredColgname] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      emailstate.value.includes('@') && passwordstate.value.trim().length > 6 && enteredColgname.trim().length > 0
    );
  }, [emailstate, passwordstate, enteredColgname])

  const emailChangeHandler = (event) => {
    dispatchemail({
      type: 'Input_email',
      value: event.target.value
    })
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({
      type: 'Input_password',
      value: event.target.value
    })
    // setEnteredPassword(event.target.value);
  };

  const colgnameChangeHandler = (event) => {
    setEnteredColgname(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchemail({
      type: 'Input_blur'
    })
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchpassword({
      type: 'Input_blur'
    })
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input isvalid={emailstate.isvalid} label="E-Mail" id="email" type="email" value={emailstate.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input isvalid={passwordstate.isvalid} label="Password" id="password" type="password" value={passwordstate.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <Input label="College Name" id="colgname" type="text" value={enteredColgname} onChange={colgnameChangeHandler} />
        {/* <div
          className={`${classes.control} ${emailstate.isvalid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${passwordstate.isvalid === false ? classes.invalid : ''
            }`}
        >
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            />
          </div> */}
        {/* <div
          className={`${classes.control} `}
        >
          <label htmlFor="password">College Name</label>
          <input
            type="text"
            id="colgname"
            value={enteredColgname}
            onChange={colgnameChangeHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
