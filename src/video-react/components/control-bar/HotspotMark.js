import styled from 'styled-components';

const HotspotMark = styled.div`
  left: ${props => props.percent > 0.7 ? -156 : -1}px;
  position: absolute;
  bottom: -28px;
  font-size: 16px;
  text-align: left;
  color: yellow;
`;

export default HotspotMark;
