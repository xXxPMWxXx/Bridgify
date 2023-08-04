import 'package:bridgify/config.dart';
import 'package:bridgify/models/login_response_model.dart';
import 'package:bridgify/pages/about/about_us_page.dart';
import 'package:bridgify/pages/chat/Admin/admin_chat_list_screen.dart';
import 'package:bridgify/pages/chat/Child/chat_screen.dart';
import 'package:bridgify/pages/elderly/Admin/admin_elderly_records_page.dart';
import 'package:bridgify/pages/elderly/Admin/create_elderly.dart';
import 'package:bridgify/pages/home/Admin/admin_home_page.dart';
import 'package:bridgify/pages/home/Child/home_page.dart';
import 'package:bridgify/pages/login_signup/login_signup_page.dart';
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
  bool result = await SharedService.isLoggedIn();
  if (result) {
    LoginResponseModel? loginDetails = await SharedService.loginDetails();
    if (loginDetails!.data.accRole == 'Child') {
      _defaultHome = const HomePage();
    } else {
      _defaultHome = const AdminHomePage();
    }
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bridgify',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
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
      title: 'Bridgify Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
      ),
      routes: {
        '/': (context) => _defaultHome,
        '/login': (context) => const MainScreen(),
        '/settings': (context) => const SettingsPage(),
        '/profile': (context) => const ProfilePage(),
        '/about': (context) => const AboutUsScreen(),

        //Child user
        '/home': (context) => const HomePage(),
        '/chat': (context) => const ChatScreen(
            conversationID: 'admin_account',
            conversationType: ZIMConversationType.peer),
        //Admin user
        '/adminHome': (context) => const AdminHomePage(),
        '/adminChatList': (context) =>
            const AdminChatListScreen(conversationID: 'admin_account'),
        '/adminElderlyRecords': (context) => const AdminElderlyRecords(),
        '/adminCreateElderly': (context) => const CreateElderly(),
      },
    );
  }
}
