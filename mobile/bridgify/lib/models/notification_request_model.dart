class NotificationRequestModel {
  late String? linkedElderly;

  NotificationRequestModel({
    this.linkedElderly,
  });

  NotificationRequestModel.fromJson(Map<String, dynamic> json) {
    linkedElderly = json['linkedElderly'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['linkedElderly'] = linkedElderly;
    return data;
  }
}
