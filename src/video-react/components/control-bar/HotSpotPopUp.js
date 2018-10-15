import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class HotspotPopUp extends Component {
  static propTypes = {
    mouseTime: PropTypes.number,
    percent: PropTypes.number,
    changePlayTime: PropTypes.func,
  }

  componentDidMount() {
    const { mouseTime } = this.props;
    const canvas = this.refs.canvas;
    this.video = document.getElementById('canvas_video');
    this.video.currentTime = parseInt(mouseTime);
    this.video.pause();
    this.ctx = canvas.getContext("2d");
    const cmp = this;
    this.video.oncanplaythrough = function() {
      cmp.ctx.drawImage(cmp.video, -20, -10, 190, 120);
    };
  }
  
  render() {
    const { mouseTime, percent, changePlayTime } = this.props;
    const hrs = parseInt(mouseTime / 3600);
    const mins = parseInt(mouseTime / 60);
    const secs = parseInt(mouseTime % 60);
    const timeStr = `${hrs >= 10 ? hrs : '0' + hrs}:${mins >= 10 ? mins : '0' + mins}:${secs >= 10 ? secs : '0' + secs}`;

    return (
      <ArrowPopup percent={percent}>
        <figure onClick={() => changePlayTime(mouseTime)}>
          <canvas ref="canvas" width={150} height={100} />
          <figcaption>{timeStr}</figcaption>
        </figure>
      </ArrowPopup>
    )
  }
}

export default HotspotPopUp;

const ArrowPopup = styled.div`
  position: relative;
  background: #9090908c;
  border: 2px solid #909090;
  border-radius: 5px;
  display: ${props => props.percent === 0 ? 'none' : 'block'};
  left: ${props => props.percent > 0.7 ? -156 : -12}px;

  &:after, &:before {
    top: 100%;
    left: ${props => props.percent > 0.7 ? '90%' : '10%'};
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #9090908c;
    border-width: 10px;
    margin-left: -10px;
  }
  
  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: #9090908c;
    border-width: 12px;
    margin-left: -12px;
  }

  & figure {
    margin: 15px;
    img {
      width: 150px;
      height: 100px;
    }
    figcaption {
      padding-top: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;
