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
    final _data = <String, dynamic>{};
    _data['id'] = id;
    _data['name'] = name;
    _data['DOB'] = dob;
    _data['photo'] = photo;
    _data['status'] = status!.toJson();
    return _data;
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
    final _data = <String, dynamic>{};
    _data['current_activity'] = current_activity;
    _data['current_temp'] = current_temp;
    _data['medication'] = medication;
    _data['taken_med'] = taken_med;
    _data['condition'] = condition;
    _data['condition_description'] = condition_description;
    _data['awake'] = awake;
    return _data;
  }
}
