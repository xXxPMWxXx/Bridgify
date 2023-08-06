import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class StoredString {
  static const String appId = 'appId';
  static const String appSignKey = 'appSignKey';
}

class DataManagement {
  static get loadEnvFile => dotenv.load(fileName: '.env');
  static getSecretData(String key) => dotenv.env[key];
}

Future<void> copyToClipboard(text) async =>
    await Clipboard.setData(ClipboardData(text: text.toString()));

class Config {
  static const String appName = "Bridgify";
  //during deployment
  static const String apiURL = "13.228.86.148:8000";

  //user
  // static const String apiURL = "172.19.112.1:8000";

  static const String loginAPI = "api/user/login";
  static const String registerAPI = "api/user/signup";
  static const String userProfileAPI = "api/user/user-profile";
  static const String updateAPI = "api/user/update";

  //post
  static const String getPostsByUserAPI = "api/post/getByUser";
  static const String getPostsWithNoElderlyAPI =
      "api/post/getNonElderlyInvolved";
  static const String createPostAPI = "api/post/create";

  //elderly
  static const String getElderlyByIdAPI = "api/elderly/get";
  static const String getElderlyByUserAPI = "api/elderly/getByUser";
  static const String getElderlyAPI = "api/elderly/getAll";
  static const String createElderlyAPI = "api/elderly/insert";
  static const String updateElderlyAPI = "api/elderly/update";
  static const String deleteElderlyAPI = "api/elderly/delete";

  //faces
  static const String postFaceAPI = "api/face/post-face";

  //notification
  static const String getNotificationAPI = "api/notification/getLinked";
}
