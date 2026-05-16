import { View, Text } from '@tarojs/components'
import './index.css'

/* Cell 列表项：左图标 + 标题 + 右箭头，支持点击 */
interface CellProps {
  icon: string     // 图标（emoji 占位，后续可换 SVG 图标组件）
  title: string    // 标题文字
  onClick?: () => void
}

export default function Cell({ icon, title, onClick }: CellProps) {
  return (
    <View className='cell' onClick={onClick}>
      <Text className='cell__icon'>{icon}</Text>
      <Text className='cell__title'>{title}</Text>
      <Text className='cell__arrow'>{'>'}</Text>
    </View>
  )
}

/* CellGroup：将一组 Cell 自动加上分割线（最后一个不加） */
interface CellGroupProps {
  cells: CellProps[]
}

export function CellGroup({ cells }: CellGroupProps) {
  return (
    <View className='cell-group'>
      {cells.map((cell, index) => (
        <View key={index}>
          <Cell {...cell} />
          {/* 最后一个不加分割线 */}
          {index < cells.length - 1 && <View className='cell-group__divider' />}
        </View>
      ))}
    </View>
  )
}
