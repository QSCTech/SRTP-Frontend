import { View } from '@tarojs/components'
import { PropsWithChildren } from 'react'
import './index.css'

/* Card 组件：白底 + 圆角 + 轻阴影容器，用于包裹列表项或其他内容区块 */
interface CardProps {
  className?: string
  style?: React.CSSProperties
}

export default function Card({ children, className = '', style }: PropsWithChildren<CardProps>) {
  return (
    <View className={`card ${className}`} style={style}>
      {children}
    </View>
  )
}
