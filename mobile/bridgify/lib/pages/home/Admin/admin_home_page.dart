import 'package:bridgify/accessories/avatar_builder.dart';
import 'package:bridgify/accessories/drawer/drawer_item.dart';
import 'package:bridgify/accessories/post/build_post.dart';
import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:zego_zimkit/services/services.dart';

class AdminHomePage extends StatefulWidget {
  const AdminHomePage({Key? key}) : super(key: key);

  @override
  _AdminHomePageState createState() => _AdminHomePageState();
}

class _AdminHomePageState extends State<AdminHomePage> {
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
      backgroundColor: Colors.white /*const Color(0xFF171717)*/,
      body: loadAdminHomePage(),
      drawer: loadDrawer(),
    );
  }

  Widget loadAdminHomePage() {
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
                      icon: const Icon(
                        Icons.menu,
                        color: Color(0xFF171717),
                      )),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(
                          Icons.notifications_none_rounded,
                          color: Color(0xFF171717),
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
                                                'http://' +
                                                    Config.apiURL +
                                                    '/images/user_profile/' +
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
          bottom: 0,
          child: Container(
              padding: const EdgeInsets.symmetric(vertical: 15),
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(40),
                  topRight: Radius.circular(40),
                ),
                color: Color(0xFFEFFFFC),
              ),
              child: Container()
              //posts
              ),
        ),
      ],
    );
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
                                      backgroundImage: Image.network('http://' +
                                              Config.apiURL +
                                              '/images/user_profile/' +
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
                        Navigator.pushNamed(context, "/AdminHome");
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
                        Navigator.pushNamed(context, "/adminchat");
                      }),
                  DrawerItem(
                      title: 'Post History',
                      icon: Icons.notifications,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/home");
                      }),
                  DrawerItem(
                      title: 'Link elderly',
                      icon: Icons.notifications,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/home");
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
                        Navigator.pushNamed(context, "/home");
                      }),
                  DrawerItem(
                      title: 'About App',
                      icon: Icons.phone_android_rounded,
                      onTapPath: () {
                        Navigator.pushNamed(context, "/home");
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
