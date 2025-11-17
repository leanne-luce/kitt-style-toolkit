import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const setupSession = async () => {
      try {
        // For Expo Go, the deep link won't work
        // Instead, check if there's an active session from clicking the email link
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Current session:', !!session);

        if (session) {
          // User clicked the email link and has an active recovery session
          setSessionReady(true);
        } else {
          // No session - show an error
          Alert.alert(
            'Open Email Link First',
            'Please click the password reset link in your email, then return to the app to set your new password.',
            [
              {
                text: 'OK',
                onPress: () => router.replace('/'),
              },
            ]
          );
        }
      } catch (error) {
        console.error('Session setup error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    setupSession();
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert(
        'Success',
        'Your password has been reset successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Sign out to clear the session and redirect to login
              supabase.auth.signOut();
              router.replace('/');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Reset password error:', error);
      Alert.alert('Error', error.message || 'Failed to reset password');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>Verifying...</ThemedText>
          <ThemedText style={styles.subtitle}>Please wait while we verify your reset link</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (!sessionReady) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Reset Password</ThemedText>
        <ThemedText style={styles.subtitle}>Enter your new password</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={Colors.light.border}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.light.border}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
        >
          <ThemedText style={styles.buttonText}>Reset Password</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.replace('/')}
        >
          <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
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
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 32,
  },
  input: {
    ...Typography.body,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.text,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.light.background,
    ...Typography.body,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    ...Typography.body,
    fontSize: 14,
    opacity: 0.6,
  },
});
