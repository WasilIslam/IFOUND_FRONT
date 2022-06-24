import "react-native-gesture-handler"
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {LogBox} from "react-native"

LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."])
AppRegistry.registerComponent(appName, () => App);
