This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.js` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

adminDongCode: 행정동 코드 (예: "2617051000")
bizName: 비즈니스 이름 (대부분 비어 있음)
collectionType: 데이터 수집 유형 (예: "poi")
dataKind: 데이터 종류 (대부분 비어 있거나 "1", "2" 등의 값)
desc: 장소에 대한 설명
detailAddrName: 세부 주소명 (대부분 비어 있음)
detailBizName: 세부 비즈니스 이름 (예: "부산지하철1호선", "KTX/SRT정차역")
detailInfoFlag: 세부 정보 플래그 ("0" 또는 "1")
evChargers: 전기차 충전소 정보 배열
firstBuildNo / secondBuildNo: 건물 번호
firstNo / secondNo: 도로 번호
frontLat / frontLon: 위도 및 경도
id: 장소 ID (고유 식별자)
legalDongCode: 법정동 코드
lowerAddrName: 하위 주소명 (예: "초량동")
lowerBizName: 하위 비즈니스 이름 (예: "지하철역", "주차장")
middleAddrName: 중간 주소명 (예: "동구")
middleBizName: 중간 비즈니스 이름 (예: "교통시설")
mlClass: 주요 분류 ("1")
name: 장소 이름 (예: "부산역[부산지하철1호선]")
newAddressList: 새 주소 리스트 (배열 형태, [Array]로 표시됨)
parkFlag: 주차 여부 플래그 ("0" 또는 "1")
pkey: 고유 키 (식별자)
radius: 반경 (거의 "0.0")
roadName: 도로명 (예: "중앙대로")
rpFlag: 도로 구분 플래그
telNo: 전화번호 (예: "1544-7788")
upperAddrName: 상위 주소명 (예: "부산")
upperBizName: 상위 비즈니스 이름 (예: "교통편의")
zipCode: 우편번호
