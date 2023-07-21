List<ElderlyResponseModel> elderlyFromJson(dynamic str) =>
    List<ElderlyResponseModel>.from(
        (str).map((x) => ElderlyResponseModel.fromJson(x)));

class ElderlyResponseModel {
  late String? id;
  late String? name;
  late String? dob;
  late String? photo;
  late Map<String, dynamic>? status;
  late String? date;

  ElderlyResponseModel({
    this.id,
    this.name,
    this.dob,
    this.photo,
    this.status,
    this.date,
  });

  ElderlyResponseModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    name = json['name'];
    dob = json['dob'];
    photo = json['photo'];
    status = json['status'];
    date = json['date'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['name'] = name;
    _data['dob'] = dob;
    _data['photo'] = photo;
    _data['status'] = status;
    _data['date'] = date;
    return _data;
  }
}
