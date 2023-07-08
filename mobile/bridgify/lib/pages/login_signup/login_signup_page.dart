import 'dart:io';

import 'package:bridgify/accessories/background.dart';
import 'package:bridgify/accessories/fadeAnimation.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';

import 'package:flutter/gestures.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/login_request_model.dart';
import 'package:bridgify/models/register_request_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  bool isAPICallProcess = false;
  bool hidePassword = true;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  String? emailLogin;
  String? passwordLogin;
  String? nameSignUp;
  String? emailSignUp;
  String? passwordSignUp;
  String? confirmPasswordSignUp;

  int _pageState = 1;

  var _backgroundColor = Colors.white;
  var _headingColor = const Color.fromARGB(251, 64, 40, 74);

  double _headingTop = 100;

  double _loginWidth = 0;
  double _loginHeight = 0;
  double _loginOpacity = 1;

  double _loginYOffset = 0;
  double _loginXOffset = 0;
  double _registerYOffset = 0;
  double _registerHeight = 0;

  double windowWidth = 0;
  double windowHeight = 0;

  bool _keyboardVisible = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: HexColor("#225518"),
        body: ProgressHUD(
          inAsyncCall: isAPICallProcess,
          opacity: 0.3,
          key: UniqueKey(),
          child: Form(
            key: globalFormKey,
            child: _loginUI(context),
          ),
        ),
      ),
    );
  }

  Widget _loginUI(BuildContext context) {
    windowHeight = MediaQuery.of(context).size.height;
    windowWidth = MediaQuery.of(context).size.width;

    _loginHeight = windowHeight - 270;
    _registerHeight = windowHeight - 270;

    switch (_pageState) {
      case 0:
        _backgroundColor = Colors.white;
        _headingColor = const Color.fromARGB(251, 64, 40, 74);

        _headingTop = 100;

        _loginWidth = windowWidth;
        _loginOpacity = 1;

        _loginYOffset = windowHeight;
        _loginHeight = _keyboardVisible ? windowHeight : windowHeight - 270;

        _loginXOffset = 0;
        _registerYOffset = windowHeight;
        break;
      case 1:
        _backgroundColor = const Color.fromARGB(251, 64, 40, 74);
        _headingColor = Colors.white;

        _headingTop = 90;

        _loginWidth = windowWidth;
        _loginOpacity = 1;

        _loginYOffset = _keyboardVisible ? 40 : 270;
        _loginHeight = _keyboardVisible ? windowHeight : windowHeight - 270;

        _loginXOffset = 0;
        _registerYOffset = windowHeight;
        break;
      case 2:
        _backgroundColor = const Color.fromARGB(251, 64, 40, 74);
        _headingColor = Colors.white;

        _headingTop = 90;

        _loginWidth = windowWidth - 40;
        _loginOpacity = 0.7;

        _loginYOffset = _keyboardVisible ? 30 : 240;
        _loginHeight = _keyboardVisible ? windowHeight : windowHeight - 240;

        _loginXOffset = 20;
        _registerYOffset = _keyboardVisible ? 55 : 170;
        _registerHeight = _keyboardVisible ? windowHeight : windowHeight - 190;
        break;
    }

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: <Widget>[
          const BackgroundWidget(),
          // const SizedBox(height: 20),
          //Login
          AnimatedContainer(
            padding: const EdgeInsets.all(32),
            width: _loginWidth,
            height: _loginHeight,
            curve: Curves.fastLinearToSlowEaseIn,
            duration: const Duration(milliseconds: 1000),
            transform:
                Matrix4.translationValues(_loginXOffset, _loginYOffset, 1),
            decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(60),
                    topRight: Radius.circular(60))),
            child: SingleChildScrollView(
              physics: const NeverScrollableScrollPhysics(),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  FadeAnimation(
                    1.4,
                    const Text(
                      "Log In to Begin",
                      style: TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Column(
                    children: <Widget>[
                      FadeAnimation(
                          1.4,
                          Container(
                            decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10),
                                boxShadow: const [
                                  BoxShadow(
                                      color: Color.fromRGBO(32, 132, 232, .3),
                                      blurRadius: 20,
                                      offset: Offset(0, 10))
                                ]),
                            child: Column(
                              children: <Widget>[
                                Container(
                                  // padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                          color: Colors.grey.shade200),
                                    ),
                                  ),
                                  child: FormHelper.inputFieldWidget(
                                    context,
                                    "email",
                                    "Email",
                                    (onValidateVal) {
                                      if (onValidateVal?.isEmpty &&
                                          _pageState == 1) {
                                        return "Empty Field detected";
                                      }

                                      return null;
                                    },
                                    (onSavedVal) => {
                                      emailLogin = onSavedVal,
                                    },
                                    paddingRight: 0,
                                    paddingLeft: 0,
                                    initialValue: "",
                                    obscureText: false,
                                    prefixIcon: const Icon(Icons.mail),
                                    showPrefixIcon: true,
                                    prefixIconColor:
                                        Colors.black.withOpacity(0.5),
                                    textColor: Colors.black.withOpacity(0.7),
                                    hintColor: Colors.grey.withOpacity(0.7),
                                    borderFocusColor: Colors.white,
                                    borderColor: Colors.white,
                                    borderRadius: 0,
                                    borderErrorColor: Colors.white,
                                    errorBorderWidth: 0,
                                    focusedErrorBorderWidth: 0,
                                    borderFocusedErrorColor: Colors.white,
                                  ),
                                ),
                                //////////////////////////////////////////////////////////////////////////////////////////
                                Container(
                                  // padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                          color: Colors.grey.shade200),
                                    ),
                                  ),
                                  child: FormHelper.inputFieldWidget(
                                    context,
                                    "password",
                                    "Password",
                                    (onValidateVal) {
                                      if (onValidateVal?.isEmpty &&
                                          _pageState == 1) {
                                        return "Empty Field detected";
                                      }

                                      return null;
                                    },
                                    (onSavedVal) => {
                                      passwordLogin = onSavedVal,
                                    },
                                    paddingRight: 0,
                                    paddingLeft: 0,
                                    initialValue: "",
                                    obscureText: hidePassword,
                                    prefixIcon: const Icon(Icons.lock),
                                    showPrefixIcon: true,
                                    prefixIconColor:
                                        Colors.black.withOpacity(0.5),
                                    textColor: Colors.black.withOpacity(0.7),
                                    hintColor: Colors.grey.withOpacity(0.7),
                                    borderFocusColor: Colors.white,
                                    borderColor: Colors.white,
                                    borderRadius: 0,
                                    suffixIcon: IconButton(
                                      onPressed: () {
                                        setState(() {
                                          hidePassword = !hidePassword;
                                        });
                                      },
                                      color: Colors.black.withOpacity(0.5),
                                      icon: Icon(
                                        hidePassword
                                            ? Icons.visibility_off
                                            : Icons.visibility,
                                      ),
                                    ),
                                    borderErrorColor: Colors.white,
                                    errorBorderWidth: 0,
                                    focusedErrorBorderWidth: 0,
                                    borderFocusedErrorColor: Colors.white,
                                  ),
                                ),
                                ///////////////////////////////////////////////////////////
                              ],
                            ),
                          )),
                      const SizedBox(
                        height: 15,
                      ),
                      FadeAnimation(
                        1.5,
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Padding(
                            padding: const EdgeInsets.only(
                              right: 25,
                            ),
                            child: RichText(
                              text: TextSpan(
                                style: const TextStyle(
                                    color: Colors.grey, fontSize: 14.0),
                                children: <TextSpan>[
                                  TextSpan(
                                    text: 'Forget Password?',
                                    style: const TextStyle(
                                      color: Colors.grey,
                                    ),
                                    recognizer: TapGestureRecognizer()
                                      ..onTap = () {},
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      FadeAnimation(
                        1.5,
                        Center(
                          child: FormHelper.submitButton(
                            height: 50,
                            width: 250,
                            "Login",
                            () {
                              if (validateAndSave()) {
                                setState(() {
                                  isAPICallProcess = true;
                                });

                                LoginRequestModel model = LoginRequestModel(
                                  email: emailLogin,
                                  password: passwordLogin,
                                );

                                APIService.login(model).then(
                                  (response) {
                                    setState(() {
                                      isAPICallProcess = false;
                                    });

                                    if (response) {
                                      Navigator.pushNamed(
                                        context,
                                        '/home',
                                      );
                                    } else {
                                      FormHelper.showSimpleAlertDialog(
                                        context,
                                        Config.appName,
                                        "Invalid email/Password !!",
                                        "OK",
                                        () {
                                          Navigator.pushNamedAndRemoveUntil(
                                            context,
                                            '/login',
                                            (route) => false,
                                          );
                                        },
                                      );
                                    }
                                  },
                                );
                              }
                            },
                            btnColor: HexColor("207A35"),
                            borderColor: HexColor("207A35"),
                            txtColor: Colors.white,
                            borderRadius: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      const FadeAnimation(
                          1.7,
                          Text(
                            "Continue with google & OTP",
                            style: TextStyle(color: Colors.grey),
                          )),
                      const SizedBox(
                        height: 20,
                      ),
                      SingleChildScrollView(
                        physics: const NeverScrollableScrollPhysics(),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            FadeAnimation(
                              1.9,
                              Platform.isAndroid
                                  ? MaterialButton(
                                      onPressed: () {},
                                      color: const Color.fromARGB(
                                          255, 234, 67, 53),
                                      textColor: Colors.white,
                                      padding: const EdgeInsets.all(14),
                                      shape: const CircleBorder(),
                                      child: const Icon(
                                        FontAwesomeIcons.google,
                                        size: 19,
                                      ),
                                    )
                                  : MaterialButton(
                                      onPressed: () {},
                                      color: const Color.fromARGB(
                                          255, 255, 255, 255),
                                      textColor: Colors.black.withOpacity(0.7),
                                      padding: const EdgeInsets.all(14),
                                      shape: const CircleBorder(),
                                      child: const Icon(
                                        FontAwesomeIcons.apple,
                                        size: 19,
                                      ),
                                    ),
                            ),
                            FadeAnimation(
                                1.9,
                                MaterialButton(
                                  onPressed: () {},
                                  color: const Color.fromARGB(255, 52, 168, 83),
                                  textColor: Colors.white,
                                  padding: const EdgeInsets.all(14),
                                  shape: const CircleBorder(),
                                  child: const Icon(
                                    FontAwesomeIcons.mobileScreenButton,
                                    size: 19,
                                  ),
                                )),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      GestureDetector(
                        onTap: () {
                          //clear field
                          emailLogin = "";
                          passwordLogin = "";

                          print('sign up working');
                          globalFormKey.currentState!.reset();
                          setState(() {
                            _pageState = 2;
                          });
                        },
                        child: FadeAnimation(
                          1.5,
                          Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  "Don't have an Account? ",
                                  style: TextStyle(color: Colors.grey),
                                ),
                                Text(
                                  "Sign Up",
                                  style: TextStyle(
                                      color: Colors.blue.shade900,
                                      fontWeight: FontWeight.bold),
                                )
                              ]),
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ],
              ),
            ),
          ),
          //Registration///////////////////////////////////////////////////////////////////////////////////////////////////////////
          AnimatedContainer(
            height: _registerHeight,
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 15),
            curve: Curves.fastLinearToSlowEaseIn,
            duration: const Duration(milliseconds: 1000),
            transform: Matrix4.translationValues(0, _registerYOffset, 1),
            decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(60),
                    topRight: Radius.circular(60))),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Expanded(
                  flex: 1,
                  child: SingleChildScrollView(
                    physics: const NeverScrollableScrollPhysics(),
                    child: Column(
                      children: <Widget>[
                        const Text(
                          "Create a New Account",
                          style: TextStyle(fontSize: 20),
                        ),
                        const SizedBox(height: 20),
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: const [
                              BoxShadow(
                                  color: Color.fromRGBO(32, 132, 232, .3),
                                  blurRadius: 20,
                                  offset: Offset(0, 10))
                            ],
                          ),
                          child: Column(
                            children: <Widget>[
                              Container(
                                // padding: const EdgeInsetsDirectional.symmetric(
                                //     horizontal: 5, vertical: 0),
                                decoration: BoxDecoration(
                                    border: Border(
                                        bottom: BorderSide(
                                            color: Colors.grey.shade200))),
                                child: FormHelper.inputFieldWidget(
                                  context,
                                  "name",
                                  "Name",
                                  (onValidateVal) {
                                    if (onValidateVal?.isEmpty &&
                                        _pageState == 2) {
                                      return "Empty Field detected";
                                    }
                                    return null;
                                  },
                                  (onSavedVal) {
                                    nameSignUp = onSavedVal;
                                  },
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  initialValue: "",
                                  obscureText: false,
                                  prefixIcon: const Icon(Icons.person),
                                  showPrefixIcon: true,
                                  prefixIconColor:
                                      Colors.black.withOpacity(0.5),
                                  textColor: Colors.black.withOpacity(0.7),
                                  hintColor: Colors.grey.withOpacity(0.7),
                                  borderFocusColor: Colors.white,
                                  borderColor: Colors.white,
                                  borderRadius: 0,
                                  borderErrorColor: Colors.white,
                                  errorBorderWidth: 0,
                                  focusedErrorBorderWidth: 0,
                                  borderFocusedErrorColor: Colors.white,
                                ),
                              ),
                              /////////////////////////////////////////////////////////////////////////////////
                              Container(
                                // padding: const EdgeInsetsDirectional.symmetric(
                                //     horizontal: 5, vertical: 0),
                                decoration: BoxDecoration(
                                    border: Border(
                                        bottom: BorderSide(
                                            color: Colors.grey.shade200))),
                                child: FormHelper.inputFieldWidget(
                                  context,
                                  "email",
                                  "Email",
                                  (onValidateVal) {
                                    if (onValidateVal?.isEmpty &&
                                        _pageState == 2) {
                                      return "Empty Field detected";
                                    }
                                    return null;
                                  },
                                  (onSavedval) {
                                    emailSignUp = onSavedval;
                                  },
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  initialValue: "",
                                  obscureText: false,
                                  prefixIcon: const Icon(Icons.mail),
                                  prefixIconColor:
                                      Colors.black.withOpacity(0.5),
                                  showPrefixIcon: true,
                                  textColor: Colors.black.withOpacity(0.7),
                                  hintColor: Colors.grey.withOpacity(0.7),
                                  borderFocusColor: Colors.white,
                                  borderColor: Colors.white,
                                  borderRadius: 0,
                                  borderErrorColor: Colors.white,
                                  errorBorderWidth: 0,
                                  focusedErrorBorderWidth: 0,
                                  borderFocusedErrorColor: Colors.white,
                                ),
                              ),
                              //////////////////////////////////////////////////////////////
                              Container(
                                // padding: const EdgeInsetsDirectional.symmetric(
                                //     horizontal: 5, vertical: 0),
                                decoration: BoxDecoration(
                                    border: Border(
                                        bottom: BorderSide(
                                            color: Colors.grey.shade200))),
                                child: FormHelper.inputFieldWidget(
                                  context,
                                  "password",
                                  "Password",
                                  (onValidateVal) {
                                    if (onValidateVal?.isEmpty &&
                                        _pageState == 2) {
                                      return "Empty Field detected";
                                    }
                                    return null;
                                  },
                                  (onSavedVal) => {
                                    passwordSignUp = onSavedVal,
                                  },
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  initialValue: "",
                                  obscureText: hidePassword,
                                  prefixIcon: const Icon(Icons.lock),
                                  showPrefixIcon: true,
                                  prefixIconColor:
                                      Colors.black.withOpacity(0.5),
                                  textColor: Colors.black.withOpacity(0.7),
                                  hintColor: Colors.grey.withOpacity(0.7),
                                  borderFocusColor: Colors.white,
                                  borderColor: Colors.white,
                                  borderRadius: 0,
                                  suffixIcon: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        hidePassword = !hidePassword;
                                      });
                                    },
                                    color: Colors.black.withOpacity(0.5),
                                    icon: Icon(
                                      hidePassword
                                          ? Icons.visibility_off
                                          : Icons.visibility,
                                    ),
                                  ),
                                  borderErrorColor: Colors.white,
                                  errorBorderWidth: 0,
                                  focusedErrorBorderWidth: 0,
                                  borderFocusedErrorColor: Colors.white,
                                ),
                              ),
                              Container(
                                // padding: const EdgeInsetsDirectional.symmetric(
                                //     horizontal: 5, vertical: 0),
                                decoration: BoxDecoration(
                                    border: Border(
                                        bottom: BorderSide(
                                            color: Colors.grey.shade200))),
                                child: FormHelper.inputFieldWidget(
                                  context,
                                  "confirm password",
                                  "Confirm Password",
                                  (onValidateVal) {
                                    if (onValidateVal?.isEmpty &&
                                        _pageState == 2) {
                                      return "Empty Field detected";
                                    }
                                    return null;
                                  },
                                  (onSavedVal) => {
                                    confirmPasswordSignUp = onSavedVal,
                                  },
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  initialValue: "",
                                  obscureText: hidePassword,
                                  prefixIcon: const Icon(Icons.lock),
                                  showPrefixIcon: true,
                                  prefixIconColor:
                                      Colors.black.withOpacity(0.5),
                                  textColor: Colors.black.withOpacity(0.7),
                                  hintColor: Colors.grey.withOpacity(0.7),
                                  borderFocusColor: Colors.white,
                                  borderColor: Colors.white,
                                  borderRadius: 0,
                                  suffixIcon: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        hidePassword = !hidePassword;
                                      });
                                    },
                                    color: Colors.black.withOpacity(0.5),
                                    icon: Icon(
                                      hidePassword
                                          ? Icons.visibility_off
                                          : Icons.visibility,
                                    ),
                                  ),
                                  borderErrorColor: Colors.white,
                                  errorBorderWidth: 0,
                                  focusedErrorBorderWidth: 0,
                                  borderFocusedErrorColor: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Center(
                          child: FormHelper.submitButton(
                            height: 50,
                            width: 250,
                            "Sign Up",
                            () {
                              if (validateAndSave() &&
                                  confirmPasswordSignUp != passwordSignUp) {
                                FormHelper.showSimpleAlertDialog(
                                  context,
                                  Config.appName,
                                  "Please re-confirm your password",
                                  "OK",
                                  () {
                                    Navigator.of(context, rootNavigator: true)
                                        .pop();
                                  },
                                );
                              } else if (validateAndSave()) {
                                setState(() {
                                  isAPICallProcess = true;
                                });

                                RegisterRequestModel model =
                                    RegisterRequestModel(
                                        name: nameSignUp!,
                                        email: emailSignUp!,
                                        password: passwordSignUp!);
                                APIService.register(model).then((response) {
                                  setState(() {
                                    isAPICallProcess = false;
                                  });

                                  if (response.data != null) {
                                    if (validateAndSave()) {
                                      setState(() {
                                        isAPICallProcess = true;
                                      });

                                      LoginRequestModel model =
                                          LoginRequestModel(
                                        email: emailSignUp,
                                        password: passwordSignUp,
                                      );

                                      APIService.login(model).then(
                                        (response) {
                                          setState(() {
                                            isAPICallProcess = false;
                                          });

                                          if (response) {
                                            Navigator.pushNamed(
                                              context,
                                              '/home',
                                            );
                                          } else {
                                            FormHelper.showSimpleAlertDialog(
                                              context,
                                              Config.appName,
                                              "Invalid name/Password !!",
                                              "OK",
                                              () {
                                                                                    Navigator.of(context, rootNavigator: true)
                                        .pop();
                                                Navigator.pop(context);
                                              },
                                            );
                                          }
                                        },
                                      );
                                    }
                                  } else {
                                    FormHelper.showSimpleAlertDialog(
                                      context,
                                      Config.appName,
                                      response.message,
                                      "OK",
                                      () {
                                        Navigator.pop(context);
                                      },
                                    );
                                  }
                                });
                              }
                            },
                            btnColor: HexColor("207A35"),
                            borderColor: HexColor("207A35"),
                            txtColor: Colors.white,
                            borderRadius: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Text(
                          "Signup with Google or OTP",
                          style: TextStyle(color: Colors.grey),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        SingleChildScrollView(
                          physics: const NeverScrollableScrollPhysics(),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Platform.isAndroid
                                  ? MaterialButton(
                                      onPressed: () {},
                                      color: const Color.fromARGB(
                                          255, 234, 67, 53),
                                      textColor: Colors.white,
                                      padding: const EdgeInsets.all(14),
                                      shape: const CircleBorder(),
                                      child: const Icon(
                                        FontAwesomeIcons.google,
                                        size: 19,
                                      ),
                                    )
                                  : MaterialButton(
                                      onPressed: () {},
                                      color: const Color.fromARGB(
                                          255, 255, 255, 255),
                                      textColor: Colors.black.withOpacity(0.7),
                                      padding: const EdgeInsets.all(14),
                                      shape: const CircleBorder(),
                                      child: const Icon(
                                        FontAwesomeIcons.apple,
                                        size: 19,
                                      ),
                                    ),
                              MaterialButton(
                                onPressed: () {},
                                color: const Color.fromARGB(255, 52, 168, 83),
                                textColor: Colors.white,
                                padding: const EdgeInsets.all(14),
                                shape: const CircleBorder(),
                                child: const Icon(
                                  FontAwesomeIcons.mobileScreenButton,
                                  size: 19,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        GestureDetector(
                          onTap: () {
                            nameSignUp = "";
                            emailSignUp = "";
                            passwordSignUp = "";

                            print('Login is working');
                            globalFormKey.currentState!.reset();
                            setState(() {
                              _pageState = 1;
                            });
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text(
                                "Already Have an Account? ",
                                style: TextStyle(color: Colors.grey),
                              ),
                              Text(
                                "Login",
                                style: TextStyle(
                                    color: Colors.blue.shade900,
                                    fontWeight: FontWeight.bold),
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  bool validateAndSave() {
    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();
      return true;
    }
    return false;
  }
}
