import { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function ProfileScreen() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

          <Card style={styles.card} elevation={2}>
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

          <Card style={styles.card} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <ThemedText style={styles.sectionTitle}>About Kitt Style Toolkit</ThemedText>
              <ThemedText style={styles.aboutText}>
                Your personal style companion featuring daily style inspiration, outfit weather reports,
                and a capsule wardrobe builder.
              </ThemedText>
            </Card.Content>
          </Card>
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

        <Card style={styles.card} elevation={2}>
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

        <Card style={styles.card} elevation={2}>
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
    fontSize: 36,
    fontWeight: '200',
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.subtitle,
    fontSize: 12,
    fontWeight: '300',
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
});
