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
  //display: 'flex',
  //justifyContent: 'left',
  //flexDirection: props.layout === 'vertical' ? 'column' : 'row',
  // 238, 210, 0, 255   eed202
  //background: "#eed202",
  background:"black",
  width: "500px", // TODO: Need to update this
  position: "absolute", // Puts it on top of the map
  color: "black", 
  borderRadius: "100px",
  fontSize: "20px",
  fontWeight: "600", 
  color: "white",
  textAlign: "center",
  // verticalAlign: "bottom"
}));

const BlueDot = styled.span(props => ({
  height: "15px",
  width: "70px",
  borderRadius: "7px",
  margin: "1.6rem",
  position: "relative",
  backgroundColor: props.engaged ? '#7df9ff' : "gray",
  display:"inline-block"
}));


const LabelComponent = styled.div(props => ({
    fontSize: props.theme.fontSize,
    color: props.theme.textColorSecondary,
    display: "inline-block",
    height: "100%",
    paddingTop: "1.1rem",
    //position: "absolute",
    //lineHeight: '1em',
    ...evaluateStyle(props.userStyle, props)
  }));

export default class AutomationWidget extends PureComponent {
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

  animate() {
    let pulse = `
    @-webkit-keyframes ${pulse} {
      0%, 100% {
        background-color: #f56a3f;
      }
      50% {
        background-color: #9e42b0;
      }
    }
    `;

    this.addStylesheetRules(pulse);
    this.setState({
      animation: "${pulse} 1s infinite"
    });
  }


  _render = ({theme, streams}) => {
    const {log, transformValue, style, label, showWarning} = this.props;
    const value = style.data;
    /* Soon to hold the automation value */
    const value2 = streams.light && streams.light.data && streams.light.data.variable;

    const styleProps = {theme, userStyle: style.light};

    return (
      <Container theme={theme} style={{}} showWarning={showWarning}>
        {/* Blue dots if engaged, gray dots if disengaged */}
        {(true) && (
          <div>
            <BlueDot engaged={true} style={{float: "left"}}></BlueDot>
            <LabelComponent userStyle={style.label} style={{}}>
                {"Automation: Engaged"}
            </LabelComponent>
            <BlueDot engaged={true} style={{float: "right"}}></BlueDot>
          </div>
        )}
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