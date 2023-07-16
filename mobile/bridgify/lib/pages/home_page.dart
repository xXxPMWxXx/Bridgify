import 'package:bridgify/accessories/avatar_builder.dart';
import 'package:bridgify/accessories/drawer/drawer_item.dart';
import 'package:bridgify/accessories/post/build_post.dart';
import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:bridgify/config.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

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
      backgroundColor: Colors.white /*const Color(0xFF171717)*/,
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
          child: Container(
            padding: const EdgeInsets.only(top: 15, left: 25, right: 25),
            height: 210,
            decoration: const BoxDecoration(
                color: Color(0xFF27c1a9),
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
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    physics: const NeverScrollableScrollPhysics(),
                    children: const [
                      BuildContactAvatar(name: 'Alla', fileName: 'img1.jpeg'),
                      BuildContactAvatar(name: 'July', fileName: 'img1.jpeg'),
                      BuildContactAvatar(name: 'Mikle', fileName: 'img1.jpeg'),
                      BuildContactAvatar(name: 'Kler', fileName: 'img1.jpeg'),
                    ],
                  ),
                )
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
              padding: const EdgeInsets.symmetric(vertical: 15),
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40)),
                color: Color(0xFFEFFFFC),
              ),
              child: FutureBuilder(
                future: APIService.getPosts(),
                builder: (
                  BuildContext context,
                  AsyncSnapshot<List<PostResponseModel>?> model,
                ) {
                  if (model.hasData) {
                    return BuildPost(models: model.data);
                  }

                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                },
              ),
              //posts
            ))
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
                            builder: (BuildContext context,
                                AsyncSnapshot<Object> model) {
                              var userProfileData =
                                  model.data as Map<String, dynamic>?;

                              if (model.hasData) {
                                var imagePath = userProfileData?["imagePath"];
                                return imagePath != "" && imagePath != null
                                    ? CircleAvatar(
                                        radius: 32,
                                        backgroundImage: Image.network(
                                                'http://' +
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
                            }),
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
                  const DrawerItem(
                      title: 'Home', icon: Icons.home, path: '/home'),
                  const DrawerItem(
                      title: 'Chats',
                      icon: Icons.chat_bubble,
                      path: '/profile'),
                  const DrawerItem(
                      title: 'Heatlh Records',
                      icon: Icons.notifications,
                      path: '/posts'),
                  const DrawerItem(
                      title: 'Settings',
                      icon: Icons.settings,
                      path: '/settings'),
                  const Divider(
                    thickness: 2.5,
                    height: 20,
                    color: Colors.white,
                  ),
                  const DrawerItem(
                      title: 'Help', icon: Icons.help, path: '/home'),
                  const DrawerItem(
                      title: 'About App',
                      icon: Icons.phone_android_rounded,
                      path: '/home'),
                ],
              ),
              const DrawerItem(title: 'Log out', icon: Icons.logout, path: "")
            ],
          ),
        ),
      ),
    );
  }
}
