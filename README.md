
# AgoraCall App &nbsp; <img width="35" alt="image" src="https://user-images.githubusercontent.com/81239267/163727020-414e019f-1a71-4e3c-9ec4-61425258e037.png">

App for initiating voice calls in React Native using Agora React Native SDK.

<img width="400" alt="image" src="https://user-images.githubusercontent.com/81239267/165187024-d954ef48-08eb-4582-ae4a-759390412d2c.png">

- Enter the same channel name and token to start a joint call.

- Also, this application can be used to test the [rn-agora-voice-call](https://www.npmjs.com/package/rn-agora-voice-call) or [rn-voice-call](https://www.npmjs.com/package/rn-voice-call) packages. After starting a call, the necessary parameters for the packages can be copied by pressing the `Copy Data` button and sent to the device where the application to be tested is located.

##### APK url: [AgoraCall APK](https://drive.google.com/file/d/1vJc1FkXbrl_1DqodAxVIpC5sw8KK-QxO/view?usp=sharing)

## Build the app

    yarn install
    cd ios && pod install && cd ..

You have two options to enter the app id.

#### <ins>Option 1</ins>
 
Add the app id to the config.js.

<img width="275" alt="image" src="https://user-images.githubusercontent.com/81239267/163728144-f850bc89-a3a4-487b-a774-d0b6830ab320.png">

#### <ins>Option 2</ins>
 
If no app id has been added to the config.js, this will be requested at the application startup.
 
<img width="150" alt="image" src="https://user-images.githubusercontent.com/81239267/165185881-65c346a4-de71-487a-80f1-c04e5d583766.png">

### <ins>Setting up developer account for App ID and Token</ins>

1- Create a [Agora Account](https://sso2.agora.io/en/v4/signup/with-email).

2- Get the App ID from [Agora Console](https://console.agora.io/).

<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/163728978-13d0a2cd-7627-4e00-ad5f-0413d67e7d48.png">

3- To generate a temporary token with a validity period of 24 hours that you retrieve from Agora Console click the "Config".

<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/163729188-a72db499-6146-4645-baa8-ee169ad0bef6.png">

Then click the "Generate temp RTC token", enter a channel name, then click the "Generate". The channel name to be entered in the application have to be the same as the channel name entered here. 

<img width="450" alt="image" src="https://user-images.githubusercontent.com/81239267/163729613-e4fec117-3874-4afa-965b-ed2a7f282435.png">

For more information: [Agora.io](https://docs.agora.io/en/Voice/start_call_audio_react_native?platform=React%20Native)