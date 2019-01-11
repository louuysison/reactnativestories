/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated} from 'react-native';
import Indicator from './indicator';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const images = [
  'https://images.freeimages.com/images/large-previews/6fc/snowboarders-1387278.jpg',
  'https://images.freeimages.com/images/large-previews/326/sports-fan-1520239.jpg',
  'https://images.freeimages.com/images/large-previews/e99/rafting-in-jaciara-mato-grosso-brazil-1-1433217.jpg',
  'https://images.freeimages.com/images/large-previews/fd3/see-saw-2-1383521.jpg',
]

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      selected: 0,
      width: 0,
      indicatorAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animateIndicator();
  }

  setWidthFromLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({ width });
  }

  animateIndicator = (reset=true) => {
    if (reset) this.state.indicatorAnim.setValue(0);

    requestAnimationFrame(() => {
      Animated.timing(this.state.indicatorAnim, {
        toValue: 1,
        duration: 5000 * (1-this.state.indicatorAnim._value),
      }).start(({ finished }) => {
        console.log(finished);
        if (finished) this.onNextItem();
      });
    });
  }

  onNextItem = () => {
    this.setState(prevState => {
      const newSelected = (prevState.selected + 1) % images.length
      console.log(newSelected)
      return { selected: (prevState.selected + 1) % images.length }
    });
    this.animateIndicator();
  }

  renderIndicators() {
    const { story } = this.props;

    return (
      <View style={styles.indicatorWrap}>
        <View style={styles.indicators}>
          {images.map((item, i) => (
            <Indicator
              key={i} i={i}
              animate={this.state.selected == i}
              selected={this.state.selected}
              anim={this.state.indicatorAnim}
            />
          ))}
        </View>
      </View>
    );
  }

  render() {
    console.log(this.state.selected)
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: images[this.state.selected]}}
          style={{ height: '100%', width: '100%' }}
          resizeMode={'cover'}
        />
        {this.renderIndicators()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  line: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 1,
    height: 2,
  },
  indicatorWrap: {
    position: 'absolute',
    top: 50, left: 0, right: 0,
  },
  indicators: {
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  indicatorBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 50,
  },
});
