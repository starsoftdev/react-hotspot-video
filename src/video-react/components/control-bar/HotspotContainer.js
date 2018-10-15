import styled from 'styled-components';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

import HotspotMark from './HotspotMark';
import HotspotPopUp from './HotspotPopUp';

class HotspotContainer extends Component {
  static propTypes = {
    position: PropTypes.number,
    percent: PropTypes.number,
    time: PropTypes.number,
    activeHotspot: PropTypes.number,
    index: PropTypes.number,
    changePlayTime: PropTypes.func,
  }

  showHotspot = () => {
    const { hotspotsStatusChanged, index } = this.props;
    hotspotsStatusChanged(index);
  }

  render() {
    const { position, percent, time, activeHotspot, index, changePlayTime } = this.props;
    return (
      <Container position={position}>
        <HotspotMark>
          <FontAwesomeIcon icon="star"
            onMouseOver={() => this.showHotspot()}
            onClick={() => this.showHotspot()}
          />
        </HotspotMark>
        {activeHotspot === index && (
          <HotspotPopUp
            mouseTime={time}
            percent={percent}
            changePlayTime={changePlayTime}
            onMouseLeave={() => this.showHotspot()}
          />
        )}
      </Container>
    )
  }
}

export default HotspotContainer;

const Container = styled.div`
  position: absolute;
  left: ${props => props.position}px;
  bottom: 35px;
`;
