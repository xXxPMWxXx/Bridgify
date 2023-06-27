import 'package:bridgify/config.dart';
import 'package:bridgify/models/login_request_model.dart';
import 'package:bridgify/models/register_request_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  bool isAPIcallProcess = false;
  bool hidePassword = true;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  String? name;
  String? password;
  String? email;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          backgroundColor: HexColor("#283B71"),
          body: ProgressHUD(
            inAsyncCall: isAPIcallProcess,
            opacity: 0.3,
            key: UniqueKey(),
            child: Form(
              key: globalFormKey,
              child: _loginUI(context),
            ),
          )),
    );
  }

  Widget _loginUI(BuildContext context) {
    return SingleChildScrollView(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height / 3,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Colors.white, Colors.white],
            ),
            borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(100),
              bottomRight: Radius.circular(100),
            ),
          ),
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Align(
              alignment: Alignment.center,
              child: Image.asset(
                "assets/images/ShoppingAppLogo.png",
                width: 250,
                fit: BoxFit.contain,
              ),
            )
          ]),
        ),
        const Padding(
          padding: EdgeInsets.only(
            left: 20.0,
            bottom: 30.0,
            top: 50.0,
          ),
          child: Text(
            "Register",
            style: TextStyle(
                fontWeight: FontWeight.bold, fontSize: 25, color: Colors.white),
          ),
        ),
        FormHelper.inputFieldWidget(
            context,
            //const Icon(Icons.person),
            "name",
            "Name", (onValidateVal) {
          if (onValidateVal?.isEmpty ?? true) {
            return "Empty Field detected";
          }
          return null;
        }, (onSavedval) {
          name = onSavedval;
        },
            borderFocusColor: Colors.white,
            prefixIcon: const Icon(Icons.person),
            prefixIconColor: Colors.white,
            showPrefixIcon: true,
            borderColor: Colors.white,
            textColor: Colors.white,
            hintColor: Colors.white.withOpacity(0.7),
            borderRadius: 10),
        Padding(
          padding: const EdgeInsets.only(top: 10.0),
          child: FormHelper.inputFieldWidget(
              context,
              //const Icon(Icons.person),
              "password",
              "Password", (onValidateVal) {
            if (onValidateVal?.isEmpty ?? true) {
              return "Empty Field detected";
            }
            return null;
          }, (onSavedval) {
            password = onSavedval;
          },
              borderFocusColor: Colors.white,
              prefixIcon: const Icon(Icons.lock),
              prefixIconColor: Colors.white,
              showPrefixIcon: true,
              borderColor: Colors.white,
              textColor: Colors.white,
              hintColor: Colors.white.withOpacity(0.7),
              borderRadius: 10,
              obscureText: hidePassword,
              suffixIcon: IconButton(
                  onPressed: () {
                    setState(() {
                      hidePassword = !hidePassword;
                    });
                  },
                  color: Colors.white.withOpacity(0.7),
                  icon: Icon(
                      hidePassword ? Icons.visibility_off : Icons.visibility))),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 10.0),
          child: FormHelper.inputFieldWidget(
              context,
              //const Icon(Icons.person),
              "email",
              "Email", (onValidateVal) {
            if (onValidateVal?.isEmpty ?? true) {
              return "Empty Field detected";
            }
            return null;
          }, (onSavedval) {
            email = onSavedval;
          },
              borderFocusColor: Colors.white,
              prefixIcon: const Icon(Icons.mail),
              prefixIconColor: Colors.white,
              showPrefixIcon: true,
              borderColor: Colors.white,
              textColor: Colors.white,
              hintColor: Colors.white.withOpacity(0.7),
              borderRadius: 10),
        ),
        const SizedBox(
          height: 20,
        ),
        Center(
          child: FormHelper.submitButton(
            "Sign Up",
            () {
              if (validateAndSave()) {
                setState(() {
                  isAPIcallProcess = true;
                });

                RegisterRequestModel model = RegisterRequestModel(
                    name: name!, password: password!, email: email!);
                APIService.register(model).then((response) {
                  setState(() {
                    isAPIcallProcess = false;
                  });

                  if (response.data != null) {
                    if (validateAndSave()) {
                      setState(() {
                        isAPIcallProcess = true;
                      });

                      LoginRequestModel model = LoginRequestModel(
                        email: email,
                        password: password,
                      );

                      APIService.login(model).then(
                        (response) {
                          setState(() {
                            isAPIcallProcess = false;
                          });

                          if (response) {
                            Navigator.pushNamedAndRemoveUntil(
                              context,
                              '/home',
                              (route) => false,
                            );
                          } else {
                            FormHelper.showSimpleAlertDialog(
                              context,
                              Config.appName,
                              "Invalid name/Password !!",
                              "OK",
                              () {
                                Navigator.of(context).pop();
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
            btnColor: HexColor("283B71"),
            borderColor: Colors.white,
            txtColor: Colors.white,
            borderRadius: 10,
          ),
        ),
        SizedBox(height: 20),
        Center(
          child: Text(
            "OR",
            style: TextStyle(
                fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white),
          ),
        ),
        SizedBox(height: 20),
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.only(right: 25, top: 10),
            child: RichText(
              text: TextSpan(
                style: TextStyle(color: Colors.grey, fontSize: 14.0),
                children: <TextSpan>[
                  TextSpan(text: 'Already have an account? '),
                  TextSpan(
                    text: 'Log In',
                    style: const TextStyle(
                      color: Colors.white,
                      decoration: TextDecoration.underline,
                    ),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        Navigator.pushNamed(context, "/login");
                      },
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ));
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
