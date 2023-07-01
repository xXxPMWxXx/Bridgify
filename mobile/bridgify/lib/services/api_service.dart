import 'dart:convert';

import 'package:bridgify/models/login_request_model.dart';
import 'package:bridgify/models/login_response_model.dart';
import 'package:bridgify/models/register_request_model.dart';
import 'package:bridgify/models/register_response_model.dart';
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
      'Authorization': 'Basic ${loginDetails!.data.accessToken}'
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
        "name": loginDetails.data.name,
        "email": loginDetails.data.email,
        "elderly": loginDetails.data.linkedElderly
      };
    } else {
      return "";
    }
  }
}
