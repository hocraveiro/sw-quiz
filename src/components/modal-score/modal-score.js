import React, {Component} from 'react';
import style from './modal-score.scss';

class ModalScore extends Component {
  constructor(props){
    super(props);
    
    this.state = {name: '', email: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    const rankJSON = localStorage.getItem('rank') ;
    let rank = JSON.parse(rankJSON);

    if(!rank){
      rank = []
    }

    const index = rank.findIndex(p => p.email == this.state.email);

    const newPerson = {
      name: this.state.name, 
      email: this.state.email, 
      points : this.props.points
    };

    if(index > -1){
      rank[index] = newPerson;
    }else{
      rank.push(newPerson);
    }

    localStorage.setItem('rank', JSON.stringify(rank))
    this.props.onClose();
    event.preventDefault();
  }

  render(){
    return (
      <div className={style.modalscore}>
        <h1 className={style.title}>Quiz completed</h1>
        <h1 className={style.points}>You scored <span>{this.props.points}</span> points!</h1>
        <p>Type the form to save your score</p>
        <form className={style.formsave} onSubmit={this.handleSubmit}>
          <label className={style.label}>Name:</label>
          <input required className={style.input} type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <label className={style.label}>E-mail:</label>
          <input required className={style.input} type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
          {/* <SwButton>Submit</SwButton> */}
          <input className={style.btn} type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default ModalScore;