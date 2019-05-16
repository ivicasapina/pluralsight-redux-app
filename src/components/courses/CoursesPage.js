import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  }

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

  handleDeleteCourse = (course) => {
    toast.success("Course deleted.");
    this.props
      .deleteCourse(course)
      .catch(error => {
        toast.error("Delete failed. " + error.message, { autoClose: false })
      });
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading
          ? <Spinner />
          : (
            <>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-course"
                onClick={() => this.setState({ redirectToAddCoursePage: true })}
              >
                Add Course
              </button>
              <CourseList
                courses={this.props.courses}
                onDeleteClick={this.handleDeleteCourse}
              />
            </>
          )
        }
      </>
    );
  }
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
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
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);