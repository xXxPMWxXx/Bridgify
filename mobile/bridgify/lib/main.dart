import 'package:bridgify/accessories/post/build_post.dart';
import 'package:bridgify/accessories/post/picture_single.dart';
import 'package:bridgify/accessories/post/picture_carousel.dart';
import 'package:bridgify/pages/home_page.dart';
import 'package:bridgify/pages/login_signup/login_signup_page.dart';
import 'package:bridgify/pages/login_signup/otp_page.dart';
import 'package:bridgify/pages/profile/profile_page.dart';
import 'package:bridgify/pages/profile/settings_page.dart';
import 'package:bridgify/services/shared_service.dart';
import 'package:flutter/material.dart';

// import 'pages/login_page.dart';
// import 'pages/register_page.dart';

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
    List<String> images = [
      "https://picsum.photos/id/240/200/300",
      "https://picsum.photos/id/241/200/300",
      "https://picsum.photos/id/242/200/300",
      "https://picsum.photos/id/243/200/300",
      "https://picsum.photos/id/244/200/300",
      "https://picsum.photos/id/250/200/300",
      "https://picsum.photos/id/251/200/300",
      "https://picsum.photos/id/252/200/300",
      "https://picsum.photos/id/253/200/300",
      "https://picsum.photos/id/254/200/300",
    ];
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // home: PictureCarousel(images: images),
      // home: PictureSingle(urlImage: images[0]),
      // home: const BuildPost(),
      home: const FirstPage(),
    );
  }
}

class FirstPage extends StatefulWidget {
  const FirstPage({super.key});

  @override
  State<FirstPage> createState() => _FirstPageState();
}

class _FirstPageState extends State<FirstPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: {
        '/': (context) => _defaultHome,
        '/home': (context) => const HomePage(),
        '/login': (context) => const MainScreen(),
        '/profile': (context) => const ProfilePage(),
        '/settings': (context) => const SettingsPage(),
      },
    );
  }
}
