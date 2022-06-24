import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import Loading from './comp/Loading';
import Logo from './comp/Logo';
import UserContext from './contexts/user.context';
import Tabs from './pages/Tabs';
import { getUser, userLogIn, userSignUp } from './services/user.service';
import colors from './static/colors';
import fonts from './static/fonts';
import inputStyles from './styles/input';
import textStyles from './styles/text';


/*Auth */
const Auth = () => {
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  //
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [authType, setAuthType] = React.useState("login")//login or signup
  const { setUser } = React.useContext(UserContext)
  const changeAuthType = (type) => {
    setAuthType(type)
  }
  const signUp = async () => {
    try {
      const user = await userSignUp({ name, phone, password,email })
      setUser(user)
    } catch (err) {
      console.log(err)
      Alert.alert("Error",err.message,[{text:"Got it!",onPress:()=>{}}])
    }
  }
  const logIn = async () => {
    try {
      const user = await userLogIn({ email, password })
      setUser(user)
    } catch (err) {
      console.log(err)
      Alert.alert("Error",err.message,[{text:"Got it!",onPress:()=>{}}])
    }
  }

  if (authType == "login") {
    return (
      <View style={authStyles.main}>
        <View style={authStyles.logoContainer}>
          <Logo />
        </View>
        <View style={authStyles.inpContainer}>
          <Text style={textStyles.simple}>Login to your account</Text>
          <TextInput value={email} onChangeText={setEmail} style={inputStyles.simple} placeholder="Email" />
          <TextInput value={password} onChangeText={setPassword} style={inputStyles.simple} placeholder="Password" secureTextEntry={true} />
          <TouchableOpacity onPress={logIn} style={authStyles.logIn}><Text style={[textStyles.simple, { fontFamily: fonts.textBold, color: "white" }]}>Log In</Text></TouchableOpacity>
        </View>
        <View style={authStyles.alternate}>
          <Text style={textStyles.simple}>Do not have an account? </Text>
          <TouchableOpacity onPress={() => { changeAuthType("signup") }}>
            <Text style={{ color: "darkblue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={authStyles.main}>
        <View style={authStyles.logoContainer}>
          <Logo />
        </View>
        <View style={authStyles.inpContainer}>
          <Text style={textStyles.simple}>Signup for a new account</Text>
          <TextInput value={name} onChangeText={setName} style={inputStyles.simple} placeholder="Name" />
          <TextInput value={phone} onChangeText={setPhone} style={inputStyles.simple} placeholder="Phone No" />
          <TextInput value={email} onChangeText={setEmail} style={inputStyles.simple} placeholder="Email" />
          <TextInput value={password} onChangeText={setPassword} style={inputStyles.simple} placeholder="Password" secureTextEntry={true} />
          <TouchableOpacity onPress={signUp} style={authStyles.logIn}><Text style={[textStyles.simple, { fontFamily: fonts.textBold, color: "white" }]}>Sign Up</Text></TouchableOpacity>
        </View>
        <View style={authStyles.alternate}>
          <Text style={textStyles.simple}>Got an account? </Text>
          <TouchableOpacity onPress={() => { changeAuthType("login") }}>
            <Text style={{ color: "darkblue" }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const authStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  inpContainer: {
    width: "95%",
  },
  alternate: {
    flexDirection: "row",
  },
  logIn: {
    paddingVertical: 5,
    borderColor: colors.purple,
    backgroundColor: colors.purple,
    borderWidth: 2,
    alignItems: "center"
  }
})


/*Auth */
const App = () => {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    const func = async () => {
      try {
        const user = await getUser();
        setUser(user)
      } catch (err) {
        console.log(err)
        setUser(false)//means re login required 
      }
    }
    func()
  }, [])
  const render = () => {
    //render according to the user state
    if (user == null) {
      return <Loading />
    } else if (user == false) {
      return <Auth></Auth>
    } else {
      return <Tabs />
    }
  }
  return (
    <UserContext.Provider value={{ setUser, user }}>
      <View style={appStyles.main}>
        {render()}
      </View>
    </UserContext.Provider>
  )
}



const appStyles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1
  }
})




export default App;
