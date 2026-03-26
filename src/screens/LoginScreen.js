import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,

} from 'react-native'
import { getAndSaveFcmToken } from '../utils/fcmServices';
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth'
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore'
import { setuser, setLoading } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
  }
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    try {
      const Auth = getAuth();
      const db = getFirestore();
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user
      const path = doc(db, "users", user.uid)
      const getdata = await getDoc(path)
      const userData = getdata.data();
      // console.log("role,", userData.role)
      dispatch(setuser({
        user: {
          uid: user.uid,
          email: user.email,
        },
        role: userData?.role,
      }));
      const token = await getAndSaveFcmToken();
      console.log('FCM TOKEN:', token);
      //Alert.alert("Success", "Login successful");

      // if (userData.role === "guard") {
      //   Alert.alert("Successfull", "Guard role")
      //   navigation.navigate("Guard");
      // } else if (userData.role === "admin") {
      //   Alert.alert("Successfull", "Admin role")
      // } else {
      //   Alert.alert("Error", "Invalid role")
      // }
    } catch (error) {
      console.log("errorrr", error.message)
      Alert.alert('Error', error.message || 'Login failed');

    }
    // navigation.navigate("Guard");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLogin()} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 35,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
  },
  loginBtn: {
    height: 52,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  bottomText: {
    fontSize: 14,
    color: '#666',
  },
  signupText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
})