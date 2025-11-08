import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Alert, Pressable, ActivityIndicator } from 'react-native';
import { Card, Button, TextInput, SegmentedButtons } from 'react-native-paper';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { UserProfile } from '@/types/profile';
import {
  getUserProfile,
  upsertUserProfile,
  uploadProfileImage,
  pickProfileImage,
} from '@/utils/profile-storage';

export default function ProfileScreen() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [genderPreference, setGenderPreference] = useState<'womens' | 'mens' | 'both'>('both');
  const [birthDate, setBirthDate] = useState('');

  // Format birth date with slashes as user types
  const handleBirthDateChange = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Format as MM/DD/YYYY
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }

    setBirthDate(formatted);
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Load profile when user is authenticated
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setIsLoadingProfile(true);
    try {
      const userProfile = await getUserProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        setFirstName(userProfile.first_name);
        setLastName(userProfile.last_name);
        setProfileImageUri(userProfile.profile_image_url || null);
        setGenderPreference(userProfile.gender_preference || 'both');
        setBirthDate(userProfile.birth_date || '');
      } else {
        // No profile yet, enable edit mode
        setIsEditMode(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const uri = await pickProfileImage();
      if (uri) {
        setProfileImageUri(uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to pick image');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Please enter your first and last name');
      return;
    }

    setIsSaving(true);
    try {
      let imageUrl = profile?.profile_image_url;

      // Upload new image if selected
      if (profileImageUri && profileImageUri !== profile?.profile_image_url) {
        const uploadedUrl = await uploadProfileImage(user.id, profileImageUri);
        imageUrl = uploadedUrl || undefined;
      }

      // Save profile
      const updatedProfile = await upsertUserProfile(
        user.id,
        firstName.trim(),
        lastName.trim(),
        imageUrl || undefined,
        genderPreference,
        birthDate.trim() || undefined
      );

      setProfile(updatedProfile);
      setIsEditMode(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setProfileImageUri(profile.profile_image_url || null);
      setGenderPreference(profile.gender_preference || 'both');
      setBirthDate(profile.birth_date || '');
    } else {
      setFirstName('');
      setLastName('');
      setProfileImageUri(null);
      setGenderPreference('both');
      setBirthDate('');
    }
    setIsEditMode(false);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        Alert.alert('Success', 'Check your email to confirm your account!');
        setEmail('');
        setPassword('');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Sign out failed');
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (user) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Profile
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Your style profile
            </ThemedText>
          </View>

          {isLoadingProfile ? (
            <Card style={styles.card} elevation={0}>
              <Card.Content style={styles.cardContent}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
                <ThemedText style={styles.loadingText}>Loading profile...</ThemedText>
              </Card.Content>
            </Card>
          ) : (
            <>
              <Card style={styles.card} elevation={0}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.profileHeader}>
                    <ThemedText style={styles.sectionTitle}>Personal Info</ThemedText>
                    {!isEditMode && profile && (
                      <Button
                        mode="text"
                        onPress={() => setIsEditMode(true)}
                        textColor={Colors.light.tint}
                        compact>
                        Edit
                      </Button>
                    )}
                  </View>

                  {/* Profile Image */}
                  <View style={styles.imageSection}>
                    <Pressable
                      onPress={isEditMode ? handlePickImage : undefined}
                      style={styles.imageContainer}>
                      {profileImageUri ? (
                        <Image source={{ uri: profileImageUri }} style={styles.profileImage} contentFit="cover" />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <MaterialCommunityIcons name="account" size={60} color={Colors.light.icon} />
                        </View>
                      )}
                      {isEditMode && (
                        <View style={styles.imageOverlay}>
                          <MaterialCommunityIcons name="camera" size={32} color="#fff" />
                        </View>
                      )}
                    </Pressable>
                    {isEditMode && (
                      <ThemedText style={styles.imageHint}>Tap to change photo</ThemedText>
                    )}
                  </View>

                  {/* Name Fields */}
                  {isEditMode ? (
                    <>
                      <TextInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={Colors.light.border}
                        activeOutlineColor={Colors.light.tint}
                      />
                      <TextInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={Colors.light.border}
                        activeOutlineColor={Colors.light.tint}
                      />

                      <TextInput
                        label="Birth Date (MM/DD/YYYY)"
                        value={birthDate}
                        onChangeText={handleBirthDateChange}
                        mode="outlined"
                        style={styles.input}
                        outlineColor={Colors.light.border}
                        activeOutlineColor={Colors.light.tint}
                        placeholder="01/15/1990"
                        keyboardType="numeric"
                        maxLength={10}
                      />

                      {/* Gender Preference */}
                      <View style={styles.genderSection}>
                        <ThemedText style={styles.genderLabel}>Fashion Preference</ThemedText>
                        <SegmentedButtons
                          value={genderPreference}
                          onValueChange={(value) => setGenderPreference(value as 'womens' | 'mens' | 'both')}
                          buttons={[
                            {
                              value: 'womens',
                              label: "Women's",
                              style: genderPreference === 'womens' ? { backgroundColor: Colors.light.tint } : {},
                            },
                            {
                              value: 'mens',
                              label: "Men's",
                              style: genderPreference === 'mens' ? { backgroundColor: Colors.light.tint } : {},
                            },
                            {
                              value: 'both',
                              label: 'Both',
                              style: genderPreference === 'both' ? { backgroundColor: Colors.light.tint } : {},
                            },
                          ]}
                          style={styles.segmentedButtons}
                        />
                      </View>

                      <View style={styles.buttonRow}>
                        <Button
                          mode="outlined"
                          onPress={handleCancelEdit}
                          disabled={isSaving}
                          style={styles.cancelButton}
                          textColor={Colors.light.tint}>
                          Cancel
                        </Button>
                        <Button
                          mode="contained"
                          onPress={handleSaveProfile}
                          loading={isSaving}
                          disabled={isSaving}
                          style={styles.saveButton}
                          buttonColor={Colors.light.tint}>
                          Save
                        </Button>
                      </View>
                    </>
                  ) : (
                    <>
                      {profile ? (
                        <>
                          <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>Name:</ThemedText>
                            <ThemedText style={styles.value}>
                              {firstName} {lastName}
                            </ThemedText>
                          </View>
                          {birthDate && (
                            <View style={styles.infoRow}>
                              <ThemedText style={styles.label}>Birth Date:</ThemedText>
                              <ThemedText style={styles.value}>{birthDate}</ThemedText>
                            </View>
                          )}
                          <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>Fashion Preference:</ThemedText>
                            <ThemedText style={styles.value}>
                              {genderPreference === 'womens' ? "Women's" : genderPreference === 'mens' ? "Men's" : 'Both'}
                            </ThemedText>
                          </View>
                        </>
                      ) : (
                        <ThemedText style={styles.noProfileText}>
                          Complete your profile to personalize your experience
                        </ThemedText>
                      )}
                    </>
                  )}
                </Card.Content>
              </Card>

              <Card style={styles.card} elevation={0}>
                <Card.Content style={styles.cardContent}>
                  <ThemedText style={styles.sectionTitle}>Account</ThemedText>

                  <View style={styles.infoRow}>
                    <ThemedText style={styles.label}>Email:</ThemedText>
                    <ThemedText style={styles.value}>{user.email}</ThemedText>
                  </View>

                  <Button
                    mode="contained"
                    onPress={handleSignOut}
                    style={styles.signOutButton}
                    buttonColor={Colors.light.tint}>
                    Sign Out
                  </Button>
                </Card.Content>
              </Card>
            </>
          )}
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            {isSignUp ? 'Join Kitt Style Toolkit' : 'Welcome back'}
          </ThemedText>
        </View>

        <Card style={styles.card} elevation={0}>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
              outlineColor={Colors.light.border}
              activeOutlineColor={Colors.light.tint}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              outlineColor={Colors.light.border}
              activeOutlineColor={Colors.light.tint}
            />

            <Button
              mode="contained"
              onPress={handleAuth}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.authButton}
              buttonColor={Colors.light.tint}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <Button
              mode="text"
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.toggleButton}
              textColor={Colors.light.tint}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card} elevation={0}>
          <Card.Content style={styles.cardContent}>
            <ThemedText style={styles.noteTitle}>Getting Started</ThemedText>
            <ThemedText style={styles.noteText}>
              Sign up or sign in to save your favorite outfits, build capsule wardrobes, and sync your
              style across devices.
            </ThemedText>
          </Card.Content>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    ...Typography.title,
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.subtitle,
    fontSize: 12,
    letterSpacing: 2,
    opacity: 0.6,
  },
  card: {
    marginBottom: 20,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardContent: {
    padding: 24,
  },
  sectionTitle: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: Colors.light.surface,
  },
  authButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  toggleButton: {
    marginTop: 8,
  },
  signOutButton: {
    marginTop: 24,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: 4,
  },
  value: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '300',
  },
  aboutText: {
    ...Typography.body,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
    opacity: 0.8,
  },
  noteTitle: {
    ...Typography.heading,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  noteText: {
    ...Typography.body,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
    opacity: 0.7,
  },
  loadingText: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.6,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHint: {
    ...Typography.caption,
    fontSize: 11,
    opacity: 0.5,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderColor: Colors.light.tint,
  },
  saveButton: {
    flex: 1,
  },
  noProfileText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '300',
    opacity: 0.6,
    textAlign: 'center',
    paddingVertical: 16,
  },
  genderSection: {
    marginBottom: 24,
  },
  genderLabel: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: 12,
  },
  segmentedButtons: {
    borderColor: Colors.light.border,
  },
});
