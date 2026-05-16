export default defineAppConfig({
  pages: [
    'pages/lobby/index',    // 大厅 - 浏览球局列表
    'pages/create/index',   // 发起 - 创建房间
    'pages/matches/index',  // 比赛 - 比赛记录
    'pages/profile/index'   // 我的 - 个人中心
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '约球系统',
    navigationBarTextStyle: 'black'
  },
  // 原生 tabBar：仅文字标签，无图标（后续由设计师输出 4 组 PNG 替换）
  tabBar: {
    color: '#94959B',
    selectedColor: '#22B5AF',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/lobby/index', text: '大厅' },
      { pagePath: 'pages/create/index', text: '发起' },
      { pagePath: 'pages/matches/index', text: '比赛' },
      { pagePath: 'pages/profile/index', text: '我的' }
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
