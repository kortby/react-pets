import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import '../css/App.css';
import React, { Component } from 'react';
import { findIndex, without } from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myApts: [],
      lastIndex: 0,
      formDisplay: false,
      queryText: '',
      orderBy: 'ownerName',
      orderDir: 'asc',
    };
    this.deleteApt = this.deleteApt.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.AddApt = this.AddApt.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(name, value, id) {
    let tempApts = this.state.myApts;
    let aptIndex = findIndex(this.state.myApts, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myApts: tempApts
    });
  }

  deleteApt(apt) {
    let tempApts = this.state.myApts;
    tempApts = without(tempApts, apt);

    this.setState({
      myApts: tempApts
    });
  }

  searchApts(query) {
    this.setState({
      queryText: query
    });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    })
  }

  AddApt(apt) {
    let tempApts = this.state.myApts;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myApts: tempApts,
      lastIndex: this.state.lastIndex + 1,
    })
  }
  
  componentDidMount() {
    fetch('./data.json').then(response => response.json())
      .then(result => {
        const apts = result.map(item =>{
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myApts: apts,
        });
      });
  }

  render() {
    let order;
    let filteredApts = this.state.myApts;
    if(this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['petName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['ownerName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                <div className="row">
                  <div className="col">
                    <AddAppointments 
                      formDisplay={this.state.formDisplay}
                      toggleForm={this.toggleForm}
                      AddApt={this.AddApt}
                       />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <SearchAppointments 
                      orderBy={this.state.orderBy}
                      orderDir={this.state.orderDir}
                      changeOrder={this.changeOrder}
                      searchApts={this.searchApts} />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                  <ListAppointments 
                    apts={filteredApts} 
                    lastIndex={this.state.lastIndex}
                    deleteApt={this.deleteApt}
                    updateInfo={this.updateInfo} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
