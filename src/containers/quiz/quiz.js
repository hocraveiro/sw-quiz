import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import Modal from 'react-modal';
import Container from '../../components/container';
import List from '../../components/list';
import ModalScore from '../../components/modal-score';
import shuffle from '../../utils/suffle';
import logo from '../../sw-logo.svg';
import style from './quiz.scss';
import people from '../../swapi-data.json'

const date = Date.now() + 1000 * 120;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')


class Quiz extends Component {
  constructor(){
    super();
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    const peopleArray = people.map(person => {
      person.hit = false;
      person.showTip = false
      return person;
    });
    const peopleSuffle = shuffle(peopleArray);
    this.state = {people: peopleSuffle, loading: true, points: 0, modalIsOpen: false};
    
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    console.log('hereee')
    this.setState({modalIsOpen: false});
    this.props.history.push('/');
  }

  onTimerComplete(){
    this.openModal();
  }
  
  handleOnHit(person, name){
    const people = this.state.people;
    const index = people.findIndex(prs => prs.url === person.url);
    people[index].hit = true
    const points = this.state.points + ((people[index].showTip) ? 5 : 10);
    this.setState({people, points});
    setTimeout(() => {
      const nextInput = document.querySelector(`#person-${index+1}`);
      if(nextInput){
        nextInput.focus()
      }
    }, 200)
  }

  handleShowTip(person){
    const people = this.state.people;
    const index = people.findIndex(prs => prs.url === person.url);
    people[index].showTip = true;
    this.setState({people});
  }

  render() {
    return (
      <Container className={style.quizcontainer}>
        <div className={style.header}>
          <Container>
            <img src={logo} className={style.logo} alt="logo" />
            <div className={style.right}> 
              <p className={style.points}>{this.state.points} points</p>
              <Countdown date={date} onComplete={this.onTimerComplete.bind(this)}></Countdown>
            </div>
          </Container>
        </div>
        <List 
          people={this.state.people} 
          onShowTip={this.handleShowTip.bind(this)}
          onHit={this.handleOnHit.bind(this)}/>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <ModalScore points={this.state.points} onClose={this.closeModal}/>
        </Modal>
      </Container>
    );
  }
}

export default Quiz;

