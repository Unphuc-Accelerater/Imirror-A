import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const GetStartedScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    {
      id: '1',
      title: 'Anonymous Feedback',
      image: 'https://c.animaapp.com/hUOULd8k/img/image-15@2x.png',
      description: 'Receive honest and anonymous feedback from people who know you best!'
    },
    {
      id: '2',
      title: 'Therapists & Coaches',
      image: 'https://c.animaapp.com/hUOULd8k/img/image-17@2x.png',
      description: 'Connect with professional therapists and certified coaches who can guide your personal development journey with expert insights.'
    },
    {
      id: '3',
      title: 'Grow Yourself Better',
      image: 'https://c.animaapp.com/hUOULd8k/img/image-19@2x.png',
      description: 'Transform feedback into actionable growth plans. Track your progress and become the best version of yourself with personalized insights.'
    }
  ];

  const buttonScale = useSharedValue(1);
  
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleButtonPress = () => {
    buttonScale.value = withSpring(0.95, {}, () => {
      buttonScale.value = withSpring(1);
    });
    navigation.navigate('LoginSignup');
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Animated.Image 
              source={{ uri: item.image }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive
            ]}
            onPress={() => {
              flatListRef.current.scrollToIndex({ index, animated: true });
            }}
          />
        ))}
      </View>
      
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <Button 
          label="Get Started" 
          onPress={handleButtonPress}
          variant="primary"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(168deg, rgba(219,234,254,1) 11%, rgba(202,225,254,1) 43%, rgba(252,231,243,1) 100%)',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  card: {
    width: 327,
    height: 404,
    backgroundColor: 'white',
    borderRadius: 43,
    alignItems: 'center',
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  image: {
    width: 65,
    height: 65,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default GetStartedScreen;
