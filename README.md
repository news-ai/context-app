# context-app

### Building the Context app

To install npm dependencies

1. `cd app`
2. `npm install`

To run the iOS app:

1. `cd app`
2. `Open ios/contextapp.xcodeproj` and hit run in Xcode.
3. Open `index.ios.js` in your text editor of choice and edit some lines.
4. Hit `⌘-R` in your iOS simulator to reload the app and see your change!

To run the Android app:

1. `cd app`
2. `react-native run-android`
3. Open `index.android.js` in your text editor of choice and edit some lines.
4. Press the menu button (F2 by default, or `⌘-M` in Genymotion) and select Reload JS to see your change!
4. Run `adb logcat *:S ReactNative:V ReactNativeJS:V` in a terminal to see your app's logs

To debug iOS app (on your phone):

1. Charge IP in `ios/contextapp/AppDelegate.m` to computer IP

To debug iOS app (on the simulator):

1. `cmd+D`
