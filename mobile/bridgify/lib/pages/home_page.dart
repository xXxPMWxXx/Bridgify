import 'package:flutter/material.dart';

class NavigationDrawer extends StatefulWidget {
  const NavigationDrawer({super.key});

  @override
  _NavigationDrawerState createState() => _NavigationDrawerState();
}

class _NavigationDrawerState extends State<NavigationDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
        child: ListView(padding: EdgeInsets.zero, children: [
      UserAccountsDrawerHeader(
        accountName: const Text('George'),
        accountEmail: const Text('george@gmail.com'),
        currentAccountPicture: CircleAvatar(
            child: ClipOval(child: Image.asset('images/test.png'))),
        decoration: const BoxDecoration(
            color: Colors.blueGrey,
            image: DecorationImage(
                image: AssetImage("images/drawer.png"), fit: BoxFit.cover)),
      ),
      ListTile(
        leading: const Icon(Icons.home),
        title: const Text("Home"),
        onTap: () => print("Home tapped"),
      ),
      ListTile(
        leading: Icon(Icons.health_and_safety_outlined),
        title: Text("Health Records"),
        onTap: () => print("Health tapped"),
      ),
      ListTile(
        leading: const Icon(Icons.chat),
        title: const Text("Chat"),
        onTap: () => print("Chat tapped"),
      ),
      Divider(),
      ListTile(
        leading: const Icon(Icons.settings),
        title: const Text("Settings"),
        onTap: () => print("Settings tapped"),
      ),
      ListTile(
        leading: const Icon(Icons.logout_rounded),
        title: const Text("Sign Out"),
        onTap: () => print("LogOut tapped"),
      )
    ]));
  }
}
