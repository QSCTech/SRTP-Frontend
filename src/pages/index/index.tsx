import { useMemo, useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { ROOMS, type Room } from '../../data/rooms'
import './index.css'

type NewRoom = {
  name: string
  sport: string
  time: string
  location: string
  gender: string
  count: string
  group: string
  level: string
}

const TAGS = ['羽毛球', '网球', '晚上', '紫金港', '信电', '社团', '新手友好', '进阶对抗']

const initialRoom: NewRoom = {
  name: '',
  sport: '羽毛球',
  time: '',
  location: '',
  gender: '男女混合',
  count: '',
  group: '',
  level: ''
}

const compactRoomName = (name: string) => (name.length > 8 ? `${name.slice(0, 8)}...` : name)

export default function Index () {
  const [keyword, setKeyword] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [searched, setSearched] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)
  const [joined, setJoined] = useState<number[]>([])
  const [inviteCode, setInviteCode] = useState('')
  const [newRoom, setNewRoom] = useState<NewRoom>(initialRoom)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const searchableRooms = useMemo(() => {
    return ROOMS.filter((room) => room.status === 'notStarted' && room.visibility === 'public')
  }, [])

  const searchResults = useMemo(() => {
    if (!searched && !keyword && activeTags.length === 0) {
      return searchableRooms
    }

    const query = keyword.trim().toLowerCase()

    return searchableRooms.filter((room) => {
      const content = [
        room.host,
        room.name,
        room.sport,
        room.time,
        room.period,
        room.location,
        room.group,
        room.level,
        room.style
      ].join(' ').toLowerCase()

      const keywordMatched = !query || content.includes(query)
      const tagsMatched = activeTags.every((tag) => content.includes(tag.toLowerCase()))

      return keywordMatched && tagsMatched
    })
  }, [activeTags, keyword, searchableRooms, searched])

  const updateRoom = (key: keyof NewRoom, value: string) => {
    setNewRoom((room) => ({ ...room, [key]: value }))
  }

  const toggleTag = (tag: string) => {
    setActiveTags((current) => (
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    ))
  }

  const runSearch = () => {
    setSearched(true)
    setShowEmpty(searchResults.length === 0)
  }

  const clearSearch = () => {
    setKeyword('')
    setActiveTags([])
    setSearched(false)
    setShowEmpty(false)
  }

  const viewAllRooms = () => {
    setKeyword('')
    setActiveTags([])
    setSearched(true)
    setShowEmpty(false)
  }

  const handleJoin = (room: Room) => {
    setJoined((current) => (current.includes(room.id) ? current : [...current, room.id]))
  }

  const openRoomDetail = (room: Room) => {
    Taro.navigateTo({
      url: `/pages/room-detail/room-detail?id=${room.id}`
    })
  }

  return (
    <View className='page'>
      <View className='hero'>
        <View>
          <Text className='eyebrow'>ZJU Sports Match</Text>
          <Text className='title'>组队大厅</Text>
          <Text className='subtitle'>搜索公开且未开始的约球房间，或用邀请码加入同伴码球局。</Text>
        </View>
        <View className='heroBadge'>
          <Text className='heroBadgeNumber'>{searchableRooms.length}</Text>
          <Text className='heroBadgeText'>可加入房间</Text>
        </View>
      </View>

      <View className='section searchPanel'>
        <View className='searchRow'>
          <Input
            className='searchInput'
            maxlength={30}
            placeholder='球类 / 地点 / 日期 / 学院 / 水平 / 昵称'
            value={keyword}
            onInput={(event) => setKeyword(event.detail.value)}
            onConfirm={runSearch}
          />
          <Button className='iconButton searchButton' onClick={runSearch}>搜</Button>
          <Button className='inviteButton' onClick={() => setInviteCode(inviteCode ? '' : 'BDM-2086')}>邀请码</Button>
        </View>

        {inviteCode && (
          <View className='inviteBox'>
            <Text className='inviteLabel'>房间邀请码</Text>
            <Input
              className='inviteInput'
              maxlength={12}
              value={inviteCode}
              onInput={(event) => setInviteCode(event.detail.value)}
            />
            <Button className='smallPrimary'>加入</Button>
          </View>
        )}

        <View className='tagGrid'>
          {TAGS.map((tag) => (
            <Button
              key={tag}
              className={`tag ${activeTags.includes(tag) ? 'tagActive' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </View>
      </View>

      <View className='section'>
        <View className='sectionHeader'>
          <View>
            <Text className='sectionTitle'>搜索结果</Text>
            <Text className='sectionMeta'>仅展示公开、未开始房间</Text>
          </View>
          <Button className='ghostButton' onClick={clearSearch}>清空</Button>
        </View>

        <View className='roomList'>
          {searchResults.map((room) => (
            <View className='roomItem' key={room.id} onClick={() => openRoomDetail(room)}>
              <View className='avatar'>{room.avatar}</View>
              <View className='roomMain'>
                <Text className='hostName'>{room.host}</Text>
                <Text className='roomName'>{compactRoomName(room.name)}</Text>
                <View className='roomTags'>
                  <Text className='roomTag'>{room.sport}</Text>
                  <Text className='roomTag'>{room.period}</Text>
                  <Text className='roomTag'>{room.level}</Text>
                </View>
                <Text className='roomDetail'>{room.time} · {room.location} · {room.count}</Text>
                <Text className='detailHint'>点击查看房间详情</Text>
              </View>
              <Button
                className={`joinButton ${room.joinMode === 'review' ? 'joinReview' : ''}`}
                onClick={(event) => {
                  event.stopPropagation()
                  handleJoin(room)
                }}
              >
                {joined.includes(room.id) ? '已提交' : room.joinMode === 'direct' ? '直接加入' : '申请加入'}
              </Button>
            </View>
          ))}
        </View>
      </View>

      <View className='section createPanel'>
        <View className='sectionHeader'>
          <View>
            <Text className='sectionTitle'>创建房间</Text>
            <Text className='sectionMeta'>网球和羽毛球默认需要同伴码</Text>
          </View>
          <Text className='statusPill'>体艺预约待对接</Text>
        </View>

        <View className='formGrid'>
          <View className='field required'>
            <Text className='fieldLabel'>房间名称</Text>
            <Input className='fieldInput' maxlength={12} value={newRoom.name} onInput={(event) => updateRoom('name', event.detail.value)} />
          </View>
          <View className='field required'>
            <Text className='fieldLabel'>球类</Text>
            <View className='segmentGroup'>
              {['羽毛球', '网球', '篮球'].map((sport) => (
                <Button key={sport} className={`segment ${newRoom.sport === sport ? 'segmentActive' : ''}`} onClick={() => updateRoom('sport', sport)}>
                  {sport}
                </Button>
              ))}
            </View>
          </View>
          <View className='field required'>
            <Text className='fieldLabel'>时间</Text>
            <Input className='fieldInput' placeholder='例：5月18日 晚上' value={newRoom.time} onInput={(event) => updateRoom('time', event.detail.value)} />
          </View>
          <View className='field required'>
            <Text className='fieldLabel'>地点</Text>
            <Input className='fieldInput' placeholder='例：紫金港体育馆' value={newRoom.location} onInput={(event) => updateRoom('location', event.detail.value)} />
          </View>
          <View className='field'>
            <Text className='fieldLabel'>性别要求</Text>
            <View className='segmentGroup'>
              {['男女混合', '全部男生', '全部女生'].map((gender) => (
                <Button key={gender} className={`segment ${newRoom.gender === gender ? 'segmentActive' : ''}`} onClick={() => updateRoom('gender', gender)}>
                  {gender}
                </Button>
              ))}
            </View>
          </View>
          <View className='field'>
            <Text className='fieldLabel'>人数限制</Text>
            <Input className='fieldInput' placeholder='例：4-6人' value={newRoom.count} onInput={(event) => updateRoom('count', event.detail.value)} />
          </View>
          <View className='field'>
            <Text className='fieldLabel'>学园/院系/社团</Text>
            <Input className='fieldInput' placeholder='例：信电学院' value={newRoom.group} onInput={(event) => updateRoom('group', event.detail.value)} />
          </View>
          <View className='field'>
            <Text className='fieldLabel'>水平/氛围</Text>
            <Input className='fieldInput' placeholder='例：新手友好' value={newRoom.level} onInput={(event) => updateRoom('level', event.detail.value)} />
          </View>
        </View>

        <Button className='primaryButton'>发布房间</Button>
      </View>

      {showEmpty && (
        <View className='modalMask'>
          <View className='modal'>
            <Text className='modalTitle'>无符合条件的结果，试试其他关键词吧～</Text>
            <View className='modalActions'>
              <Button className='ghostButton modalButton' onClick={clearSearch}>清空标签及关键词</Button>
              <Button className='primaryButton modalButton' onClick={viewAllRooms}>查看全部房间</Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
