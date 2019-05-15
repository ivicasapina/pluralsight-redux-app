import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const ManageCoursePage = ({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
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

  }, []);

  return (
    <CourseForm
      course={course}
      authors={authors}
      onSave={() => { }}
      onChange={() => { }}
      saving={false}
      errors={errors}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);