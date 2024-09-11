// Heavily inspired by streetscape gl traffic-light-widget.js (https://github.com/aurora-opensource/streetscape.gl/blob/master/modules/core/src/components/hud/traffic-light-widget.js)
// Author: Benjamin Hardin (benjamin.hardin@cs.ox.ac.uk)


import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {evaluateStyle} from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';

import BaseWidget from '@streetscape.gl/core/dist/esm/components/hud/base-widget';

import steeringwheel_icon from './icons/steeringwheel.png';
import warning_icon from './icons/warning.png';

const Container = styled.div(props => ({
  display: 'flex',
  justifyContent: 'left',
  flexDirection: props.layout === 'vertical' ? 'column' : 'row',
  // 238, 210, 0, 255   eed202
  //background: "#eed202",
  background:"white",
  width: "500px", // TODO: Need to update this
  // height: "100px",
  position: "absolute", // Puts it on top of the map
  color: "black", 
  fontSize: "25px",
  fontWeight: "600"
  // verticalAlign: "bottom"
}));


const DisengageIcon = styled.img(props => ({
    padding: "1rem",
    width:"4rem",
    float: "left",
}));


const COLORS = {
  red: '#d42e22',
  yellow: '#f8ce46',
  green: '#57ad57'
};

const LightComponent = styled.div(props => ({
  boxSizing: 'border-box',
//   width: props.theme.controlSize,
//   height: props.theme.controlSize,
  margin: props.theme.spacingTiny,
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: COLORS[props.color],
  background: props.isOn ? COLORS[props.color] : 'none',
  width: 0,
  height: 0,
  borderLeftStyle: 'transparent',
  borderRightStyle: 'transparent',
  borderBottomStyle: 'solid',
  borderBottomColor: '#555',
  borderLeft: '25px',
  borderRight: '25px',
  borderBottom: '50px',
  ...evaluateStyle(props.userStyle, props),
}));


const LabelComponent = styled.div(props => ({
    fontSize: props.theme.fontSize,
    color: props.theme.textColorSecondary,
    //lineHeight: '1em',
    ...evaluateStyle(props.userStyle, props)
  }));

export default class DisengageWidget extends PureComponent {
  static propTypes = {
    log: PropTypes.object.isRequired,
    streamName: PropTypes.string.isRequired,
    style: PropTypes.string, // Change this back to PropTypes.object
    label: PropTypes.string,
    transformValue: PropTypes.func,
    showWarning: PropTypes.func
  };

  static defaultProps = {
    style: {},
    transformValue: x => x,
    showWarning: _ => null
  };

  _render = ({theme, streams}) => {
    const {log, transformValue, style, label, showWarning} = this.props;
    const value = style.data;
    const value2 = streams.light && streams.light.data && streams.light.data.variable;

    const styleProps = {theme, userStyle: style.light};

    return (
      <Container theme={theme} style={{}} showWarning={showWarning}>
        {(value2) && (
          <div>
            <DisengageIcon src={warning_icon}></DisengageIcon>
            <LabelComponent userStyle={style.label} style={{width:"200%", paddingTop:"1.5rem"}}>
                {"Disengagement reported here!"}
            </LabelComponent>
          </div>
        )}
        {/* <LightComponent key="red" color="red" isOn={value === 'red'} {...styleProps} />
        <LightComponent key="yellow" color="yellow" isOn={value === 'yellow'} {...styleProps} />
        <LightComponent key="green" color="green" isOn={value === 'green'} {...styleProps} /> */}
      </Container>
    );
  };

  render() {
    const {log, style, streamName} = this.props;

    return (
      <BaseWidget log={log} style={style} streamNames={{light: streamName}}>
        {this._render}
      </BaseWidget>
    );
  }
}