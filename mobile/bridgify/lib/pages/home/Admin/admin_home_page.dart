import 'dart:io';

import 'package:bridgify/accessories/dialog/invalid_credentials_view.dart';
import 'package:bridgify/accessories/dialog/post_preview.dart';
import 'package:bridgify/accessories/drawer/drawer_item.dart';
import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:zego_zimkit/services/services.dart';

class AdminHomePage extends StatefulWidget {
  const AdminHomePage({Key? key}) : super(key: key);

  @override
  _AdminHomePageState createState() => _AdminHomePageState();
}

class _AdminHomePageState extends State<AdminHomePage> {
  bool isAPICallProcess = false;
  final GlobalKey<ScaffoldState> _globalKey = GlobalKey();
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  PostResponseModel? postResponseModel;
  String? postAuthorEmail;
  String? postDescription;
  String? postActivityType;
  List<String>? postImages = [];

  //Chosen Image
  bool imageOverflow = false;
  final ImagePicker _picker = ImagePicker();
  int imageCount = 0;
  List<XFile> _imageList = [];

  @override
  void initState() {
    super.initState();
    postResponseModel = PostResponseModel();
    Future.delayed(Duration.zero, () {
      APIService.getUserProfile().then((response) {
        Map userProfile = response as Map<String, dynamic>;
        postAuthorEmail = userProfile["email"];
      });
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _globalKey,
      backgroundColor: Colors.white /*const Color(0xFF171717)*/,
      body: ProgressHUD(
          key: UniqueKey(),
          inAsyncCall: isAPICallProcess,
          child: Form(key: globalFormKey, child: loadAdminHomePage(context))),
      drawer: loadDrawer(),
    );
  }

  Widget loadAdminHomePage(BuildContext context) {
    return Stack(
      children: [
        Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 40, left: 10, right: 5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                      onPressed: () {
                        setState(() {});
                        _globalKey.currentState!.openDrawer();
                      },
                      icon: Icon(
                        Icons.menu,
                        color: Colors.grey.shade800,
                      )),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.notifications_none_rounded,
                          color: Colors.grey.shade800,
                        ),
                      ),
                      FutureBuilder(
                        future: APIService.getUserProfile(),
                        builder: (BuildContext context,
                            AsyncSnapshot<Object> model) {
                          var userProfileData =
                              model.data as Map<String, dynamic>?;
                          if (model.hasData) {
                            var imagePath = userProfileData?["imagePath"];
                            var name = userProfileData?["name"];
                            var email = userProfileData?["email"];
                            return imagePath != "" && imagePath != null
                                ? GestureDetector(
                                    onTap: () {
                                      Navigator.pushNamed(
                                        context,
                                        '/profile',
                                        arguments: {
                                          'imagePath': imagePath,
                                          'name': name,
                                          'email': email
                                        },
                                      );
                                    },
                                    child: CircleAvatar(
                                        radius: 22,
                                        backgroundImage: Image.network(
                                                'http://${Config.apiURL}/images/user_profile/' +
                                                    imagePath)
                                            .image),
                                  )
                                : GestureDetector(
                                    onTap: () {
                                      Navigator.pushNamed(
                                        context,
                                        '/profile',
                                        arguments: {
                                          'imagePath': imagePath,
                                          'name': name,
                                          'email': email
                                        },
                                      );
                                    },
                                    child: const UserAvatar(
                                        filename: 'img1.jpeg', radius: 22));
                          }
                          return const Center(
                            child: CircularProgressIndicator(),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        Positioned(
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomCenter,
                colors: [
                  Color.fromRGBO(48, 132, 67, 0.722),
                  Color.fromRGBO(48, 132, 67, 0.6),
                ],
              ),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              ),
              color: HexColor('#EDFDF9'),
            ),
            //Post
            child: ListView(padding: const EdgeInsets.all(12.0), children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  SizedBox(
                    height: 350,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 12.0),
                      child: Stack(
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              border: _imageList.isNotEmpty
                                  ? Border.all(
                                      color: Colors.grey.shade700,
                                      width: 2.0,
                                    )
                                  : Border.all(
                                      color: Colors.grey
                                          .shade200, // Set the dynamic border color here
                                      width: 2.0, // Set the border width
                                    ),
                            ),
                            child: GridView.builder(
                              padding: const EdgeInsets.all(5.0),
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 3),
                              itemCount: _imageList.length,
                              itemBuilder: (BuildContext context, int index) {
                                return Padding(
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 5.0,
                                    horizontal: 5.0,
                                  ),
                                  child: Stack(fit: StackFit.expand, children: [
                                    Image.file(
                                      File(_imageList[index].path),
                                      fit: BoxFit.cover,
                                    ),
                                    Positioned(
                                      right: -8,
                                      top: -8,
                                      child: IconButton(
                                          padding: const EdgeInsets.all(2.0),
                                          onPressed: () {
                                            _imageList.removeAt(index);
                                            imageCount = _imageList.length;
                                            print(imageCount);
                                            setState(() {});
                                          },
                                          icon: const Icon(
                                            Icons.delete,
                                            size: 20,
                                          ),
                                          color: Colors.red[500]),
                                    ),
                                  ]),
                                );
                              },
                            ),
                          ),
                          Positioned(
                            right: 16,
                            bottom: 16,
                            child: ElevatedButton(
                              style: OutlinedButton.styleFrom(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              clipBehavior: Clip.antiAlias,
                              onPressed: () {
                                imageSelect();
                                if (imageOverflow) {
                                  showDialog(
                                    context: context,
                                    builder: (context) {
                                      imageOverflow = false;
                                      return Dialog(
                                        backgroundColor: Colors.white,
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(24),
                                        ),
                                        child: const InvalidCredentialsView(
                                          primaryText:
                                              'Too many images uploaded',
                                          secondaryText:
                                              'Each post can only have a maximum of 10 images',
                                        ),
                                      );
                                    },
                                  );
                                }
                              },
                              child: Text(
                                "Upload Image",
                                style: TextStyle(
                                    color: Colors.black.withOpacity(0.7)),
                              ),
                            ),
                          )
                        ],
                      ),
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
                      "activity type",
                      "Activity Type",
                      (onValidateVal) {
                        if (onValidateVal.isEmpty) {
                          return 'Please input a valid post activity type.';
                        }

                        return null;
                      },
                      (onSavedVal) {
                        postActivityType = onSavedVal;
                      },
                      paddingRight: 0,
                      paddingLeft: 0,
                      initialValue: "",
                      prefixIcon: const Icon(Icons.run_circle_outlined),
                      showPrefixIcon: true,
                      prefixIconColor: Colors.black.withOpacity(0.5),
                      hintColor: Colors.black.withOpacity(0.5),
                      textColor: Colors.black.withOpacity(0.5),
                      borderFocusColor: Colors.white,
                      borderColor: Colors.grey.shade200,
                      borderWidth: 5,
                      borderRadius: 5,
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
                      "description",
                      "Description",
                      (onValidateVal) {
                        if (onValidateVal.isEmpty) {
                          return 'Please input a valid post description.';
                        }

                        return null;
                      },
                      (onSavedVal) {
                        postDescription = onSavedVal;
                      },
                      isMultiline: true,
                      multilineRows: 7,
                      maxLength: 280,
                      paddingTop: 5,
                      paddingRight: 0,
                      paddingLeft: 0,
                      initialValue: "",
                      obscureText: false,
                      prefixIcon: const Icon(Icons.description_rounded),
                      showPrefixIcon: true,
                      prefixIconPaddingBottom: 110,
                      prefixIconColor: Colors.black.withOpacity(0.5),
                      hintColor: Colors.black.withOpacity(0.5),
                      textColor: Colors.black.withOpacity(0.5),
                      borderFocusColor: Colors.grey.shade700,
                      borderColor: Colors.grey.shade200,
                      borderWidth: 5,
                      borderRadius: 5,
                      borderErrorColor: Colors.white,
                      errorBorderWidth: 0,
                      focusedErrorBorderWidth: 0,
                      borderFocusedErrorColor: Colors.white,
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 35,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  FormHelper.submitButton(
                    height: 50,
                    width: 150,
                    "CLEAR",
                    () {
                      setState(() {
                        postDescription = "";
                        postActivityType = "";
                        _imageList = [];
                      });
                    },
                    btnColor: HexColor("FFFFFF"),
                    borderColor: HexColor("FFFFFF"),
                    txtColor: Colors.black.withOpacity(0.7),
                    borderRadius: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  FormHelper.submitButton(
                    height: 50,
                    width: 150,
                    "PREVIEW",
                    () {
                      if (validateAndSave()) {
                        postImages!.clear();
                        for (XFile image in _imageList) {
                          String? imagePath = image.path;
                          print(imagePath);
                          postImages!.add(imagePath);
                        }
                        if (imageCount == 0) {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return Dialog(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(24),
                                ),
                                child: const InvalidCredentialsView(
                                  primaryText: 'Posts require images!',
                                  secondaryText:
                                      'Please ensure that there images uploaded',
                                ),
                              );
                            },
                          );
                        } else {
                          postResponseModel!.id = '0';
                          postResponseModel!.authorEmail = postAuthorEmail;
                          postResponseModel!.dateTime =
                              DateTime.now().toString();
                          postResponseModel!.description = postDescription;
                          postResponseModel!.activityType = postActivityType;
                          postResponseModel!.elderlyInvolved = [];
                          postResponseModel!.postImages = postImages;
                          postResponseModel!.imagesCount = imageCount;

                          showDialog(
                            context: context,
                            builder: (context) {
                              return Dialog(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(24),
                                ),
                                child: PostPreview(model: postResponseModel),
                              );
                            },
                          );
                        }
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
            ]),

            //create_posts
          ),
        ),
      ],
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

  void imageSelect() async {
    List<XFile>? selectedImages = await _picker.pickMultiImage();
    if (selectedImages.isNotEmpty) {
      if (selectedImages.length + imageCount > 10) {
        for (var i = 0; i < 10 - imageCount; i++) {
          _imageList.add(selectedImages[i]);
        }
        imageOverflow = true;
      } else {
        _imageList.addAll(selectedImages);
      }
      imageCount = _imageList.length;
    }
    setState(() {
      selectedImages = [];
    });
    // print(selectedImage!.path.toString());
  }

  Widget loadDrawer() {
    return Drawer(
      width: 275,
      elevation: 30,
      // backgroundColor: const Color(0xF3393838),
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.horizontal(right: Radius.circular(40))),
      child: Container(
        decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              colors: [
                Color.fromRGBO(81, 145, 70, 0.427),
                Color.fromRGBO(33, 51, 30, 0.51),
              ],
            ),
            borderRadius: BorderRadius.horizontal(right: Radius.circular(40)),
            boxShadow: [
              BoxShadow(
                  color: Color(0xF3393838), spreadRadius: 30, blurRadius: 20)
            ]),
        child: Padding(
          padding:
              const EdgeInsets.only(top: 40, left: 10, right: 20, bottom: 30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                children: [
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {
                          _globalKey.currentState!.closeDrawer();
                        },
                        icon: const Icon(
                          Icons.arrow_back_ios,
                          color: Colors.white,
                        ),
                        iconSize: 20,
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/profile',
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        FutureBuilder(
                          future: APIService.getUserProfile(),
                          builder: (
                            BuildContext context,
                            AsyncSnapshot<Object> model,
                          ) {
                            if (model.hasData) {
                              var userProfileData =
                                  model.data as Map<String, dynamic>?;
                              var imagePath = userProfileData?["imagePath"];
                              return imagePath != "" && imagePath != null
                                  ? CircleAvatar(
                                      radius: 32,
                                      backgroundImage: Image.network(
                                              'http://${Config.apiURL}/images/user_profile/' +
                                                  imagePath)
                                          .image)
                                  : const UserAvatar(
                                      filename: 'img1.jpeg', radius: 32);
                            }
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          },
                        ),
                        const SizedBox(
                          width: 12,
                        ),
                        FutureBuilder(
                          future: APIService.getUserProfile(),
                          builder: (
                            BuildContext context,
                            AsyncSnapshot<Object> model,
                          ) {
                            if (model.hasData) {
                              var userProfileData =
                                  model.data as Map<String, dynamic>;

                              var userName = userProfileData["name"];
                              var userEmail = userProfileData["email"];
                              return Flexible(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      userName,
                                      style:
                                          const TextStyle(color: Colors.white),
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                    ),
                                    Text(
                                      userEmail,
                                      // softWrap: true,
                                      style: const TextStyle(
                                        color: Colors.white,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                    ),
                                  ],
                                ),
                              );
                            }
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          },
                        ),
                        const SizedBox(
                          width: 20,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const Divider(
                    thickness: 2.5,
                    height: 20,
                    color: Colors.white,
                  ),
                  DrawerItem(
                      title: 'Home',
                      icon: Icons.home,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/adminHome");
                      }),
                  DrawerItem(
                      title: 'Chats',
                      icon: Icons.chat_bubble,
                      onTapPath: () async {
                        await ZIMKit().connectUser(
                          id: 'admin_account',
                          name: 'Administrator',
                        );

                        if (!mounted) return;
                        Navigator.pushNamed(context, "/adminChatList");
                      }),
                  DrawerItem(
                      title: 'Elderly Services',
                      icon: Icons.elderly,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/adminElderlyRecords");
                      }),
                  DrawerItem(
                      title: 'Settings',
                      icon: Icons.settings,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/settings");
                      }),
                  const Divider(
                    thickness: 2.5,
                    height: 20,
                    color: Colors.white,
                  ),
                  DrawerItem(
                      title: 'Help',
                      icon: Icons.help,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/adminHome");
                      }),
                  DrawerItem(
                      title: 'About App',
                      icon: Icons.phone_android_rounded,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/adminHome");
                      }),
                ],
              ),
              const DrawerItem(title: 'Log out', icon: Icons.logout)
            ],
          ),
        ),
      ),
    );
  }
}
