import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence
} from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { Svg, Path, ClipPath, G } from 'react-native-svg';

const SetupProfile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const imageScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  // Check form validity whenever form data changes
  React.useEffect(() => {
    const { name } = formData;
    setIsFormValid(name.trim() !== '');
  }, [formData]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    imageScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (isFormValid) {
      buttonScale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      
      try {
        // Save user data to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(formData));
        
        // Save profile image if exists
        if (profileImage) {
          await AsyncStorage.setItem('profileImage', profileImage);
        }
        
        // Navigate to dashboard
        navigation.navigate('Dashboard');
      } catch (error) {
        console.error('Error saving user data:', error);
        Alert.alert('Error', 'Failed to save your profile data. Please try again.');
      }
    }
  };

  const handleSkip = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Set up Profile</Text>
        </View>
        
        <View style={styles.card}>
          <Animated.View style={[styles.profileImageContainer, imageAnimatedStyle]}>
            <TouchableOpacity 
              style={styles.profileImageButton}
              onPress={handleImagePick}
            >
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.cameraIconContainer}>
                  <Svg width={40} height={40} viewBox="0 0 79 77" fill="none">
                    <Path
                      clipRule="evenodd"
                      d="M26.1124 22.5458L28.5145 19.0362C29.7192 17.276 31.7474 16.2188 33.9193 16.2188H44.2884C46.4602 16.2188 48.4884 17.276 49.6931 19.0362L52.0953 22.5458H68.3346V57.3443H9.87305V22.5458H26.1124Z"
                      fillRule="evenodd"
                      stroke="#3A3CB9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      clipRule="evenodd"
                      d="M39.103 47.856C44.4842 47.856 48.8466 43.607 48.8466 38.3655C48.8466 33.1241 44.4842 28.875 39.103 28.875C33.7217 28.875 29.3594 33.1241 29.3594 38.3655C29.3594 43.607 33.7217 47.856 39.103 47.856Z"
                      fillRule="evenodd"
                      stroke="#3A3CB9"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
          
          <Text style={styles.sectionLabel}>Profile Picture</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={formData.age}
              onChangeText={(text) => handleInputChange('age', text)}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <TextInput
                style={styles.input}
                placeholder="Select Gender"
                value={formData.gender}
                editable={false}
              />
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => {
                  // Show gender picker options
                  Alert.alert(
                    "Select Gender",
                    "Choose your gender",
                    [
                      { text: "Male", onPress: () => handleInputChange('gender', 'Male') },
                      { text: "Female", onPress: () => handleInputChange('gender', 'Female') },
                      { text: "Other", onPress: () => handleInputChange('gender', 'Other') },
                      { text: "Prefer not to say", onPress: () => handleInputChange('gender', 'Prefer not to say') },
                      { text: "Cancel", style: "cancel" }
                    ]
                  );
                }}
              >
                <Text style={styles.pickerButtonText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
              multiline
              numberOfLines={4}
            />
          </View>
          
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <Button
              label="Continue"
              onPress={handleContinue}
              disabled={!isFormValid}
            />
          </Animated.View>
          
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(168deg, rgba(219,234,254,1) 11%, rgba(202,225,254,1) 43%, rgba(252,231,243,1) 100%)',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#090a0a',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 40,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 35.3,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e9eefd',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageButton: {
    width: 162,
    height: 162,
    borderRadius: 81,
    backgroundColor: '#ecedff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#9783d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cameraIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 60,
    backgroundColor: '#f5f7fc',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e9eefd',
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  pickerContainer: {
    position: 'relative',
  },
  pickerButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  skipButton: {
    alignSelf: 'center',
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4d1bf1',
  },
});

export default SetupProfile;
