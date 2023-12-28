import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme, StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../src/redux/createStore'
import WagmiProvider from '../src/components/__Provider/WagmiProvider'
import Loading from '../src/components/Loading'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../src/assets/fonts/SpaceMono-Regular.ttf'),
    InterMedium: require('../src/assets/fonts/Inter-Medium.ttf'),
    InterBold: require('../src/assets/fonts/Inter-Bold.ttf'),
    InterRegular: require('../src/assets/fonts/Inter-Regular.ttf'),
    InterLight: require('../src/assets/fonts/Inter-Light.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: RootState) => state.loading)
  return (
    <WagmiProvider>
      <StatusBar backgroundColor="#fff" ></StatusBar>  
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="Collection" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
      <Toast></Toast>
      <Loading isVisible={isLoading}></Loading>
    </WagmiProvider>
  )
}
