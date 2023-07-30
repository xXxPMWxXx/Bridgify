class PostRequestModel {
  late String? authorEmail;
  late String? description;
  late String? activityType;
  late List<String>? postImages;

  PostRequestModel({
    this.authorEmail,
    this.description,
    this.activityType,
    this.postImages,
  });

  PostRequestModel.fromJson(Map<String, dynamic> json) {
    authorEmail = json['author_email'];
    description = json['description'];
    activityType = json['activity_type'];
    postImages =
        List<String>.from(json['postImages']?.map((x) => x.toString()) ?? []);
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['author_email'] = authorEmail;
    data['description'] = description;
    data['activity_type'] = activityType;
    data['postImages'] = postImages;
    return data;
  }
}