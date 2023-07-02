import 'package:bridgify/accessories/user_avatar.dart';
import 'package:bridgify/pages/home_page.dart';
import 'package:bridgify/pages/profile/update_profile_page.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool isAPICallProcess = false;
  bool hidePassword = true;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  String? name;
  String? email;
  String? password;
  String? confirmPassword;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 1,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        leading: IconButton(
          onPressed: () {
            Navigator.of(context).push(MaterialPageRoute(
                builder: (BuildContext context) => HomePage()));
          },
          icon: const Icon(
            Icons.arrow_back_ios,
            color: Color(0xFF27c1a9),
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              //change with alternative route builder
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => SettingsPage()));
            },
            icon: const Icon(
              Icons.settings,
              color: Color(0xFF27c1a9),
            ),
          ),
        ],
      ),
      body: Container(
        padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              const Text(
                "Edit profile",
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
              ),
              Center(
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
                                color: Colors.black.withOpacity(0.1),
                                offset: const Offset(0, 10))
                          ],
                          shape: BoxShape.circle),
                      child:
                          const UserAvatar(filename: "img1.jpeg", radius: 65),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                            color: Color(0xFF27c1a9),
                            shape: BoxShape.circle,
                            border: Border.all(
                                width: 4,
                                color:
                                    Theme.of(context).scaffoldBackgroundColor),
                          ),
                          child: const Icon(Icons.edit, color: Colors.white)),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 35,
              ),
              FutureBuilder(
                  future: APIService.getUserProfile(),
                  builder: (
                    BuildContext context,
                    AsyncSnapshot<Object> model,
                  ) {
                    if (model.hasData) {
                      var userProfileData = model.data as Map<String, dynamic>;

                      var userName = userProfileData["name"];
                      var userEmail = userProfileData["email"];
                      return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Container(
                              decoration: BoxDecoration(
                                border: Border(
                                  bottom:
                                      BorderSide(color: Colors.grey.shade200),
                                ),
                              ),
                              child: FormHelper.inputFieldWidget(
                                context,
                                "name",
                                "Name",
                                (onValidateVal) {},
                                (onSavedVal) => {
                                  name = onSavedVal,
                                },
                                paddingRight: 0,
                                paddingLeft: 0,
                                initialValue: userName,
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
                                  bottom:
                                      BorderSide(color: Colors.grey.shade200),
                                ),
                              ),
                              child: FormHelper.inputFieldWidget(
                                context,
                                "email",
                                "Email",
                                (onValidateVal) {},
                                (onSavedVal) => {
                                  email = onSavedVal,
                                },
                                paddingRight: 0,
                                paddingLeft: 0,
                                initialValue: userEmail,
                                obscureText: false,
                                prefixIcon: const Icon(Icons.mail),
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
                                      bottom: BorderSide(
                                          color: Colors.grey.shade200))),
                              child: FormHelper.inputFieldWidget(
                                context,
                                "password",
                                "Password",
                                (onValidateVal) {},
                                (onSavedVal) => {
                                  password = onSavedVal,
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
                              decoration: BoxDecoration(
                                  border: Border(
                                      bottom: BorderSide(
                                          color: Colors.grey.shade200))),
                              child: FormHelper.inputFieldWidget(
                                context,
                                "confirm password",
                                "Confirm Password",
                                (onValidateVal) {},
                                (onSavedVal) => {
                                  confirmPassword = onSavedVal,
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
                            // buildTextField("Name", userName, false),
                            // buildTextField("Email", userEmail, false),
                            // buildTextField("Password", "*********", false)
                          ]);
                    }
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }),
              // buildTextField("Name", "John Doe", false),
              // buildTextField("Email", "JohnDoe@email.com", false),
              // buildTextField("Password", "*********", true),
              // buildTextField("Name", "John Doe"),
              const SizedBox(height: 35),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlinedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all(
                          const EdgeInsets.symmetric(horizontal: 50)),
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20)),
                      ),
                    ),
                    child: const Text(
                      "CANCEL",
                      style: TextStyle(
                          fontSize: 14,
                          letterSpacing: 2.2,
                          color: Colors.black),
                    ),
                  ),
                  OutlinedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all(Color(0xFF27c1a9)),
                      padding: MaterialStateProperty.all(
                          const EdgeInsets.symmetric(horizontal: 50)),
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20)),
                      ),
                    ),
                    child: const Text(
                      "SAVE",
                      style: TextStyle(
                          fontSize: 14,
                          letterSpacing: 2.2,
                          color: Colors.white),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(
      String labelText, String placeHolder, bool isPasswordTextField) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 35),
      child: TextField(
        obscureText: isPasswordTextField,
        decoration: InputDecoration(
            suffixIcon: isPasswordTextField
                ? IconButton(
                    onPressed: () {
                      setState(() {
                        hidePassword = !hidePassword;
                      });
                    },
                    color: Colors.black.withOpacity(0.5),
                    icon: Icon(
                      hidePassword ? Icons.visibility_off : Icons.visibility,
                    ),
                  )
                : null,
            contentPadding: const EdgeInsets.only(bottom: 3),
            labelText: labelText,
            floatingLabelBehavior: FloatingLabelBehavior.always,
            hintText: placeHolder /*actual name*/,
            hintStyle: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black)),
      ),
    );
  }
}
