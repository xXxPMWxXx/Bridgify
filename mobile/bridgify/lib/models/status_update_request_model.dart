class StatusUpdateRequestModel {
  StatusUpdateRequestModel({
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

  StatusUpdateRequestModel.fromJson(Map<String, dynamic> json) {
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