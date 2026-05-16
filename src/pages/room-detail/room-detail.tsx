import { useMemo, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { ROOMS } from '../../data/rooms'
import './room-detail.css'

export default function RoomDetail () {
  const router = useRouter()
  const [joined, setJoined] = useState(false)

  const room = useMemo(() => {
    const id = Number(router.params.id)
    return ROOMS.find((item) => item.id === id)
  }, [router.params.id])

  useLoad(() => {
    if (room) {
      Taro.setNavigationBarTitle({
        title: room.name
      })
    }
  })

  if (!room) {
    return (
      <View className='detailPage'>
        <View className='emptyState'>
          <Text className='emptyTitle'>房间不存在或已下线</Text>
          <Text className='emptyText'>返回组队大厅查看当前可加入的公开房间。</Text>
          <Button className='primaryButton' onClick={() => Taro.navigateBack()}>返回</Button>
        </View>
      </View>
    )
  }

  const joinText = joined
    ? '已提交'
    : room.joinMode === 'direct'
      ? '直接加入'
      : '申请加入'

  return (
    <View className='detailPage'>
      <View className='detailHero'>
        <View>
          <Text className='eyebrow'>{room.sport} · {room.period}</Text>
          <Text className='detailTitle'>{room.name}</Text>
          <Text className='detailSubtitle'>{room.description}</Text>
        </View>
        <View className='capacityBox'>
          <Text className='capacityNumber'>{room.currentCount}/{room.targetCount}</Text>
          <Text className='capacityLabel'>当前人数</Text>
        </View>
      </View>

      <View className='section hostSection'>
        <View className='hostAvatar'>{room.avatar}</View>
        <View className='hostInfo'>
          <Text className='sectionTitle'>房主</Text>
          <Text className='hostName'>{room.host}</Text>
        </View>
        <Text className={room.joinMode === 'direct' ? 'joinMode direct' : 'joinMode'}>{room.joinMode === 'direct' ? '直接加入' : '房主审核'}</Text>
      </View>

      <View className='section'>
        <View className='sectionHeader'>
          <View>
            <Text className='sectionTitle'>房间信息</Text>
            <Text className='sectionMeta'>活动未开始且公开可加入</Text>
          </View>
          <Text className={room.status === 'notStarted' ? 'statusPill active' : 'statusPill'}>{room.status === 'notStarted' ? '未开始' : '已开始'}</Text>
        </View>

        <View className='infoGrid'>
          <View className='infoItem'>
            <Text className='infoLabel'>时间</Text>
            <Text className='infoValue'>{room.time} {room.period}</Text>
          </View>
          <View className='infoItem'>
            <Text className='infoLabel'>地点</Text>
            <Text className='infoValue'>{room.location}</Text>
          </View>
          <View className='infoItem'>
            <Text className='infoLabel'>人数限制</Text>
            <Text className='infoValue'>{room.count}</Text>
          </View>
          <View className='infoItem'>
            <Text className='infoLabel'>性别要求</Text>
            <Text className='infoValue'>{room.gender}</Text>
          </View>
          <View className='infoItem'>
            <Text className='infoLabel'>学园/院系/社团</Text>
            <Text className='infoValue'>{room.group}</Text>
          </View>
          <View className='infoItem'>
            <Text className='infoLabel'>水平/氛围</Text>
            <Text className='infoValue'>{room.level} · {room.style}</Text>
          </View>
        </View>
      </View>

      <View className='section'>
        <Text className='sectionTitle'>加入说明</Text>
        <View className='noticeList'>
          <View className='noticeItem'>
            <Text className='noticeLabel'>同伴码</Text>
            <Text className={room.companionCodeRequired ? 'noticeValue warning' : 'noticeValue'}>
              {room.companionCodeRequired ? '需要，同伴码将在审核或加入后展示' : '无需同伴码'}
            </Text>
          </View>
          <View className='noticeItem'>
            <Text className='noticeLabel'>场地预约</Text>
            <Text className='noticeValue'>需预约场所的时间地点后续与浙大体艺对接</Text>
          </View>
        </View>
      </View>

      <Button
        className={room.joinMode === 'review' ? 'primaryButton reviewButton' : 'primaryButton'}
        onClick={() => setJoined(true)}
      >
        {joinText}
      </Button>
    </View>
  )
}
