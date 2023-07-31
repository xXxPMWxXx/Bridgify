class UpdateUserRequestModel {
  late String? name;
  late String? password;
  late String? email;
  late String? profileImage;
  UpdateUserRequestModel({
    String? name,
    String? password,
    String? email,
    String? profileImage,
  }) {
    this.name = name ?? '';
    this.password = password ?? '';
    this.email = email ?? '';
    this.profileImage = profileImage ?? '';
  }
  UpdateUserRequestModel.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    password = json['password'];
    email = json['email'];
    profileImage = json['profileImage'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['name'] = name;
    data['password'] = password;
    data['email'] = email;
    data['profileImage'] = profileImage;
    return data;
  }
}
