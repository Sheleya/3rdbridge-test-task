import { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { device } from "../utils";
import { NativeScrollEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const IMAGE_SIZE = {
  min: 32,
  max: device.height * 0.25,
}
const HORIZONTAL_PADDING = 16;
const HEADER_HEIGHT = 50;
const SCROLL_RANGE = [0, IMAGE_SIZE.max];

export const useHeaderImageAnimation = () => {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const scrollHandler = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const imageSize = interpolate(
      scrollY.value, 
      SCROLL_RANGE, 
      [IMAGE_SIZE.max, IMAGE_SIZE.min],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      SCROLL_RANGE, 
      [-((device.width - IMAGE_SIZE.max) / 2 - HORIZONTAL_PADDING), 0],
      Extrapolation.CLAMP
    );

    const marginTop = interpolate(
      scrollY.value,
      SCROLL_RANGE, 
      [IMAGE_SIZE.max / 4, IMAGE_SIZE.min / 4],
      Extrapolation.CLAMP
    );

    return {
      width: imageSize,
      height: imageSize,
      marginTop,
      top: insets.top,
      right: HORIZONTAL_PADDING,
      transform: [{ translateX }],
      position: "absolute",
    }
  });


  const animatedHeaderStyle = useAnimatedStyle(() => {
    const paddingBottom = interpolate(
      scrollY.value, 
      SCROLL_RANGE, 
      [IMAGE_SIZE.max, 0],
      Extrapolation.CLAMP
    );

    return { paddingBottom }
  });

  const stubHeight = IMAGE_SIZE.max + HEADER_HEIGHT + insets.top;

  return {
    scrollHandler,
    animatedImageStyle,
    animatedHeaderStyle,
    stubHeight
  }
};