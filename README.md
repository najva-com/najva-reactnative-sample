# najva React Native Application

This is a `ReactNative` application that `Najva-ReactNative-plugin` implemented in it.


### Test Najva Service in ReactNative
If you want test `Najva Push Notification Service` in `reactnative` application you should:
1.  Clone this project and rename package name of it.
this [link](https://stackoverflow.com/questions/37389905/change-package-name-for-android-in-react-native) can be useful.

2.  Register this app after login in [najva panel](https://app.najva.com/accounts/login/?next=/).(to register any app, its package name must be unique!)

3.  After register najva panel gives you `campaignId`,`websiteId`,`apiKey` which is specific to your app

4.  Go to `App.js` file and put this parameters to `initializeNajva` method that looks like the following then save it.
```
  Najva.initializeNajva(YOUR_CAMPAIGN_ID_GOES_HERE, YOUR_WEBSITE_ID_GOES_HERE, YOUR_API_KEY_GOES_HERE);     
```

5.  Now you can run application and send notification from your panel to it!

