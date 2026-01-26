import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatedScreen } from '../../components';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { resetPassword, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [sent, setSent] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email es obligatorio');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email no válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;
    
    const { error: resetError } = await resetPassword(email);
    
    if (resetError) {
      Alert.alert('Error', resetError.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <AnimatedScreen style={styles.container}>
        <View style={styles.successContainer}>
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✉️</Text>
            </View>
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400, delay: 200 }}
          >
            <Text style={styles.successTitle}>¡Email enviado!</Text>
            <Text style={styles.successText}>
              Hemos enviado instrucciones para restablecer tu contraseña a{' '}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
            <Text style={styles.successHint}>
              Revisa tu bandeja de entrada y spam
            </Text>
          </MotiView>
          
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 400 }}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                setSent(false);
                handleResetPassword();
              }}
            >
              <Text style={styles.resendText}>¿No recibiste el email? Reenviar</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </AnimatedScreen>
    );
  }

  return (
    <AnimatedScreen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <View style={styles.header}>
              <Text style={styles.logo}>🔑</Text>
              <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
              <Text style={styles.subtitle}>
                No te preocupes, te enviaremos instrucciones para restablecerla
              </Text>
            </View>
          </MotiView>

          {/* Form */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
          >
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="tu@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError('');
                  }}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>Enviar instrucciones</Text>
                )}
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Back to Login Link */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
          >
            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backToLoginText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#FF4444',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#FF6B35',
  },
  backToLoginText: {
    color: '#FF6B35',
    fontSize: 15,
    fontWeight: '600',
  },
  // Success screen styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 48,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  emailHighlight: {
    fontWeight: '600',
    color: '#333',
  },
  successHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
