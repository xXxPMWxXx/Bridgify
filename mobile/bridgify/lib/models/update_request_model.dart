import 'dart:io';

class UpdateUserRequestModel {
  UpdateUserRequestModel({
    this.name,
    this.password,
    this.email,
    this.profileImage,
  });
  late final String? name;
  late final String? password;
  late final String? email;
  late final String? profileImage;

  UpdateUserRequestModel.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    password = json['password'];
    email = json['email'];
    profileImage = json['profileImage'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['name'] = name;
    _data['password'] = password;
    _data['email'] = email;
    _data['profileImage'] = profileImage;
    return _data;
  }
}
