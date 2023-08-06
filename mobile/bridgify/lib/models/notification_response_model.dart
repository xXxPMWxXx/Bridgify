List<NotificationResponseModel> notificationFromJson(dynamic str) =>
    List<NotificationResponseModel>.from(
        (str).map((x) => NotificationResponseModel.fromJson(x)));

class NotificationResponseModel {
  late String? id;
  late String? elderlyID;
  late String? message;
  late String? date;

  NotificationResponseModel({
    this.id,
    this.elderlyID,
    this.message,
    this.date,
  });

  NotificationResponseModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    elderlyID = json['elderlyID'];
    message = json['message'];
    date = json['date'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['_id'] = id;
    data['elderlyID'] = elderlyID;
    data['message'] = message;
    data['date'] = date;
    return data;
  }
}
