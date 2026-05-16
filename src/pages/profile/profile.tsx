import { useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './profile.css'

const HISTORY = [
  {
    id: 1,
    sport: '羽毛球',
    location: '紫金港体育馆',
    time: '5月10日 晚上',
    status: '已完成',
    tone: 'done'
  },
  {
    id: 2,
    sport: '网球',
    location: '玉泉网球场',
    time: '5月16日 上午',
    status: '待开始',
    tone: 'pending'
  },
  {
    id: 3,
    sport: '乒乓球',
    location: '西溪校区球馆',
    time: '5月18日 下午',
    status: '已报名',
    tone: 'info'
  }
]

export default function Profile () {
  const [profileName, setProfileName] = useState('未登录球友')
  const [gender, setGender] = useState('未设置')
  const [profileBio, setProfileBio] = useState('喜欢轻松稳定的晚场球局')
  const [loggedIn, setLoggedIn] = useState(false)

  useLoad(() => {
    console.log('Profile loaded.')
  })

  return (
    <View className='profilePage'>
      <View className='profileHero'>
        <View className='profileAvatar'>我</View>
        <View className='profileHeroMain'>
          <Text className='profileTitle'>个人页面</Text>
          <Text className='profileSubtitle'>维护头像、昵称、性别和个人简介，查看约球历史。</Text>
        </View>
        <Button
          className={loggedIn ? 'outlineDanger' : 'primaryButton'}
          onClick={() => setLoggedIn((value) => !value)}
        >
          {loggedIn ? '退出' : '登录'}
        </Button>
      </View>

      <View className='section'>
        <View className='sectionHeader'>
          <View>
            <Text className='sectionTitle'>个人资料</Text>
            <Text className='sectionMeta'>用于房间内展示和搜索昵称匹配</Text>
          </View>
          <Text className={loggedIn ? 'statusPill active' : 'statusPill'}>{loggedIn ? '已登录' : '未登录'}</Text>
        </View>

        <View className='profileForm'>
          <View className='field'>
            <Text className='fieldLabel'>昵称</Text>
            <Input
              className='fieldInput'
              maxlength={16}
              value={profileName}
              onInput={(event) => setProfileName(event.detail.value)}
            />
          </View>

          <View className='field'>
            <Text className='fieldLabel'>性别</Text>
            <View className='segmentGroup'>
              {['未设置', '男生', '女生'].map((item) => (
                <Button
                  key={item}
                  className={`segment ${gender === item ? 'segmentActive' : ''}`}
                  onClick={() => setGender(item)}
                >
                  {item}
                </Button>
              ))}
            </View>
          </View>

          <View className='field fullField'>
            <Text className='fieldLabel'>个人简介</Text>
            <Input
              className='fieldInput'
              maxlength={40}
              value={profileBio}
              onInput={(event) => setProfileBio(event.detail.value)}
            />
          </View>
        </View>
      </View>

      <View className='section'>
        <View className='sectionHeader'>
          <View>
            <Text className='sectionTitle'>约球历史记录</Text>
            <Text className='sectionMeta'>保留已完成、待开始和已报名记录</Text>
          </View>
        </View>

        <View className='historyList'>
          {HISTORY.map((item) => (
            <View className='historyItem' key={item.id}>
              <View>
                <Text className='historyName'>{item.sport} · {item.location}</Text>
                <Text className='historyTime'>{item.time}</Text>
              </View>
              <Text className={`historyStatus ${item.tone}`}>{item.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
