import 'package:bridgify/pages/home_page1.dart';
import 'package:bridgify/pages/settings_page.dart';
import 'package:flutter/material.dart';


class HiddenDrawer extends StatefulWidget {
  const HiddenDrawer({super.key});

  @override
  _HiddenDrawerState createState() => _HiddenDrawerState();
}

class _HiddenDrawerState extends State<HiddenDrawer> {
  List<ScreenHiddenDrawer> _pages = [];
  TextStyle drawerTextStyle = const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: Colors.white,
              );
  @override
  void initState() {
    super.initState();

    _pages = [
      ScreenHiddenDrawer(
          ItemHiddenMenu(
              name: "Homepage",
              baseStyle: drawerTextStyle,
              selectedStyle: TextStyle()),
          HomePage()),
      ScreenHiddenDrawer(
          ItemHiddenMenu(
              name: "Setting",
              baseStyle: drawerTextStyle,
              selectedStyle: TextStyle()),
          SettingsPage()),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack
    );
  }
}
