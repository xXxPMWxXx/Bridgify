import 'package:bridgify/config.dart';
import 'package:bridgify/models/login_response_model.dart';
import 'package:bridgify/pages/chat/chat_screen.dart';
import 'package:bridgify/pages/home/Admin/admin_home_page.dart';
import 'package:bridgify/pages/home/Child/home_page.dart';
import 'package:bridgify/pages/login_signup/login_signup_page.dart';
import 'package:bridgify/pages/login_signup/otp_page.dart';
import 'package:bridgify/pages/profile/profile_page.dart';
import 'package:bridgify/pages/profile/settings_page.dart';
import 'package:bridgify/services/shared_service.dart';
import 'package:flutter/material.dart';
import 'package:zego_zimkit/services/services.dart';

// import 'pages/login_page.dart';
// import 'pages/register_page.dart';

Widget _defaultHome = const MainScreen();

void main() async {
  await DataManagement.loadEnvFile;

  final appId = await DataManagement.getSecretData(StoredString.appId);
  final appSignKey =
      await DataManagement.getSecretData(StoredString.appSignKey);

  await ZIMKit().init(appID: int.parse(appId), appSign: appSignKey);

  WidgetsFlutterBinding.ensureInitialized();

  // Get result of the login function.
  bool _result = await SharedService.isLoggedIn();
  if (_result) {
    LoginResponseModel? loginDetails = await SharedService.loginDetails();
    if (loginDetails!.data.accRole == 'Child') {
      _defaultHome = const HomePage();
    } else
      _defaultHome = const AdminHomePage();
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
        '/login': (context) => const MainScreen(),
        '/settings': (context) => const SettingsPage(),
        '/profile': (context) => const ProfilePage(),

        //Child user
        '/home': (context) => const HomePage(),
        

        '/chat': (context) => const ChatScreen(
            conversationID: 'admin_account',
            conversationType: ZIMConversationType.peer),
        //Admin user
        '/Adminhome': (context) => const AdminHomePage(),
        //chat function for admins would house all users that message it
        //reassign elderlies page
      },
    );
  }
}
