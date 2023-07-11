import 'dart:convert';

import 'package:bridgify/models/login_request_model.dart';
import 'package:bridgify/models/login_response_model.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/models/register_request_model.dart';
import 'package:bridgify/models/register_response_model.dart';
import 'package:bridgify/models/update_request_model.dart';
import 'package:http/http.dart' as http;

import '../../config.dart';
import 'shared_service.dart';

class APIService {
  static var client = http.Client();

  static Future<bool> login(
    LoginRequestModel model,
  ) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };
    //String? wifiIP = await NetworkInfo().getWifiIP();
    var url = Uri.http(
      Config.apiURL,
      Config.loginAPI,
    );

    var response = await client.post(url,
        headers: requestHeaders,
        body: jsonEncode(model.toJson()),
        encoding: utf8);

    if (response.statusCode == 200) {
      await SharedService.setLoginDetails(
        loginResponseJson(
          response.body,
        ),
      );

      return true;
    } else {
      return false;
    }
  }

  static Future<RegisterResponseModel> register(
    RegisterRequestModel model,
  ) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    var url = Uri.http(
      Config.apiURL,
      Config.registerAPI,
    );

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode(model.toJson()),
    );

    return registerResponseJson(
      response.body,
    );
  }

  static Future<Object> getUserProfile() async {
    var loginDetails = await SharedService.loginDetails();

    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${loginDetails!.data.accessToken}'
    };

    var url = Uri.http(Config.apiURL, Config.userProfileAPI);

    var response = await client.get(
      url,
      headers: requestHeaders,
    );
    // print(response);
    // print(response.statusCode);
    if (response.statusCode == 401) {
      return {
        "imagePath": loginDetails.data.profileImage,
        "name": loginDetails.data.name,
        "email": loginDetails.data.email,
        "elderly": loginDetails.data.linkedElderly
      };
    } else {
      return "";
    }
  }

  static Future<bool> update(
      UpdateUserRequestModel model, bool isFileSelected) async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(
      Config.apiURL,
      Config.updateAPI,
    );
    print(url);
    var request = http.MultipartRequest("put", url);
    request.headers.addAll(requestHeaders);
    request.fields["email"] = model.email!;
    request.fields["name"] = model.name!;
    request.fields["password"] = model.password!;
    if (!isFileSelected) {
      request.fields["imageChange"] = "false";
    } else if (model.profileImage != null) {
      request.fields["imageChange"] = "true";
      http.MultipartFile multipartFile = await http.MultipartFile.fromPath(
        'profileImage',
        model.profileImage!,
      );

      request.files.add(multipartFile);
    }
    http.StreamedResponse streamResponse = await request.send();

    final response = await http.Response.fromStream(streamResponse);

    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      var jsonData = jsonResponse['data'];
      jsonData['accessToken'] = currentLoginDetails.data.accessToken;
      var updatedResponse = {
        "message": jsonResponse["message"],
        "data": jsonData
      };
      String updatedResponseBody = json.encode(updatedResponse);
      await SharedService.setLoginDetails(
        loginResponseJson(updatedResponseBody),
      );

      return true;
    } else {
      return false;
    }
  }

  static Future<List<PostResponseModel>?> getPosts() async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    var url = Uri.http(
      Config.apiURL,
      Config.updateAPI,
    );

    var response = await client.get(
      url,
      headers: requestHeaders,
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return postFromJson(data["data"]);
    } else {
      return null;
    }
  }
}
