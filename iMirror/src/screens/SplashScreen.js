import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  runOnJS
} from 'react-native-reanimated';

const SplashScreen = ({ navigation }) => {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // Animate logo
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { duration: 800 });
    
    // Animate text with delay
    textOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(300, withTiming(0, { duration: 800 }));
    
    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace('GetStartedScreen');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logo}>
          <View style={styles.logoInner1} />
          <View style={styles.logoInner2} />
          <View style={styles.logoStar} />
        </View>
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Text style={styles.title}>iMirror</Text>
        <Text style={styles.subtitle}>Know yourself from who knows you best!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(168deg, rgba(219,234,254,1) 11%, rgba(202,225,254,1) 43%, rgba(252,231,243,1) 100%)',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  logoInner1: {
    position: 'absolute',
    width: 50,
    height: 80,
    top: 5,
    left: 0,
    backgroundColor: 'rgba(151, 131, 211, 0.02)',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#74a4ee',
  },
  logoInner2: {
    position: 'absolute',
    width: 50,
    height: 80,
    top: 21,
    left: 25,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#9783d3',
  },
  logoStar: {
    position: 'absolute',
    width: 26,
    height: 26,
    top: 0,
    left: 69,
    backgroundColor: '#FFD700',
    borderRadius: 13,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 92,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});

export default SplashScreen;
