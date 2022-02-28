import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Component} from 'react';
import {Button, Alert, Text} from 'react-native';

const CleverTap = require('clevertap-react-native');

const Separator = () => <View style={styles.separator} />;

class App extends Component {
  constructor() {
    super();
    CleverTap.setDebugLevel(3);
    CleverTap.initializeInbox();
  }

  state = {
    title: 'Title',
    message: 'Message',
  };

  login = () => {
    CleverTap.onUserLogin({
      Name: 'Suryanshu Raj',
      Email: 'rntest@test.com',
      Phone: '+917992375591',
      Gender: 'M',
      'MSG-email': true,
      'MSG-push': true,
      'MSG-sms': true,
      'MSG-whatsapp': true,
    });
    };
  pushEvent = () => {
    Alert.alert('Push Event Clicked');
    CleverTap.recordEvent('RNtestevent');
  };

  appInbox = () => {
    CleverTap.showInbox({
      navBarTitle: 'App Inbox',
      navBarTitleColor: '#000000',
      navBarColor: '#FFFFFF',
      inboxBackgroundColor: '#AED6F1',
      backButtonColor: '#000000',
      noMessageText: 'No message(s)',
      noMessageTextColor: '#FF0000',
    });
    Alert.alert('App Inbox Clicked');
  };

  nativeDisplay = () => {
    CleverTap.getAllDisplayUnits((err, res) => {
      console.log('All Display Units: ', res, err);
      this.setState({datasource: JSON.parse(res)});
      this.setState({
        title: JSON.stringify(
          this.state.datasource.content[0].title.text,
        ).replace(/['"]+/g, ''),
        message: JSON.stringify(
          this.state.datasource.content[0].message.text,
        ).replace(/['"]+/g, ''),
      });
      Alert.alert('Native Display Clicked');
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
        <Button title="Log in" onPress={this.login} />
          <Separator />
          <Button title="Push Event" onPress={this.pushEvent} />
          <Separator />
          <Button title="App Inbox" onPress={this.appInbox} />
          <Separator />
          <Button title="Native Display" onPress={this.nativeDisplay} />
          <Separator />
          <Text style={styles.titleText}>Native Display Message </Text>
          <Separator />
          <Text style={styles.textND}>{this.state.title}</Text>
          <Separator />
          <Text style={styles.textND}>{this.state.message}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

CleverTap.createNotificationChannel( '999','React Native Test','This is a React-Native test',5,true,);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: 'teal',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textND: {
    fontSize: 18,
    color: 'black',
  },
});

export default App;
