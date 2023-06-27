import 'dart:convert';

LoginResponseModel loginResponseJson(String str) =>
    LoginResponseModel.fromJson(json.decode(str));

class LoginResponseModel {
  LoginResponseModel({
    required this.message,
    required this.data,
  });
  late final String message;
  late final Data data;

  LoginResponseModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    data = Data.fromJson(json['data']);
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['message'] = message;
    _data['data'] = data.toJson();
    return _data;
  }
}

class Data {
  Data({
    required this.email,
    required this.name,
    required this.accRole,
    required this.linkedElderly,
    required this.dateCreated,
    required this.id,
    required this.accessToken,
  });
  late final String email;
  late final String name;
  late final String accRole;
  late final List<dynamic> linkedElderly;
  late final String dateCreated;
  late final String id;
  late final String accessToken;

  Data.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    name = json['name'];
    accRole = json['accRole'];
    linkedElderly = json['linkedElderly'];
    dateCreated = json['dateCreated'];
    id = json['_id'];
    accessToken = json['accessToken'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['email'] = email;
    _data['name'] = name;
    _data['accRole'] = accRole;
    _data['linkedElderly'] = linkedElderly;
    _data['dateCreated'] = dateCreated;
    _data['_id'] = id;
    _data['accessToken'] = accessToken;
    return _data;
  }
}
