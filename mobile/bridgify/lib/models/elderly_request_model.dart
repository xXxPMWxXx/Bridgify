class ElderlyRequestModel {
  late String? id;
  late String? name;
  late String? dob;
  late String? photo;
  late Status? status;

  ElderlyRequestModel({
    this.id,
    this.name,
    this.dob,
    this.photo,
    this.status,
  });

  ElderlyRequestModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    dob = json['DOB'];
    photo = json['photo'];
    status = Status.fromJson(json['status']);
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['DOB'] = dob;
    data['photo'] = photo;
    data['status'] = status!.toJson();
    return data;
  }
}

class Status {
  Status({
    this.current_activity,
    this.current_temp,
    this.medication,
    this.taken_med,
    this.condition,
    this.condition_description,
    this.awake,
  });

  String? current_activity;
  String? current_temp;
  List<dynamic>? medication;
  String? taken_med;
  String? condition;
  String? condition_description;
  String? awake;

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
