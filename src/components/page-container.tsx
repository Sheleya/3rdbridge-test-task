import { useNavigation } from "expo-router"
import React, { FC, PropsWithChildren } from "react"
import { Pressable, StyleSheet, Image, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Colors, device } from "../utils"
import { useHeaderImageAnimation } from "../hooks"
import Animated from "react-native-reanimated"

type PageContainerProps = {
  title: string
  imageURI?: string
  scrollable?: boolean;
}

export const PageContainer: FC<PropsWithChildren<PageContainerProps>> =
  ({ children, title, imageURI, scrollable = false }) => {
    const insets = useSafeAreaInsets()
    const { goBack } = useNavigation()
    const { 
      scrollHandler, 
      animatedImageStyle, 
      animatedHeaderStyle, 
      stubHeight
    } = useHeaderImageAnimation();

    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, !scrollable && { position: 'relative' }]}>
          <Animated.View style={[styles.header, { paddingTop: insets.top }, scrollable && animatedHeaderStyle]}>
            <Pressable onPress={goBack} style={[styles.button, styles.part]}>
              <Text style={styles.back}>← Back</Text>
            </Pressable>
            <Text style={[styles.title, styles.part]}>{title}</Text>
            <View style={styles.part} />
            {imageURI && (
              <Animated.Image 
                source={{ uri: imageURI }} 
                resizeMode="contain" 
                style={animatedImageStyle} 
              />
            )}
          </Animated.View>
        </View>

        {scrollable 
          ? (
            <Animated.ScrollView 
              bounces={false}
              contentContainerStyle={{ minHeight: device.height + stubHeight }} 
              onScroll={scrollHandler}
            >
              <View style={{ height: stubHeight, zIndex: -99 }} />
              {children}
            </Animated.ScrollView>
          ) 
          : <>{children}</>
        }
       
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  back: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  button: {
    paddingVertical: 16
  },
  header: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  part: {
    flex: 1,
  },
})
