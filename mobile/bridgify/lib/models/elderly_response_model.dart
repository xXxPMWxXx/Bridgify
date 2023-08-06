import 'dart:convert';

List<ElderlyResponseModel> elderlyFromJson(dynamic str) =>
    List<ElderlyResponseModel>.from(
        (str).map((x) => ElderlyResponseModel.fromJson(x)));

ElderlyResponseModel elderlyResponseJson(dynamic str) =>
    ElderlyResponseModel.fromJson(json.decode(str));

class ElderlyResponseModel {
  late String? id;
  late String? name;
  late String? dob;
  late String? photo;
  late Status? status;
  late String? created;

  ElderlyResponseModel({
    this.id,
    this.name,
    this.dob,
    this.photo,
    this.status,
    this.created,
  });

  ElderlyResponseModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    dob = json['DOB'];
    photo = json['photo'];
    status = Status.fromJson(json['status']);
    created = json['created'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['DOB'] = dob;
    data['photo'] = photo;
    data['status'] = status!.toJson();
    data['created'] = created;
    return data;
  }
}

class Status {
  Status({
    required this.current_activity,
    required this.current_temp,
    required this.medication,
    required this.taken_med,
    required this.condition,
    required this.condition_description,
    required this.awake,
  });

  late String? current_activity;
  late String? current_temp;
  late List<dynamic>? medication;
  late String? taken_med;
  late String? condition;
  late String? condition_description;
  late String? awake;

  Status.fromJson(Map<String, dynamic> json) {
    current_activity = json['current_activity'];
    current_temp = json['current_temp'];
    medication = json['medication'];
    taken_med = json['taken_med'];
    condition = json['condition'];
    condition_description = json['condition_description'];
    awake = json['awake'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['current_activity'] = current_activity;
    data['current_temp'] = current_temp;
    data['medication'] = medication;
    data['taken_med'] = taken_med;
    data['condition'] = condition;
    data['condition_description'] = condition_description;
    data['awake'] = awake;
    return data;
  }
}
