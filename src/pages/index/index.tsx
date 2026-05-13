// pages/index/index.tsx
import { View, Text, Button, Input, ScrollView } from '@tarojs/components'
import { useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import './index.css'

// 定义房间类型
interface Room {
  id: number
  name: string
  players: number
  maxPlayers: number
  status: string
  sport: string   // 运动类型：篮球、足球、羽毛球、乒乓球、网球等
}

// 标签列表
const sportTags = [
  { key: 'all', label: '全部' },
  { key: '篮球', label: '🏀 篮球' },
  { key: '足球', label: '⚽ 足球' },
  { key: '羽毛球', label: '🏸 羽毛球' },
  { key: '乒乓球', label: '🏓 乒乓球' },
  { key: '网球', label: '🎾 网球' },
]

export default function Index() {
  // 原始房间列表模拟数据
  const [roomList, setRoomList] = useState<Room[]>([
    { id: 1, name: '乒乓球（风雨操场）', players: 2, maxPlayers: 2, status: '进行中', sport: '乒乓球' },
    { id: 2, name: '羽毛球（风雨操场）', players: 3, maxPlayers: 4, status: '招募中', sport: '羽毛球' },
    { id: 3, name: '网球（安中球场）', players: 2, maxPlayers: 4, status: '即将开始', sport: '网球' },
    { id: 4, name: '篮球（东区球场）', players: 6, maxPlayers: 10, status: '招募中', sport: '篮球' },
    { id: 5, name: '足球（银泉足球场）', players: 8, maxPlayers: 14, status: '进行中', sport: '足球' },
  ])

  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedTag, setSelectedTag] = useState('all') 
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState('')


  const fetchRooms = async () => {
    setLoading(true)
    setError('')
    try {
      //const res = await Taro.request({ url: '../api' })
      //if (res.statusCode === 200) setRoomList(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 300)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  // 过滤逻辑：先按标签筛选，再按关键词筛选
  const filteredRooms = useMemo(() => {
    let filtered = roomList

    // 1. 按运动标签筛选（如果 selectedTag 不是 'all'）
    if (selectedTag !== 'all') {
      filtered = filtered.filter(room => room.sport === selectedTag)
    }

    // 2. 按搜索关键词筛选（房间名匹配）
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim()
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(keyword)
      )
    }

    return filtered
  }, [roomList, selectedTag, searchKeyword])

  const goToRoom = (roomId: number) => {
    Taro.navigateTo({ url: `/pages/room/index?id=${roomId}` })
  }

  const clearSearch = () => {
    setSearchKeyword('')
  }

  // 点击标签切换
  const handleTagClick = (tagKey: string) => {
    setSelectedTag(tagKey)
  }

  // 加载/错误处理
  if (loading) {
    return (
      <View className='container'>
        <View className='loading-tip'>加载中...</View>
      </View>
    )
  }

  if (error) {
    return (
      <View className='container'>
        <View className='error-tip'>{error}</View>
        <Button onClick={fetchRooms}>重试</Button>
      </View>
    )
  }

  return (
    <View className='container'>
      <View className='header'>
        <Text className='title'>约球大厅</Text>
        <Text className='subtitle'>找到志同道合的球友</Text>
      </View>

      {/* 标签筛选栏 */}
      <ScrollView
        className='tags-scroll'
        scrollX
        showScrollbar={false}
        enhanced
      >
        <View className='tags-container'>
          {sportTags.map(tag => (
            <View
              key={tag.key}
              className={`tag-item ${selectedTag === tag.key ? 'tag-active' : ''}`}
              onClick={() => handleTagClick(tag.key)}
            >
              <Text className='tag-text'>{tag.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 搜索框区域 */}
      <View className='search-bar'>
        <Input
          className='search-input'
          placeholder='搜索房间名称'
          value={searchKeyword}
          onInput={(e) => setSearchKeyword(e.detail.value)}
        />
        {searchKeyword && (
          <Button className='clear-btn' size='mini' onClick={clearSearch}>
            清除
          </Button>
        )}
      </View>

      {/* 房间列表 */}
      <View className='room-list'>
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <View key={room.id} className='room-item' onClick={() => goToRoom(room.id)}>
              <View className='room-info'>
                <Text className='room-name'>{room.name}</Text>
                <Text className='room-status'>{room.status}</Text>
              </View>
              <View className='room-detail'>
                <Text>人数：{room.players}/{room.maxPlayers}</Text>
                <Text className='room-sport'>{room.sport}</Text>
                <Button className='join-btn' size='mini'>加入</Button>
              </View>
            </View>
          ))
        ) : (
          <View className='empty-tip'>无符合条件的结果，试试其他关键词或标签吧~</View>
        )}
      </View>
    </View>
  )
}