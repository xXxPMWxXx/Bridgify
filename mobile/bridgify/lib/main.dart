import 'package:bridgify/pages/login_signup_page.dart';
import 'package:flutter/material.dart';

import 'pages/home_page1.dart';
// import 'pages/login_page.dart';
// import 'pages/register_page.dart';
import 'services/shared_service.dart';

Widget _defaultHome = const MainScreen();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Get result of the login function.
  bool _result = await SharedService.isLoggedIn();
  if (_result) {
    _defaultHome = const HomePage();
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // home: const HiddenDrawer(),
      routes: {
        '/': (context) => _defaultHome,
        '/home': (context) => const HomePage(),
        '/login': (context) => const MainScreen(),
      },
    );
  }
}