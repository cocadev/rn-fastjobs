import React, { PureComponent } from "react";

import {
  StyleSheet,
  View,
  Text,
  Animated,
} from "react-native";

import { BarCodeScanner, Permissions } from 'expo';
import { Actions } from "react-native-router-flux";

const MARK_SIZE = 200
const MARK_BORDER = 3

export default class QRCodeScan extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        projectName:'Project Name',
        DONumber:'RT02342',
        clientName: 'Austin',
        clientAddress: 'No.1, Jalan Bukit Bintang, Kuala Lumpur',
        scanBarTop: new Animated.Value(0),
    };
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if ( this.props.getQRCode ) this.props.getQRCode(result)
    if ( this.props.update ){
        this.props.update(result.data)
    }

    console.log('result', result)
    // this.props.navigation.navigate('Tab1')
    Actions.pop()
  };
  
  componentDidMount() {
    this._requestCameraPermission();
    this.mounted = true
    let toValue = MARK_SIZE
    let myInterval = setInterval(() => {
        if (this.mounted) {
            Animated.timing(                  // Animate over time
                this.state.scanBarTop,            // The animated value to drive
                {
                    toValue: toValue,                   // Animate to opacity: 1 (opaque)
                    duration: 1000,              // Make it take a while
                }
            ).start();
            if ( toValue == MARK_SIZE ) toValue = 0
            else if ( toValue == 0 ) toValue = MARK_SIZE
        }
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{flex:1}}>
            {this.state.hasCameraPermission === null
            ? <Text>QR CODE SCAN</Text>
            : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                    {'CAMERA ERROR'}
                    </Text>
                : <View style={{flex:1, position:'relative'}}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{
                             justifyContent:'center', alignItems:'center',flex:1
                        }}
                    >
                        <View style={{ height: MARK_SIZE, width: MARK_SIZE }}>
                            <View style={{ position: 'absolute', left: -MARK_BORDER, top: -MARK_BORDER, height: 40, width: 40, borderTopColor: '#000', borderTopWidth: MARK_BORDER, borderLeftColor: '#000', borderLeftWidth: MARK_BORDER }} />
                            <View style={{ position: 'absolute', right: -MARK_BORDER, bottom: -MARK_BORDER, height: 40, width: 40, borderBottomColor: '#000', borderBottomWidth: MARK_BORDER, borderRightColor: '#000', borderRightWidth: MARK_BORDER }} />
                            <View style={{ position: 'absolute', right: -MARK_BORDER, top: -MARK_BORDER, height: 40, width: 40, borderTopColor: '#000', borderTopWidth: MARK_BORDER, borderRightColor: '#000', borderRightWidth: MARK_BORDER }} />
                            <View style={{ position: 'absolute', left: -MARK_BORDER, bottom: -MARK_BORDER, height: 40, width: 40, borderBottomColor: '#000', borderBottomWidth: MARK_BORDER, borderLeftColor: '#000', borderLeftWidth: MARK_BORDER }} />
                            <Animated.View style={{ height: 2, width: '100%', backgroundColor: 'red', top: this.state.scanBarTop, position: 'absolute' }} />
                        </View>
                    </BarCodeScanner>
                  </View>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'column', marginTop: 20,
    backgroundColor: 'rgb(249,249,249)'
  },
});
