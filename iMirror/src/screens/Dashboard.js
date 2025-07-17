import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavBar from '../components/FooterNavBar';

const Dashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [selfAssessmentScore, setSelfAssessmentScore] = useState(null);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const welcomeTranslateY = useSharedValue(-20);
  const cardsOpacity = useSharedValue(0);
  const cardsTranslateY = useSharedValue(20);

  useEffect(() => {
    // Start animations
    headerOpacity.value = withTiming(1, { duration: 600 });
    welcomeTranslateY.value = withTiming(0, { duration: 600 });
    cardsOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    cardsTranslateY.value = withDelay(200, withTiming(0, { duration: 600 }));
    
    // Load user data from AsyncStorage
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        
        const storedScore = await AsyncStorage.getItem('selfAssessmentScore');
        if (storedScore) {
          setSelfAssessmentScore(parseFloat(storedScore));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    
    loadUserData();
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: welcomeTranslateY.value }],
    };
  });

  const cardsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardsOpacity.value,
      transform: [{ translateY: cardsTranslateY.value }],
    };
  });

  const CardItem = ({ title, subtitle, image, onPress }) => {
    const scale = useSharedValue(1);
    
    const cardAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });
    
    const handlePress = () => {
      scale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      onPress();
    };
    
    return (
      <Animated.View style={[styles.cardAnimated, cardAnimatedStyle]}>
        <TouchableOpacity 
          style={styles.card}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Image source={{ uri: image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <View style={styles.logoInner1} />
            <View style={styles.logoInner2} />
            <View style={styles.logoStar} />
          </View>
          <Text style={styles.logoText}>iMirror</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('SetupProfile')}
          >
            {userData?.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>
                  {userData?.name ? userData.name[0].toUpperCase() : '?'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#1D1B20" />
            </Svg>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.welcomeSection, welcomeAnimatedStyle]}>
          <Text style={styles.welcomeTitle}>
            {userData?.name ? `Welcome, ${userData.name}!` : "Welcome!"}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            What would you like to do today?
          </Text>
        </Animated.View>
        
        <Animated.View style={[styles.cardsContainer, cardsAnimatedStyle]}>
          <View style={styles.cardsRow}>
            <CardItem 
              title="Request Feedback"
              subtitle="1/5 completed"
              image="https://c.animaapp.com/hUOULd8k/img/image-26@2x.png"
              onPress={() => navigation.navigate('RequestFeedback')}
            />
            <CardItem 
              title="Self Assessment"
              subtitle="Try it now"
              image="https://c.animaapp.com/hUOULd8k/img/image-28@2x.png"
              onPress={() => navigation.navigate('SelfAssessment')}
            />
          </View>
          
          <View style={styles.cardsRow}>
            <CardItem 
              title="Journal Stories"
              subtitle="Write today"
              image="https://c.animaapp.com/hUOULd8k/img/open-book@2x.png"
              onPress={() => navigation.navigate('Journals')}
            />
            <CardItem 
              title="Coaches"
              subtitle="Find support"
              image="https://c.animaapp.com/hUOULd8k/img/image-27@2x.png"
              onPress={() => navigation.navigate('Coaches')}
            />
          </View>
          
          <TouchableOpacity style={styles.sessionsCard}>
            <View style={styles.sessionsIconContainer}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M12 8V12L15 15" stroke="#74a4ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#74a4ee" strokeWidth="2"/>
              </Svg>
            </View>
            <View>
              <Text style={styles.sessionsTitle}>My Sessions</Text>
              <Text style={styles.sessionsSubtitle}>No upcoming sessions</Text>
            </View>
          </TouchableOpacity>
          
          {selfAssessmentScore !== null && (
            <View style={styles.assessmentCard}>
              <Text style={styles.assessmentTitle}>Self-Assessment Progress</Text>
              <View style={styles.assessmentContent}>
                <Text style={styles.assessmentScore}>
                  Your Latest Score: {Math.round(selfAssessmentScore)}%
                </Text>
                <View style={styles.progressBarContainer}>
                  <Animated.View 
                    style={[
                      styles.progressBar,
                      { width: `${selfAssessmentScore}%` }
                    ]}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SelfAssessment')}
                >
                  <Text style={styles.assessmentLink}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <View style={styles.updatesSection}>
            <Text style={styles.updatesSectionTitle}>Updates</Text>
            <View style={styles.updatesCard}>
              <View style={styles.updatesIconContainer}>
                <Image 
                  source={{ uri: "https://c.animaapp.com/hUOULd8k/img/vector.svg" }}
                  style={styles.updatesIcon}
                />
              </View>
              <Text style={styles.updatesText}>No new updates</Text>
            </View>
          </View>
          
          {/* Extra space at bottom for scrolling past the footer */}
          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>
      
      <FooterNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  logoInner1: {
    position: 'absolute',
    width: 20,
    height: 30,
    top: 2,
    left: 0,
    backgroundColor: 'rgba(151, 131, 211, 0.02)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#74a4ee',
  },
  logoInner2: {
    position: 'absolute',
    width: 20,
    height: 30,
    top: 8,
    left: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9783d3',
  },
  logoStar: {
    position: 'absolute',
    width: 10,
    height: 10,
    top: 0,
    left: 25,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#74a4ee',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#74a4ee',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardAnimated: {
    width: '48%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    height: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sessionsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  sessionsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sessionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionsSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  assessmentCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  assessmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  assessmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  assessmentScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    width: '100%',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    flex: 1,
    marginRight: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#74a4ee',
    borderRadius: 5,
  },
  assessmentLink: {
    fontSize: 14,
    color: '#74a4ee',
    fontWeight: '500',
  },
  updatesSection: {
    marginTop: 8,
  },
  updatesSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  updatesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  updatesIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  updatesIcon: {
    width: 20,
    height: 20,
  },
  updatesText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default Dashboard;
