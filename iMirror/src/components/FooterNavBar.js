import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';

const FooterNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => {
    return route.name === routeName;
  };

  const renderIcon = (name, active) => {
    const color = active ? '#74a4ee' : '#6e6e6e';
    
    switch (name) {
      case 'home':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M9 22V12H15V22" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'messages':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'notifications':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'profile':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        );
      default:
        return null;
    }
  };

  const NavItem = ({ name, label, routeName }) => {
    const active = isActive(routeName);
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePress = () => {
      scale.value = withSpring(0.9, { damping: 10 }, () => {
        scale.value = withSpring(1);
      });
      navigation.navigate(routeName);
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.navItem}>
        <Animated.View style={[styles.iconContainer, animatedStyle, active && styles.activeIcon]}>
          {renderIcon(name, active)}
        </Animated.View>
        <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <NavItem name="home" label="Home" routeName="Dashboard" />
      <NavItem name="messages" label="Messages" routeName="Messages" />
      
      {/* Center Add Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('RequestFeedback')}
        activeOpacity={0.8}
      >
        <View style={styles.plusIcon}>
          <Text style={styles.plus}>+</Text>
        </View>
      </TouchableOpacity>
      
      <NavItem name="notifications" label="Alerts" routeName="Notifications" />
      <NavItem name="profile" label="Profile" routeName="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#f8f5ff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    backgroundColor: '#e9e1ff',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#6e6e6e',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#74a4ee',
  },
  addButton: {
    width: 65,
    height: 65,
    backgroundColor: '#74a4ee',
    borderRadius: 32.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#74a4ee',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  plusIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default FooterNavBar;
