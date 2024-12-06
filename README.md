# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.













## if you want to change the admin account.
1. in app.json and eas.json. change the owner to the new owner account.
2. in app.json. change the project id to the new owners account ID. in their expo.dev account.

## tutorial to turn this project into a APK
https://www.youtube.com/watch?v=3j9DcRCxrFg


## script to make a build and get an APK in expo go
 eas build --profile preview  --platform android


## Ble CODES

00 series: toeter
    01:  1 kort
    02:  1 lang
    
10 series: oranjevlag
    11:    30 seconde tot heisen
    12:    10 second tot heisen
    13:    5 second countdown heisen
    14:    30 seconde tot strijken
    15:    10 second tot strijken
    16:    5 second countdown strijken

20 series: klassevlag
    21:    30 seconde tot heisen
    22:    10 second tot heisen
    23:    5 second countdown heisen
    24:    30 seconde tot strijken
    25:    10 second tot strijken
    26:    5 second countdown strijken

30 series: procedurevlag
    31:    30 seconde tot heisen
    32:    10 second tot heisen
    33:    5 second countdown heisen
    34:    30 seconde tot strijken
    35:    10 second tot strijken
    36:    5 second countdown strijken