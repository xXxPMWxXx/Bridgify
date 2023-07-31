List<PostResponseModel> postFromJson(dynamic str) =>
    List<PostResponseModel>.from(
        (str).map((x) => PostResponseModel.fromJson(x)));

class PostResponseModel {
  late String? id;
  late String? authorEmail;
  late String? dateTime;
  late String? description;
  late String? activityType;
  late List<String>? postImages;
  late List<dynamic>? elderlyInvolved;
  late int? imagesCount;

  PostResponseModel(
      {this.id,
      this.authorEmail,
      this.dateTime,
      this.description,
      this.activityType,
      this.postImages,
      this.elderlyInvolved,
      this.imagesCount});

  PostResponseModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    authorEmail = json['author_email'];
    dateTime = json['dateTime'];
    description = json['description'];
    activityType = json['activity_type'];
    postImages =
        List<String>.from(json['postImages']?.map((x) => x.toString()) ?? []);
    elderlyInvolved = json['elderlyInvolved'];
    imagesCount = json['imagesCount'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['_id'] = id;
    data['author_email'] = authorEmail;
    data['dateTime'] = dateTime;
    data['description'] = description;
    data['activity_type'] = activityType;
    data['postImages'] = postImages;
    data['elderlyInvolved'] = elderlyInvolved;
    data['imagesCount'] = imagesCount;
    return data;
  }
}
