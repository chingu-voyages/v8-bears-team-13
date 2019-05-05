import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterBar from './FilterBar';
import SavingsCard from './SavingsCard';
import EntryList from '../entries/EntryList';

import formatMoney from '../../helpers/formatMoney';

import { getHistory } from '../../actions/historyActions';

import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider

import {
  addEntry, editEntry, deleteEntry, dashDefault, getLatestEntries
} from '../../actions/dashActions';

import Add from '../dashboard/Add';
import EditEntry from '../dashboard/EditEntry';
import DashboardSummary from '../dashboard/DashboardSummary';
import Loader from '../loader/Loader';


// Dummy Data
// import entries from '../../data/entries';



class Container extends Component {
  componentDidMount() {
    this.fetchHistory(1);
  }

  fetchHistory = async (num, transact, str) => {
    const qTransact = transact ? `&transact=${transact}` : '';
    const qStr = str ? `&str=${str}` : '';

    const url = `http://localhost:5000/api/history/month?num=${num}` +
      `${qTransact}` +
      `${qStr}`;
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(data => data.json())
    .then(results => {
      this.props.setGetHistory(results)
      
      })
    .catch(err => console.log(err))
    ;
    
    // change state so component refreshes
    // this.props.setGetHistory(entries);
  };


  render() {
    return (
      <div className="content">
        <h1 className="heading--main">History</h1>
        <div className="history">
          <FilterBar fetchHistory={this.fetchHistory}/>
          <h2 className="heading--sub">Showing results from...</h2>
          <SavingsCard income={1000} expenses={900} />
          <h2 className="heading--sub">Entries</h2>
          <EntryList entries={this.props.history} editEntry={this.props.editEntry} deleteEntry={this.props.deleteEntry} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.dash.status,
  auth: state.auth,
  latestEntries: state.dash.latestEntries,
  loading: state.loading.isLoading,
  history: state.history
});

const mapDispatchToProps = dispatch => {
  return {
    setGetHistory: (data) => {
      dispatch(getHistory(data));
    },
    editEntry: (entry) => {
      dispatch(editEntry(entry));
    },
    deleteEntry: (entryId) => {
      dispatch(deleteEntry(entryId));
    }  
  }
};

const History = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default History;
