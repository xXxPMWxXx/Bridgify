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
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['author_email'] = authorEmail;
    _data['dateTime'] = dateTime;
    _data['description'] = description;
    _data['activity_type'] = activityType;
    _data['postImages'] = postImages;
    _data['elderlyInvolved'] = elderlyInvolved;
    _data['imagesCount'] = imagesCount;
    return _data;
  }
}
