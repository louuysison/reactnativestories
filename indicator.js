import React, {Component} from 'react';
import { StyleSheet, View, Animated } from 'react-native';
// import { observer } from 'mobx-react/native';
// import store from './store';


export default class Indicator extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  setWidthFromLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({ width });
  }

  render() {
    const { animate, selected, i, anim } = this.props;
    let style = {};


    if (animate) {
      style = {
      width: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this.state.width],
          extrapolate: 'clamp'
        })
      };
    } else if (selected > i) { // seen
      style = { flex: 1 };
    } else if (selected <= i) { // coming
      style = { width: 0 };
    }

    return (
      <View style={styles.line} onLayout={this.setWidthFromLayout.bind(this)}>
        <Animated.View style={[styles.progress, style]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 1,
    height: 2,
  },
  progress: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 2,
  },
});
