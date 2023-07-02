import 'package:bridgify/accessories/user_avatar.dart';
import 'package:bridgify/accessories/drawer_item.dart';
import 'package:flutter/material.dart';

class DrawerBody extends StatefulWidget {
  const DrawerBody({Key? key}) : super(key: key);

  @override
  State<DrawerBody> createState() => _DrawerBodyState();
}

class _DrawerBodyState extends State<DrawerBody> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: 275,
      elevation: 30,
      backgroundColor: const Color(0xF3393838),
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.horizontal(right: Radius.circular(40))),
      child: Container(
        decoration: const BoxDecoration(
            borderRadius: BorderRadius.horizontal(right: Radius.circular(40)),
            boxShadow: [
              BoxShadow(color: Colors.black, spreadRadius: 30, blurRadius: 20)
            ]),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 50, 20, 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                children: [
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(
                          Icons.arrow_back_ios,
                          color: Colors.white,
                        ),
                        iconSize: 20,
                      ),
                      const SizedBox(
                        width: 56,
                      ),
                      const Text(
                        'Settings',
                        style: TextStyle(color: Colors.white, fontSize: 16),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  const Row(
                    children: [
                      UserAvatar(filename: 'img3.jpeg', radius: 32,),
                      SizedBox(
                        width: 12,
                      ),
                      Text(
                        'Tom Brenan',
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 35,
                  ),
                  const DrawerItem(
                    title: 'Account',
                    icon: Icons.key,
                  ),
                  const DrawerItem(title: 'Chats', icon: Icons.chat_bubble),
                  const DrawerItem(title: 'Notifications', icon: Icons.notifications),
                  const DrawerItem(title: 'Data and Storage', icon: Icons.storage),
                  const DrawerItem(title: 'Help', icon: Icons.help),
                  const Divider(
                    thickness: 2.5,
                    height: 20,
                    color: Colors.white,
                  ),
                  const DrawerItem(
                      title: 'Invite a friend', icon: Icons.people_outline),
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
