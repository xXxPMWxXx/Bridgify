List<PostResponseModel> postFromJson(dynamic str) =>
    List<PostResponseModel>.from(
        (str).map((x) => PostResponseModel.fromJson(x)));

class PostResponseModel {
  late String? id;
  late String? authorEmail;
  late String? dateTime;
  late String? activityType;
  late List<String>? productImage;
  late List<String>? elderlyInvolved;
  late int? imagesCount;

  PostResponseModel(
      {this.id,
      this.authorEmail,
      this.dateTime,
      this.activityType,
      this.productImage,
      this.elderlyInvolved,
      this.imagesCount});

  PostResponseModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    authorEmail = json['authorEmail'];
    dateTime = json['dateTime'];
    activityType = json['activityType'];
    productImage = json['productImage'];
    elderlyInvolved = json['elderlyInvolved'];
    imagesCount = json['imagesCount'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['authorEmail'] = authorEmail;
    _data['dateTime'] = dateTime;
    _data['activityType'] = activityType;
    _data['productImage'] = productImage;
    _data['elderlyInvolved'] = elderlyInvolved;
    _data['imagesCount'] = imagesCount;
    return _data;
  }
}
