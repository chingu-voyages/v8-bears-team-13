import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addEntry,
  editEntry,
  deleteEntry,
  dashDefault,
  getLatestEntries
} from '../../actions/dashActions';

import Add from './Add';
import EditEntry from './EditEntry';
import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';
import Loader from '../loader/Loader';

import formatMoney from '../../helpers/formatMoney';

class Container extends React.Component {
  static defaultProps = {
    latestEntries: []
  };

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = () => {
    this.props.getLatestEntries(this.props.auth.userId);
  };

  render() {
    const entries = () => {
      const { latestEntries } = this.props;

      if (this.props.loading) return <Loader />;
      if (latestEntries !== undefined) {
        return (
          <EntryList
            entries={latestEntries}
            editEntry={this.props.editEntry}
            deleteEntry={this.props.deleteEntry}
          />
        );
      }
    };

    const index = () => {
      const { status, latestEntries } = this.props;
      let income = 0;
      let expense = 0;
      let savings = 0;
      if (latestEntries) {
        latestEntries.forEach((entry) => {
          if (!entry.transact_id) {
            income += parseFloat(entry.amount);
          } else {
            expense += parseFloat(entry.amount);
          }
        });
        savings = income - expense;
      }

      if (status === 'add') {
        return (
          <div>
            <Add getLatestEntries={this.fetchEntries} />
          </div>
        );
      }
      if (status === 'edit') {
        return (
          <div>
            <EditEntry getEntries={this.fetchEntries} />
          </div>
        );
      }
      if (status === 'dash') {
        const savedClasses = savings >= 0
          ? 'dash__saved--big dash__saved--green'
          : 'dash__saved--big dash__saved--red';

        return (
          <>
            <h1 className="heading--main">Dashboard</h1>
            <div className="dash__saved">
              <p>
                You've saved <span className={savedClasses}>{formatMoney(savings)}</span> so
                far this month.
              </p>
            </div>
            <DashboardSummary income={income} expense={expense} />
            <button className="button dash__button" type="button" onClick={this.props.addNewEntry}>
              Add Entry
            </button>
            <h2 className="heading--sub">Recent Entries</h2>
            {entries()}
          </>
        );
      }
    };

    return (
      <div className="content">
        <div className="dash">{index()}</div>
      </div>
    );
  }
}

Container.propTypes = {
  status: PropTypes.string.isRequired,
  addNewEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  getLatestEntries: PropTypes.func.isRequired,
  latestEntries: PropTypes.array,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  status: state.dash.status,
  auth: state.auth,
  latestEntries: state.dash.latestEntries,
  loading: state.loading.isLoading
});

const mapDispatchToProps = dispatch => ({
  addNewEntry: () => {
    dispatch(addEntry());
  },
  editEntry: (entry) => {
    dispatch(editEntry(entry));
  },
  deleteEntry: (entryId) => {
    dispatch(deleteEntry(entryId));
  },
  setDashDefault: () => {
    dispatch(dashDefault());
  },
  getLatestEntries: (userId) => {
    dispatch(getLatestEntries(userId));
  }
});

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Dashboard;
