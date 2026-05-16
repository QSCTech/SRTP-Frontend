import { View, Text } from '@tarojs/components'

/* 大厅页 - 占位，后续由队友实现 */
export default function Lobby() {
  return (
    <View className='page-shell' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'var(--c-gray-1)', fontSize: '28px' }}>大厅建设中...</Text>
    </View>
  )
}
