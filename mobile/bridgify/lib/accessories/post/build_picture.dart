import 'package:bridgify/accessories/post/picture_carousel.dart';
import 'package:bridgify/accessories/post/picture_single.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:flutter/material.dart';

class BuildPicture extends StatelessWidget {
  final PostResponseModel? model;
  const BuildPicture({
    Key? key,
    this.model,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (model!.imagesCount! > 1) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: PictureCarousel(
          images: model!.postImages!,
          description: model!.description!,
          activity: model!.activityType!,
          elderlyInvolved: model!.elderlyInvolved,
        ),
      );
    }
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: PictureSingle(
        image: model!.postImages![0],
        description: model!.description!,
        activity: model!.activityType!,
        elderlyInvolved: model!.elderlyInvolved,
      ),
    );
  }
}
