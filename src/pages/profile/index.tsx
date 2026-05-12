import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Card from '../../components/Card'
import { CellGroup } from '../../components/Cell'
import Avatar from '../../components/Avatar'
import './index.css'

/*
  个人中心页面（"我的" tab）
  功能：用户信息卡片 / 我的活动菜单 / 设置菜单 / 退出登录
  数据：当前为 mock 数据，后续接入后端 API 替换
*/

/* ----- Mock 用户数据（后端对接时替换为接口请求）----- */
const MOCK_USER = {
  name: '张三',
  college: '计算机学院',
  grade: '大二',
  avatarTheme: 'cyan' as const,
  stats: {
    games: 7,      // 约球数
    wins: 3,       // 胜场数
    favorites: 12  // 收藏数
  }
}

/*
  菜单项配置 — 所有可点击的列表项统一在这里管理
  后续接入路由只需改 path 字段
*/
const ACTIVITY_CELLS = [
  {
    icon: '\u{1F3C3}',  // 🏃 跑步
    title: '我的约球',
    onClick: () => Taro.showToast({ title: '我的约球 - 开发中', icon: 'none' })
  },
  {
    icon: '\u{2764}\u{FE0F}',  // ❤️
    title: '我的收藏',
    onClick: () => Taro.showToast({ title: '我的收藏 - 开发中', icon: 'none' })
  },
  {
    icon: '\u{1F3C6}',  // 🏆
    title: '比赛记录',
    onClick: () => Taro.showToast({ title: '比赛记录 - 开发中', icon: 'none' })
  }
]

const SETTING_CELLS = [
  {
    icon: '\u{2699}\u{FE0F}',  // ⚙️
    title: '账号设置',
    onClick: () => Taro.showToast({ title: '账号设置 - 开发中', icon: 'none' })
  },
  {
    icon: '\u{2139}\u{FE0F}',  // ℹ️
    title: '关于我们',
    onClick: () => Taro.showToast({ title: '关于我们 - 开发中', icon: 'none' })
  }
]

export default function Profile() {
  /* 退出登录：二次确认弹窗，防止误触 */
  const handleLogout = () => {
    Taro.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      confirmText: '退出',
      cancelText: '取消',
      confirmColor: '#F5523B'
    }).then((res) => {
      if (res.confirm) {
        Taro.showToast({ title: '已退出登录', icon: 'none' })
        // TODO: 清除本地 token / 用户状态，跳转登录页
      }
    })
  }

  const { name, college, grade, avatarTheme, stats } = MOCK_USER

  return (
    <View className='page-shell profile-page'>

      {/* ===== 用户信息卡片：渐变背景 + 头像 + 姓名 + 统计数据 ===== */}
      <View className='profile-hero'>
        <View className='profile-hero__head'>
          <Avatar name={name} size={96} theme={avatarTheme} />
          <View className='profile-hero__info'>
            <Text className='profile-hero__name'>{name}</Text>
            <Text className='profile-hero__college'>{college} · {grade}</Text>
          </View>
        </View>

        {/* 三列统计数据 */}
        <View className='profile-hero__stats'>
          <View className='profile-stat'>
            <Text className='profile-stat__value'>{stats.games}</Text>
            <Text className='profile-stat__label'>约球数</Text>
          </View>
          <View className='profile-stat'>
            <Text className='profile-stat__value'>{stats.wins}</Text>
            <Text className='profile-stat__label'>胜场数</Text>
          </View>
          <View className='profile-stat'>
            <Text className='profile-stat__value'>{stats.favorites}</Text>
            <Text className='profile-stat__label'>收藏数</Text>
          </View>
        </View>
      </View>

      {/* ===== 我的活动 ===== */}
      <View className='profile-section'>我的活动</View>
      <Card>
        <CellGroup cells={ACTIVITY_CELLS} />
      </Card>

      {/* ===== 更多设置 ===== */}
      <View className='profile-section'>更多</View>
      <Card>
        <CellGroup cells={SETTING_CELLS} />
      </Card>

      {/* ===== 退出登录 ===== */}
      <Card className='profile-logout-card' style={{ padding: 0 }}>
        <View
          className='profile-logout-card'
          onClick={handleLogout}
        >
          <Text className='profile-logout-text'>退出登录</Text>
        </View>
      </Card>

    </View>
  )
}
