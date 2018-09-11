import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import style from './timer.scss';
/**
 * 
 * @param {*} time - Time in minutes
 */
class Timer extends Component {
  constructor(props){
    super();
    this.state = {countDown: props.time || 120}
  }
  componentDidMount(){
    const interval = setInterval(() => {
      let countDown = --this.state.countDown;
      const minutes = this.state.countDown * 60;
      const seconds = countDown - minutes;
      countDown = this.state.countDown / 60;

      this.setState({countDown, formated: `${parseInt(minutes)}:${seconds}`})

      if(countDown === 0){
        this.props.onComplete();
        clearInterval(interval);
      }
    }, 1000)
  }
  render () {
    return (
      <div className={style.timer}>
        <h1>Render {this.state.formated}</h1>
      </div>
    )
  }
}

// const Timer = ({time}) => {
//   const showTimer = () => {
//     var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
//     // Update the count down every 1 second
//     var x = setInterval(function() {

//       // Get todays date and time
//       var now = new Date().getTime();

//       // Find the distance between now and the count down date
//       var distance = countDownDate - now;

//       // Time calculations for days, hours, minutes and seconds
//       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // Display the result in the element with id="demo"
//       document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//       + minutes + "m " + seconds + "s ";

//       // If the count down is finished, write some text 
//       if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("demo").innerHTML = "EXPIRED";
//       }
//     }, 1000);
//   }

  
// }


export default Timer;