import 'dart:convert';

RegisterResponseModel registerResponseJson(String str) =>
    RegisterResponseModel.fromJson(json.decode(str));

class RegisterResponseModel {
  RegisterResponseModel({
    required this.message,
    required this.data,
  });
  late final String message;
  late final Data? data;

  RegisterResponseModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    data = json['data'] != null ? Data.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['message'] = message;
    _data['data'] = data!.toJson();
    return _data;
  }
}

class Data {
  Data({
    required this.email,
    required this.name,
    this.profileImage,
    required this.accRole,
    required this.linkedElderly,
    required this.dateCreated,
    required this.id,
  });
  late final String email;
  late final String name;
  late final String? profileImage;
  late final String accRole;
  late final List<dynamic> linkedElderly;
  late final String dateCreated;
  late final String id;

  Data.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    name = json['name'];
    profileImage = json['profileImage'];
    accRole = json['accRole'];
    linkedElderly = json['linkedElderly'];
    dateCreated = json['dateCreated'];
    id = json['id'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['email'] = email;
    _data['name'] = name;
    _data['profileImage'] = profileImage;
    _data['accRole'] = accRole;
    _data['linkedElderly'] = linkedElderly;
    _data['dateCreated'] = dateCreated;
    _data['id'] = id;
    return _data;
  }
}
