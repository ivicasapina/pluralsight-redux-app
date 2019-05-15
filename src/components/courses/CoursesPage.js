import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;
    if (courses.length === 0) {
      loadCourses()
        .catch(error => {
          alert("Loading courses failed " + error)
        });
    }
    if (authors.length === 0) {
      loadAuthors()
        .catch(error => {
          alert("Loading authors failed " + error)
        });
    }
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
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0
      ? []
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        }
      }),
    authors: state.authors
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);