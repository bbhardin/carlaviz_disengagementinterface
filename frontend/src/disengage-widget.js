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
  background:"#ededed",
  width: "500px", // TODO: Need to update this
  position: "absolute", // Puts it on top of the map
  color: "black", 
  borderRadius: "1rem",
  fontSize: "25px",
  fontWeight: "600", 
  // verticalAlign: "bottom"
}));

const DisengageIcon = styled.img(props => ({
    width: "2.6rem",
    transform: "translate(-2.3rem, 5px)",
    float: "left"
}));

const SteeringIcon = styled.img(props => ({
  padding: "1rem",
  width:"3.8rem",
  float: "left",
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
    const value2 = streams.light && streams.light.data && streams.light.data.variable;

    const styleProps = {theme, userStyle: style.light};

    return (
      <Container theme={theme} style={{}} showWarning={showWarning}>
        {(value2) && (
          <div>
            <SteeringIcon src={steeringwheel_icon}></SteeringIcon>
            <DisengageIcon src={warning_icon}  onHover={this.animate.bind(this)}></DisengageIcon>
            <LabelComponent userStyle={style.label} style={{width:"200%", paddingTop:"1.6rem", transform: "translate(-1.5rem, 0)"}}>
                {"Possible Disengagement Ahead"}
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