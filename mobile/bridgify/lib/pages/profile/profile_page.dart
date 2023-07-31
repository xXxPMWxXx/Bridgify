import 'dart:io';

import 'package:bridgify/accessories/dialog/invalid_credentials_view.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/user_update_request_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool isAPICallProcess = false;
  bool hidePassword = true;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  Object? model;
  UpdateUserRequestModel? updateUserRequestModel;
  bool isImageSelected = false;
  String? nameUpdate;
  String? emailUpdate;
  String? imagePathUpdate;
  String? passwordUpdate;
  String? confirmPasswordUpdate;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title:
              const Text('Edit Profile', style: TextStyle(color: Colors.black)),
          iconTheme: IconThemeData(color: HexColor('#207A35')),
          elevation: 1,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          leading: FutureBuilder(
              future: APIService.getUserProfile(),
              builder: (BuildContext context, AsyncSnapshot<Object> model) {
                var userProfileData = model.data as Map<String, dynamic>?;
                if (model.hasData) {
                  if (userProfileData?["accRole"] == "Admin") {
                    return IconButton(
                      onPressed: () async {
                        Navigator.pushNamedAndRemoveUntil(
                          context,
                          '/adminHome',
                          (Route<dynamic> route) {
                            return route.settings.name == '/adminHome';
                          },
                        );
                      },
                      icon: const Icon(
                        Icons.arrow_back_ios,
                        // color: Color(0xFF27c1a9),
                      ),
                    );
                  }
                }
                //public user
                return IconButton(
                  onPressed: () async {
                    Navigator.pushNamedAndRemoveUntil(
                      context,
                      '/home',
                      (Route<dynamic> route) {
                        return route.settings.name == '/home';
                      },
                    );
                  },
                  icon: Icon(
                    Icons.arrow_back_ios,
                    color: HexColor('#207A35'),
                  ),
                );
              }),
          actions: [
            IconButton(
              onPressed: () {
                //change with alternative route builder
                Navigator.pushNamed(
                  context,
                  '/settings',
                );
                // Navigator.of(context).push(
                //   MaterialPageRoute(
                //     builder: (BuildContext context) => SettingsPage(),
                //   ),
                // );
              },
              icon: Icon(
                Icons.settings,
                color: HexColor('#207A35'),
              ),
            ),
          ],
        ),
        body: ProgressHUD(
          inAsyncCall: isAPICallProcess,
          opacity: 0.3,
          key: UniqueKey(),
          child: Form(
            key: globalFormKey,
            child: _profileUI(context),
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    updateUserRequestModel = UpdateUserRequestModel();

    Future.delayed(Duration.zero, () {
      if (ModalRoute.of(context)?.settings.arguments != null) {
        final Map arguments = ModalRoute.of(context)?.settings.arguments as Map;
        nameUpdate = arguments['name'];
        imagePathUpdate = arguments['imagePath'];
        emailUpdate = arguments["email"];
        setState(() {});
      }
    });
  }

  Container _profileUI(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: ListView(
          children: [
            // const Text(
            //   "Edit profile",
            //   style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
            // ),
            picPicker(
              context,
              imagePathUpdate ?? "",
              isImageSelected,
              (file) => {
                setState(
                  () {
                    //model.productPic = file.path;
                    imagePathUpdate = file.path;
                    updateUserRequestModel!.profileImage = imagePathUpdate;
                    isImageSelected = true;
                  },
                )
              },
            ),
            const SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "email",
                    "Email",
                    (onValidateVal) {},
                    (onSavedVal) {
                      updateUserRequestModel!.email = onSavedVal;
                    },
                    isReadonly: true,
                    paddingRight: 0,
                    paddingLeft: 0,
                    // initialValue: updateUserRequestModel!.email == null ? "" : updateUserRequestModel!.email.toString(),
                    initialValue: emailUpdate ?? "",
                    obscureText: false,
                    prefixIcon: const Icon(Icons.mail),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
                    textColor: Colors.grey,
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
                Container(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "name",
                    "Name",
                    (onValidateVal) {
                      if (onValidateVal.isEmpty) {
                        return 'Please input a valid name.';
                      }

                      return null;
                    },
                    (onSavedVal) {
                      updateUserRequestModel!.name = onSavedVal;
                    },
                    paddingRight: 0,
                    paddingLeft: 0,
                    initialValue: nameUpdate ?? "",
                    obscureText: false,
                    prefixIcon: const Icon(Icons.person),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
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
                Container(
                  decoration: BoxDecoration(
                      border: Border(
                          bottom: BorderSide(color: Colors.grey.shade200))),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "password",
                    "Password",
                    (onValidateVal) {},
                    (onSavedVal) {
                      passwordUpdate = onSavedVal;
                    },
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                    initialValue: "",
                    obscureText: hidePassword,
                    prefixIcon: const Icon(Icons.lock),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
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
                        hidePassword ? Icons.visibility_off : Icons.visibility,
                      ),
                    ),
                    borderErrorColor: Colors.white,
                    errorBorderWidth: 0,
                    focusedErrorBorderWidth: 0,
                    borderFocusedErrorColor: Colors.white,
                  ),
                ),
                Container(
                  decoration: BoxDecoration(
                      border: Border(
                          bottom: BorderSide(color: Colors.grey.shade200))),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "confirm password",
                    "Confirm Password",
                    (onValidateVal) {},
                    (onSavedVal) {
                      confirmPasswordUpdate = onSavedVal;
                    },
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                    initialValue: "",
                    obscureText: hidePassword,
                    prefixIcon: const Icon(Icons.lock),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
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
                        hidePassword ? Icons.visibility_off : Icons.visibility,
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
            const SizedBox(height: 35),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                FormHelper.submitButton(
                  height: 50,
                  width: 150,
                  "CLEAR",
                  () {
                    globalFormKey.currentState!.reset();
                    setState(() {
                      passwordUpdate = "";
                      confirmPasswordUpdate = "";
                    });
                  },
                  btnColor: HexColor("FFFFFF"),
                  borderColor: HexColor("FFFFFF"),
                  txtColor: Colors.black,
                  borderRadius: 20,
                  fontWeight: FontWeight.bold,
                ),
                FormHelper.submitButton(
                  height: 50,
                  width: 150,
                  "SAVE",
                  () {
                    // passwordUpdate = passwordUpdate ?? "";
                    // confirmPasswordUpdate = confirmPasswordUpdate ?? "";
                    if (validateAndSave() &&
                        passwordUpdate != confirmPasswordUpdate) {
                      showDialog(
                        context: context,
                        builder: (context) {
                          return Dialog(
                            backgroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const InvalidCredentialsView(
                              primaryText: 'Passwords input need to match',
                              secondaryText: 'Please re-confirm your password',
                            ),
                          );
                        },
                      );
                    } else if (validateAndSave()) {
                      setState(() {
                        isAPICallProcess = true;
                      });
                      if (passwordUpdate != null) {
                        updateUserRequestModel!.password = passwordUpdate;
                      }
                      APIService.update(
                              updateUserRequestModel!, isImageSelected)
                          .then(
                        (response) {
                          setState(() {
                            isAPICallProcess = false;
                          });

                          if (response) {
                            setState(() {
                              passwordUpdate = "";
                              confirmPasswordUpdate = "";
                            });
                          } else {
                            showDialog(
                              context: context,
                              builder: (context) {
                                return Dialog(
                                  backgroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(24),
                                  ),
                                  child: const InvalidCredentialsView(
                                    primaryText: 'Invalid field change !!',
                                  ),
                                );
                              },
                            );
                          }
                        },
                      );
                    }
                  },
                  btnColor: HexColor("#207A35"),
                  borderColor: HexColor("#207A35"),
                  txtColor: Colors.white,
                  borderRadius: 20,
                  fontWeight: FontWeight.bold,
                ),
              ],
            )
          ],
        ),
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

  static Widget picPicker(BuildContext context, String fileName,
      bool isImageSelected, Function onFilePicked) {
    Future<XFile?> imageFile;
    ImagePicker picker = ImagePicker();

    return GestureDetector(
      onTap: () {
        try {
          imageFile = picker.pickImage(source: ImageSource.gallery);
          imageFile.then((file) async {
            onFilePicked(file);
            // Navigator.of(context).pop();
          }).catchError((e) {
            Navigator.of(context).pop();
          });
        } catch (e) {
          Navigator.of(context).pop();
        }
      },
      child: Center(
        child: Stack(
          children: [
            Container(
                width: 130,
                height: 130,
                decoration: BoxDecoration(
                    border: Border.all(
                      width: 4,
                      color: Theme.of(context).scaffoldBackgroundColor,
                    ),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.15),
                          offset: const Offset(0, 10))
                    ],
                    shape: BoxShape.circle),
                child: fileName.isNotEmpty
                    ? isImageSelected
                        ? CircleAvatar(
                            radius: 32,
                            backgroundImage: Image.file(File(fileName)).image)
                        : CircleAvatar(
                            radius: 32,
                            backgroundImage: Image.network(
                                    'http://${Config.apiURL}/images/user_profile/$fileName')
                                .image)
                    : CircleAvatar(
                        radius: 32,
                        backgroundImage: Image.network(
                                'http://${Config.apiURL}/images/user_profile/default.png')
                            .image)),
            Positioned(
              bottom: 0,
              right: 0,
              child: Container(
                height: 40,
                width: 40,
                decoration: BoxDecoration(
                  color: HexColor('#207A35'),
                  shape: BoxShape.circle,
                  border: Border.all(
                      color: Theme.of(context).scaffoldBackgroundColor),
                ),
                child: const Icon(Icons.edit, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
