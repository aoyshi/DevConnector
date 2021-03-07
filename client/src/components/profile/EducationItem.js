import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment'; 

const EducationItem = ({ 
  education: {
    school,
    degree,
    fieldOfStudy,
    description,
    from,
    to,
  }
}) => {
  return (
    <div>
      <h3 class="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
      </p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
)};

EducationItem.propTypes = {
  education: PropTypes.object.isRequired,
};

export default EducationItem;
