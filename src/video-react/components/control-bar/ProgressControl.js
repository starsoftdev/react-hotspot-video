import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import * as Dom from '../../utils/dom';
import SeekBar from './SeekBar';
import HotspotContainer from './HotspotContainer';

const propTypes = {
  player: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string,
};

const hotspots = [
  {
    time: 15,
  },
  {
    time: 28,
  },
  {
    time: 40,
  } 
];

export default class ProgressControl extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      mouseTime: {
        time: null,
        position: 0,
      },
    };

    this.handleMouseMoveThrottle = this.handleMouseMove.bind(this);
    this.hotspotsCopy = [];
  }

  componentDidMount() {
    this.hotSpotsInterval = setInterval(() => {
      this.getHotspots();
    }, 100);
  }

  
  componentWillUnmount() {
    clearInterval(this.hotSpotsInterval);
  }
  

  handleMouseMove(event) {
    if (!event.pageX) {
      return;
    }
    const { player: { duration } } = this.props;
    const node = findDOMNode(this.seekBar);
    const newTime = Dom.getPointerPosition(node, event).x * duration;
    const percent = Dom.getPointerPosition(node, event).x;
    const position = event.pageX - Dom.findElPosition(node).left;

    this.setState({
      mouseTime: {
        time: newTime,
        position,
        percent,
      },
    });
  }


  getHotspots = () => {
    const { player: { duration } } = this.props;
    const node = findDOMNode(this.seekBar);
    if (node && Dom.findElPosition(node).width !== 0) {
      let hotspotsCopy = [];
      hotspots.forEach(({ time }) => {
        const obj = {};
        obj.time = time;
        obj.percent = time / duration;
        obj.position = node !== null ? Dom.findElPosition(node).width * obj.percent : 0;
        hotspotsCopy.push(obj);
      });
      clearInterval(this.hotSpotsInterval);
      this.hotspotsCopy = hotspotsCopy;
    }
  }

  hotspotsStatusChanged = (val) => {
    const { activeHotspot } = this.state;
    if (activeHotspot !== val) {
      this.setState({ activeHotspot: val });
      setTimeout(() => {
        this.setState({ activeHotspot: undefined });
      }, 5000);
    }
  }

  changePlayTime = (newTime) => {
    const { actions } = this.props;
    actions.seek(newTime);
    actions.handleEndSeeking(newTime);
  }

  render() {
    const { className } = this.props;
    const { activeHotspot } = this.state;
    return (
      <div
        style={{ position: 'relative' }}
        onMouseMove={this.handleMouseMoveThrottle}
        className={classNames('video-react-progress-control video-react-control', className)}
      >
        <SeekBar
          mouseTime={this.state.mouseTime}
          ref={
            (c) => {
              this.seekBar = c;
            }
          }
          {...this.props}
        />
        {this.hotspotsCopy.map((item, index) => (
          <HotspotContainer
            key={index}
            index={index}
            position={item.position}
            time={item.time}
            percent={item.percent}
            activeHotspot={activeHotspot}
            changePlayTime={this.changePlayTime}
            hotspotsStatusChanged={this.hotspotsStatusChanged}
          />
        ))}
      </div>
    );
  }
}

ProgressControl.propTypes = propTypes;
ProgressControl.displayName = 'ProgressControl';
