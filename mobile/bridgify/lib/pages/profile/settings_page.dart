import 'package:bridgify/accessories/profile/account_option_row.dart';
import 'package:bridgify/accessories/profile/notification_option_row.dart';
import 'package:bridgify/services/shared_service.dart';
import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          elevation: 1,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          leading: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: const Icon(
              Icons.arrow_back_ios,
              color: Color(0xFF27c1a9),
            ),
          ),
        ),
        body: Container(
            padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
            child: ListView(
              children: [
                const Text(
                  "Settings",
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Row(
                  children: [
                    Icon(Icons.person, color: Color(0xFF27c1a9)),
                    SizedBox(
                      width: 8,
                    ),
                    Text(
                      "Account",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const Divider(
                  height: 35,
                  thickness: 2,
                ),
                const SizedBox(
                  height: 10,
                ),
                BuildAccountOptionRow(title: "Content Settings"),
                BuildAccountOptionRow(title: "Social"),
                BuildAccountOptionRow(title: "Language"),
                BuildAccountOptionRow(title: "Privacy and Security"),
                const SizedBox(
                  height: 20,
                ),
                const Row(
                  children: [
                    Icon(
                      Icons.volume_up_outlined,
                      color: Color(0xFF27c1a9),
                    ),
                    SizedBox(
                      width: 8,
                    ),
                    Text(
                      "Notification",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const Divider(
                  height: 35,
                  thickness: 2,
                ),
                const SizedBox(
                  height: 10,
                ),
                BuildNotificationOptionRow(title: "New for you"),
                BuildNotificationOptionRow(title: "Account acitivity"),
                BuildNotificationOptionRow(title: "Upcoming events"),
                const SizedBox(
                  height: 20,
                ),
                Center(
                  child: OutlinedButton(
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all(
                          const EdgeInsets.symmetric(horizontal: 60)),
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                    ),
                    onPressed: () {
                      SharedService.logout(context);
                    },
                    child: const Text(
                      "SIGN OUT",
                      style: TextStyle(
                          fontSize: 16, letterSpacing: 2.2, color: Colors.black),
                    ),
                  ),
                )
              ],
            )),
      ),
    );
  }
}
