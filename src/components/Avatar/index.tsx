import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import './index.css'

/* Avatar 头像组件：圆形，支持远程图片 / 本地图片 / 纯色首字回退 */
interface AvatarProps {
  src?: string          // 头像图片 URL（可选，没有则显示首字）
  name: string          // 用户昵称，取首字做 fallback
  size?: number         // 头像尺寸，默认 96（按 750 设计稿 px = rpx）
  theme?: 'cyan' | 'orange' | 'yellow' | 'blue' // 背景色主题，默认 cyan
}

/* 背景色映射 */
const THEME_COLORS: Record<string, string> = {
  cyan: '#22B5AF',
  orange: '#FF782A',
  yellow: '#FFB001',
  blue: '#4874FA'
}

export default function Avatar({ src, name, size = 96, theme = 'cyan' }: AvatarProps) {
  const [imgError, setImgError] = useState(false) // 图片加载失败时回退到首字

  const bgColor = THEME_COLORS[theme] || THEME_COLORS.cyan
  const firstChar = name ? name.slice(0, 1) : '?'

  return (
    <View
      className='avatar'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: src && !imgError ? 'transparent' : bgColor
      }}
    >
      {/* 有远程图片且未加载失败时显示图片 */}
      {src && !imgError ? (
        <Image
          className='avatar__img'
          src={src}
          mode='aspectFill'
          style={{ width: `${size}px`, height: `${size}px` }}
          onError={() => setImgError(true)}
        />
      ) : (
        <Text className='avatar__fallback' style={{ fontSize: `${size * 0.4}px` }}>
          {firstChar}
        </Text>
      )}
    </View>
  )
}
