import 'package:bridgify/accessories/drawer/drawer_item.dart';
import 'package:bridgify/accessories/elderly/build_elderly_view.dart';
import 'package:bridgify/accessories/post/build_post.dart';
import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:zego_zimkit/services/services.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _globalKey = GlobalKey();
  bool isApiCallProcess = false;

  @override
  void initState() {
    super.initState();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _globalKey,
      backgroundColor: HexColor('#EDFDF9') /*const Color(0xFF171717)*/,
      body: loadHomePage(),
      drawer: loadDrawer(),
    );
  }

  Widget loadHomePage() {
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
                      FutureBuilder(
                        future: APIService.getUserProfile(),
                        builder: (BuildContext context,
                            AsyncSnapshot<Object> model) {
                          var userProfileData =
                              model.data as Map<String, dynamic>?;

                          if (model.hasData) {
                            List<dynamic> elderlyList =
                                userProfileData?["elderly"];
                            String elderlyString = "";
                            for (var el in elderlyList) {
                              elderlyString += "$el,";
                            }
                            return IconButton(
                              onPressed: () {
                                Navigator.pushNamed(
                                  context,
                                  '/notification',
                                  arguments: {
                                    'elderly': elderlyString != ""
                                        ? elderlyString.substring(
                                            0, elderlyString.length - 1)
                                        : elderlyString,
                                    'elderlyCount': elderlyList.length,
                                  },
                                );
                              },
                              icon: Icon(
                                Icons.notifications_none_rounded,
                                color: Colors.grey.shade800,
                              ),
                            );
                          }
                          return const Center(
                            child: CircularProgressIndicator(),
                          );
                        },
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
                                            .image))
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
          child: Container(
            padding: const EdgeInsets.only(top: 15, left: 25, right: 25),
            height: 210,
            decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  colors: [
                    Color.fromRGBO(48, 132, 67, 0.722),
                    Color.fromRGBO(48, 132, 67, 0.6),
                  ],
                ),
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40))),
            child: Column(
              children: [
                const SizedBox(height: 10),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Elderly Profiles",
                      style: TextStyle(color: Colors.white, fontSize: 16),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                SizedBox(
                  height: 90,
                  child: FutureBuilder(
                    future: APIService.getElderlyByUser(),
                    builder: (
                      BuildContext context,
                      AsyncSnapshot<List<ElderlyResponseModel>?> model,
                    ) {
                      if (model.hasData) {
                        return BuildElderlyView(models: model.data);
                      }
                      return const Center(
                        child: Text(
                          "No Elderly has been assigned to you yet",
                          style: TextStyle(color: Colors.white, fontSize: 16),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            // padding: const EdgeInsets.symmetric(vertical: 15),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30), topRight: Radius.circular(30)),
              color: HexColor('#EDFDF9'),
            ),
            //load posts
            child: const BuildPost(),
          ),
        ),
      ],
    );
  }

  Widget loadDrawer() {
    return Drawer(
      backgroundColor: HexColor('#476E40'),
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
                        Navigator.pushNamed(context, "/home");
                      }),
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

                        return DrawerItem(
                            title: 'Chats',
                            icon: Icons.chat_bubble,
                            onTapPath: () async {
                              await ZIMKit()
                                  .connectUser(
                                    id: userEmail,
                                    name: userName,
                                  )
                                  .whenComplete(() =>
                                      Navigator.pushNamed(context, "/chat"));

                              if (!mounted) return;
                            });
                      }
                      return const SizedBox(
                        height: 0,
                      );
                    },
                  ),
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
                        _globalKey.currentState!.closeDrawer();
                      }),
                  DrawerItem(
                      title: 'About App',
                      icon: Icons.phone_android_rounded,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/about");
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
