import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment'; 

const ExperienceItem = ({ 
  experience: {
    company,
    title,
    description,
    from,
    to,
  }
}) => {
  return (
    <div>
      <h3 class="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
      </p>
      <p><strong>Position: </strong>{title}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
)};

ExperienceItem.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ExperienceItem;
