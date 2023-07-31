import 'dart:convert';

import 'package:bridgify/models/elderly_request_model.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/models/login_request_model.dart';
import 'package:bridgify/models/login_response_model.dart';
import 'package:bridgify/models/post_request_model.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/models/register_request_model.dart';
import 'package:bridgify/models/register_response_model.dart';
import 'package:bridgify/models/user_update_request_model.dart';
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
    // if (loginDetails == null) {
    //   // return ;
    // }
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${loginDetails!.data.accessToken}'
    };

    var url = Uri.http(Config.apiURL, Config.userProfileAPI);

    var response = await client.get(
      url,
      headers: requestHeaders,
    );

    if (response.statusCode == 401) {
      return {
        "imagePath": loginDetails.data.profileImage,
        "name": loginDetails.data.name,
        "email": loginDetails.data.email,
        "elderly": loginDetails.data.linkedElderly,
        "accRole": loginDetails.data.accRole,
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

    var request = http.MultipartRequest("PUT", url);
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

  static Future<List<PostResponseModel>?> getPostsByUser() async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(Config.apiURL, Config.getPostsByUserAPI,
        {"email": currentLoginDetails.data.email});

    var response = await client.get(
      url,
      headers: requestHeaders,
    );
    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return postFromJson(data);
    } else {
      return null;
    }
  }

  static Future<List<PostResponseModel>?> getPostsByNoElderlyInvolved() async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(
      Config.apiURL,
      Config.getPostsWithNoElderlyAPI,
    );

    var response = await client.get(
      url,
      headers: requestHeaders,
    );
    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return postFromJson(data);
    } else {
      return null;
    }
  }

  static Future<bool> createPosts(PostRequestModel model) async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(
      Config.apiURL,
      Config.createPostAPI,
    );

    var request = http.MultipartRequest("POST", url);
    request.headers.addAll(requestHeaders);
    request.fields["author_email"] = model.authorEmail!;
    request.fields["description"] = model.description!;
    request.fields["activity_type"] = model.activityType!;

    for (var i = 0; i < model.postImages!.length; i++) {
      http.MultipartFile multipartFile = await http.MultipartFile.fromPath(
        'images',
        model.postImages![i],
      );

      request.files.add(multipartFile);
    }

    http.StreamedResponse streamResponse = await request.send();

    final response = await http.Response.fromStream(streamResponse);

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  static Future<List<ElderlyResponseModel>?> getElderlyByUser() async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(Config.apiURL, Config.getElderlyByUserAPI,
        {"email": currentLoginDetails.data.email});

    var response = await client.get(
      url,
      headers: requestHeaders,
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return elderlyFromJson(data);
    } else {
      return null;
    }
  }

  static Future<List<ElderlyResponseModel>?> getElderly() async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(Config.apiURL, Config.getElderlyAPI);

    var response = await client.get(
      url,
      headers: requestHeaders,
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return elderlyFromJson(data);
    } else {
      return null;
    }
  }

  static Future<bool> createElderly(ElderlyRequestModel model) async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };
    // static const String createElderlyAPI = "api/elderly/insert";
    // static const String postFaceAPI = "api/face/post-face";

    var trainingUrl = Uri.http(
      Config.apiURL,
      Config.postFaceAPI,
    );

    var trainingRequest = http.MultipartRequest("POST", trainingUrl);
    trainingRequest.headers.addAll(requestHeaders);
    trainingRequest.fields["label"] = model.name!;
    trainingRequest.fields["elderlyID"] = model.id!;
    http.MultipartFile trainingMultipartFile =
        await http.MultipartFile.fromPath(
      'file',
      model.photo!,
    );

    trainingRequest.files.add(trainingMultipartFile);

    http.StreamedResponse trainingStreamResponse = await trainingRequest.send();

    final trainingResponse =
        await http.Response.fromStream(trainingStreamResponse);

    if (trainingResponse.statusCode == 200) {
      model.photo = "${model.id}.png";

      var postingUrl = Uri.http(
        Config.apiURL,
        Config.createElderlyAPI,
      );

      var postingResponse = await client.post(
        postingUrl,
        headers: requestHeaders,
        body: jsonEncode(model.toJson()),
      );

      return postingResponse.statusCode == 200;
    }

    return false;
  }

  static Future<bool> updateElderly(ElderlyRequestModel model) async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url = Uri.http(
      Config.apiURL,
      Config.updateElderlyAPI,
    );

    var response = await client.put(
      url,
      headers: requestHeaders,
      body: jsonEncode(model.toJson()),
    );

    return response.statusCode == 200;
  }

  static Future<bool> deleteElderly(String elderlyID) async {
    var currentLoginDetails = await SharedService.loginDetails();
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${currentLoginDetails!.data.accessToken}'
    };

    var url =
        Uri.http(Config.apiURL, Config.deleteElderlyAPI, {"id": elderlyID});

    var response = await client.delete(
      url,
      headers: requestHeaders,
    );
    return response.statusCode == 200;
  }
}
