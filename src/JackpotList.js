import React, { Component } from 'react';
import Spinner from './Spinner';
import JackpotItem from './JackpotItem';

class JackpotList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      jackpotList: []
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  // make the fetch to the Jackpot API
  // parse JSON and change state of application
  componentDidMount(){
    var _self = this;
    fetch('https://www.mfortune.co.uk/mk/jackpotservice/')
      .then(function(response){
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function(parsedJson) {
            _self.setState({
              loading: false,
              jackpotList: parsedJson
            });
          });
        } else {
          console.log("Error");
        }
      });
  }

  // Toggle a specified class for a list of HTMLElements
  toggleClass(classToToggle, ...list){
    list.forEach(elem => elem.classList.toggle(classToToggle));
  }

  // Handle the show/hide of the jackpot
  handleOnClick(e){
    e.preventDefault();
    const _self = this,
          buttonElem = e.currentTarget,
          jackpotValue = buttonElem.querySelector('.jackpot-value'),
          jackpotShow = buttonElem.querySelector('.jackpot-show');
    _self.toggleClass('no-events', buttonElem);
    _self.toggleClass('hidden', jackpotShow, jackpotValue);
    const timeout = setTimeout(function(){
      _self.toggleClass('no-events', buttonElem);
      _self.toggleClass('hidden', jackpotShow, jackpotValue);
      clearTimeout(timeout);
    }, 5000);
  }
  render() {
    const _self = this;
    if(this.state.loading){
      return (
        <Spinner />
      )
    }
    else{
      return (
        <ul className="jackpot-list">
          {
            this.state.jackpotList.map((item,index) => <JackpotItem key={index} api={item} onClick={_self.handleOnClick.bind(this)}/>)
          }
        </ul>
      )
    }
  }
}

export default JackpotList;
