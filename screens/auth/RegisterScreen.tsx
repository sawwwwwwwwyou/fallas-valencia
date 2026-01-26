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

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { signUp, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!password) {
      newErrors.password = 'Contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Debe incluir al menos una mayúscula';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Debe incluir al menos un número';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    const { error } = await signUp(email, password);
    
    if (error) {
      if (error.message.includes('already registered')) {
        Alert.alert('Error', 'Este email ya está registrado');
      } else {
        Alert.alert('Error de registro', error.message);
      }
    } else {
      Alert.alert(
        '¡Registro exitoso! 🎉',
        'Te hemos enviado un email de confirmación. Por favor verifica tu cuenta.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '#E0E0E0' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { strength, label: 'Débil', color: '#FF4444' };
    if (strength <= 3) return { strength, label: 'Media', color: '#FFA500' };
    return { strength, label: 'Fuerte', color: '#4CAF50' };
  };

  const passwordStrength = getPasswordStrength();

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
              <Text style={styles.logo}>🎆</Text>
              <Text style={styles.title}>Crear cuenta</Text>
              <Text style={styles.subtitle}>Únete a la fiesta fallera</Text>
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
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="tu@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                />
                {password.length > 0 && (
                  <View style={styles.strengthContainer}>
                    <View style={styles.strengthBars}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <View
                          key={i}
                          style={[
                            styles.strengthBar,
                            {
                              backgroundColor:
                                i <= passwordStrength.strength
                                  ? passwordStrength.color
                                  : '#E0E0E0',
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                      {passwordStrength.label}
                    </Text>
                  </View>
                )}
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar contraseña</Text>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: undefined });
                  }}
                />
                {confirmPassword && password === confirmPassword && (
                  <Text style={styles.matchText}>✓ Las contraseñas coinciden</Text>
                )}
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Terms Checkbox */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => {
                  setAcceptTerms(!acceptTerms);
                  if (errors.terms) setErrors({ ...errors, terms: undefined });
                }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    acceptTerms && styles.checkboxChecked,
                    errors.terms && styles.checkboxError,
                  ]}
                >
                  {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  Acepto los{' '}
                  <Text style={styles.termsLink}>términos de servicio</Text> y la{' '}
                  <Text style={styles.termsLink}>política de privacidad</Text>
                </Text>
              </TouchableOpacity>
              {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

              {/* Register Button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                )}
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Login Link */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
          >
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 32,
  },
  logo: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    marginBottom: 16,
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
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
  },
  strengthBar: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  matchText: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  checkboxError: {
    borderColor: '#FF4444',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsLink: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  loginText: {
    color: '#666',
    fontSize: 15,
  },
  loginLink: {
    color: '#FF6B35',
    fontSize: 15,
    fontWeight: '600',
  },
});
