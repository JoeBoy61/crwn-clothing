import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header-component/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {onSnapshot} from 'firebase/firestore' ;

import { selectCurrentUser } from './redux/user/user.selctor';





// import { render } from 'node-sass';

class App extends React.Component{
  unsubscribeFromAuth = null;

  // componentDidMount() {
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      
  //   });
  // }

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          }))
        }

        setCurrentUser(userAuth);
      });
    };
    // this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    // if(userAuth) {
    //   await createUserProfileDocument(userAuth)

    //   onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
    //     this.setState({
    //       currentUser: {
    //         id: doc.id,
    //         ...doc.data()
    //       }
    //     })
    //   })
    //   console.log(userAuth)
    // } else {
    //   this.setState({currentUser: userAuth})
    // }
 

      


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'></Redirect>) : (<SignInAndSignUpPage></SignInAndSignUpPage>)}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
