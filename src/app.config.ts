export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/profile/profile',
    'pages/room-detail/room-detail'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#22B5AF',
    navigationBarTitleText: '组队大厅',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#808080',
    selectedColor: '#22B5AF',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '组队'
      },
      {
        pagePath: 'pages/profile/profile',
        text: '我的'
      }
    ]
  }
})
