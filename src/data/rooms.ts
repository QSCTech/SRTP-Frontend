export type Room = {
  id: number
  host: string
  avatar: string
  name: string
  sport: string
  time: string
  period: string
  location: string
  group: string
  level: string
  style: string
  visibility: 'public' | 'private'
  status: 'notStarted' | 'started'
  joinMode: 'direct' | 'review'
  gender: string
  count: string
  description: string
  currentCount: number
  targetCount: number
  companionCodeRequired: boolean
}

export const ROOMS: Room[] = [
  {
    id: 1,
    host: '林同学',
    avatar: '林',
    name: '紫金港夜羽',
    sport: '羽毛球',
    time: '5月15日',
    period: '晚上',
    location: '紫金港体育馆',
    group: '信电学院',
    level: '进阶',
    style: '双打轮换',
    visibility: 'public',
    status: 'notStarted',
    joinMode: 'review',
    gender: '男女混合',
    count: '4-6人',
    description: '晚场双打轮换，节奏偏快，希望能稳定拉开和主动上网。',
    currentCount: 3,
    targetCount: 6,
    companionCodeRequired: true
  },
  {
    id: 2,
    host: '阿舟',
    avatar: '舟',
    name: '晨练网球局',
    sport: '网球',
    time: '5月16日',
    period: '上午',
    location: '玉泉网球场',
    group: '竺可桢学院',
    level: '新手友好',
    style: '练习为主',
    visibility: 'public',
    status: 'notStarted',
    joinMode: 'direct',
    gender: '男女混合',
    count: '2-4人',
    description: '以底线多拍和发球练习为主，新手可加入，按到场情况轮换。',
    currentCount: 2,
    targetCount: 4,
    companionCodeRequired: true
  },
  {
    id: 3,
    host: 'Mia',
    avatar: 'M',
    name: '女单乒乓',
    sport: '乒乓球',
    time: '5月14日',
    period: '下午',
    location: '西溪校区球馆',
    group: '传媒学院',
    level: '中等',
    style: '单打',
    visibility: 'public',
    status: 'notStarted',
    joinMode: 'direct',
    gender: '全部女生',
    count: '2人',
    description: '单打练习，偏控球和相持，适合有基础的同学。',
    currentCount: 1,
    targetCount: 2,
    companionCodeRequired: false
  },
  {
    id: 4,
    host: '周周',
    avatar: '周',
    name: '篮球半场',
    sport: '篮球',
    time: '5月12日',
    period: '晚上',
    location: '紫金港东操',
    group: '社团',
    level: '进阶',
    style: '对抗强',
    visibility: 'public',
    status: 'started',
    joinMode: 'review',
    gender: '全部男生',
    count: '6-8人',
    description: '半场三对三，强度较高，活动已开始，不出现在大厅搜索结果中。',
    currentCount: 6,
    targetCount: 8,
    companionCodeRequired: false
  }
]
