import React, { Component } from 'react';
import SwButton from '../../components/button';
import Container from '../../components/container';
import Logo from '../../components/logo';
import style from './home.scss';

class Home extends Component {
  
  startQuiz(){
    this.props.history.push('/quiz');
  }

  render() {
    return (
      <Container className={style.homecontainer}>
        <Logo className={style.logo} />
        <h1 className={style.title}>Welcome to the Star Wars Quiz</h1>
        <p className={style.intotitle}>Purpose of the game:</p>
        <p className={style.into}>To guess the name of the Star Wars characters using only photos, if you guess without using the help button (?) you score 10 points, if you use help you score 5 points. <br /> Guess as much as possible... <br /><strong>May the Force be with you</strong></p>
        <SwButton className={style.btn} onClick={this.startQuiz.bind(this)}>Start Quiz</SwButton>
      </Container>
    );
  }
}

export default Home;
