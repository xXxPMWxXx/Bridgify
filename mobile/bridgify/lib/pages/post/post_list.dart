import 'package:bridgify/accessories/drawer/drawer_item.dart';
import 'package:bridgify/accessories/post/post_item.dart';
import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

class PostList extends StatefulWidget {
  const PostList({super.key});

  @override
  _PostListState createState() => _PostListState();
}

class _PostListState extends State<PostList> {
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
      backgroundColor: Colors.white,
      body: loadPostListPage(),
      drawer: loadDrawer(),
    );
  }

  Widget loadPostListPage() {
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
                            print(imagePath);
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
                                        backgroundImage:
                                            Image.network(imagePath).image))
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
          // FutureBuilder
          child: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 10),
                  decoration: BoxDecoration(
                      color: Color(0xFF27c1a9),
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(30),
                          topRight: Radius.circular(30))),
                  child: Column(
                    children: [
                      const SizedBox(height: 20),
                      Text('Welcome to Bridgify',
                          style: Theme.of(context)
                              .textTheme
                              .headlineSmall
                              ?.copyWith(
                                color: Colors.white,
                              )),
                      const SizedBox(height: 30),
                      Container(
                        height: 30,
                        decoration: const BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(30),
                                topRight: Radius.circular(30))),
                      ),
                    ],
                  ),
                ),
                Transform.translate(
                  offset: const Offset(0, -50),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 40),
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                              offset: const Offset(0, 5),
                              color: Theme.of(context)
                                  .primaryColor
                                  .withOpacity(.2),
                              spreadRadius: 2,
                              blurRadius: 5)
                        ]),
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                                hintText: 'Search products',
                                hintStyle:
                                    TextStyle(color: Colors.grey.shade400),
                                border: InputBorder.none,
                                contentPadding:
                                    const EdgeInsets.symmetric(horizontal: 20)),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.all(5),
                          margin: const EdgeInsets.only(right: 10),
                          decoration: BoxDecoration(
                              color: Theme.of(context).primaryColor,
                              shape: BoxShape.circle),
                          child: const Center(
                              child: Icon(Icons.search,
                                  color: Colors.white, size: 22)),
                        )
                      ],
                    ),
                  ),
                ),
                Transform.translate(
                    offset: const Offset(0, -20),
                    child: FutureBuilder(
                      future: APIService.getPosts(),
                      builder: (
                        BuildContext context,
                        AsyncSnapshot<List<PostResponseModel>?> model,
                      ) {
                        // if (model.hasData) {
                          // return postScrollView(model.data);
                          return Column(
                            children: const [
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                              PostItem(),
                            ],
                          );
                        // }

                        // return const Center(
                        //   child: CircularProgressIndicator(),
                        // );
                      },
                    ))
              ],
            ),
          ),
        ),
      ],
    );
  }

  // Widget postScrollView(posts) {
  //   return ListView.builder(
  //     shrinkWrap: true,
  //     physics: const ClampingScrollPhysics(),
  //     scrollDirection: Axis.vertical,
  //     itemCount: posts.length,
  //     itemBuilder: (context, index) {
  //       return PostItem(
  //         model: products[index],
  //         onDelete: (ProductModel model) {
  //           setState(() {
  //             isApiCallProcess = true;
  //           });

  //           APIService.deleteProduct(model.id).then(
  //             (response) {
  //               setState(() {
  //                 isApiCallProcess = false;
  //               });
  //             },
  //           );
  //         },
  //       );
  //     },
  //   );
  // }

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
                                print(imagePath);
                                return imagePath != "" && imagePath != null
                                    ? CircleAvatar(
                                        radius: 32,
                                        backgroundImage:
                                            Image.network(imagePath).image)
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
                              print(model.data);
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
                      title: 'Chats', icon: Icons.chat_bubble, path: '/home'),
                  const DrawerItem(
                      title: 'Heatlh Records',
                      icon: Icons.notifications,
                      path: 'home'),
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
              const DrawerItem(title: 'Log out', icon: Icons.logout, path: '/')
            ],
          ),
        ),
      ),
    );
  }
}
