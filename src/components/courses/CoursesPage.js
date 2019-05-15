import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
  componentDidMount() {
    this.props.actions.loadCourses()
      .catch(error => {
        alert("Loading courses failed " + error)
      });
  }

  render() {
    return (
      <Fragment>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </Fragment>
    );
  }
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    courses: state.courses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);