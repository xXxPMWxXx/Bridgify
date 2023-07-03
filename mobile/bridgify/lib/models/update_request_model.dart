class UpdateUserRequestModel {
  UpdateUserRequestModel({
    this.name,
    this.password,
    this.email,
  });
  late final String? name;
  late final String? password;
  late final String? email;

  UpdateUserRequestModel.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    password = json['password'];
    email = json['email'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['name'] = name;
    _data['password'] = password;
    _data['email'] = email;
    return _data;
  }
}