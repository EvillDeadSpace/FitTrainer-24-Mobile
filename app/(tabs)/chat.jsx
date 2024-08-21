import { View, Text } from 'react-native'
import React from 'react'

import Chat from '../(profile)/Chat'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatComponent = () => {
  return (
    <SafeAreaView>
      <Chat/>
    </SafeAreaView>
  )
}

export default ChatComponent