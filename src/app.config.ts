export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/lobby/index',
    'pages/profile/index',
    'pages/room/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    position: 'bottom',
    selectedColor: '#123456',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/lobby/index',
        text: ' lobby',
      },
      {
        pagePath: 'pages/profile/index',
        text: '个人资料',
      },
      {
        pagePath: 'pages/room/index',
        text: 'room',
      }
    ],
  },
  requiredBackgroundModes: ['audio']
})
