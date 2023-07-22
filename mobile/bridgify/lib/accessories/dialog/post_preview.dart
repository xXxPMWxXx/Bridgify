import 'package:bridgify/accessories/dialog/dialog_picture_carousel.dart';
import 'package:bridgify/accessories/dialog/dialog_picture_single.dart';
import 'package:bridgify/models/post_request_model.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class PostPreview extends StatefulWidget {
  final PostResponseModel? model;
  const PostPreview({
    Key? key,
    this.model,
  }) : super(key: key);

  @override
  State<PostPreview> createState() => _PostPreviewState();
}

class _PostPreviewState extends State<PostPreview> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(children: [
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.7,
          width: MediaQuery.of(context).size.width,
          child: buildPreview(widget.model),
        ),
        Positioned(
          left: 20,
          top: 20,
          child: Text(
            'Post Preview',
            style: TextStyle(
              color: Colors.black.withOpacity(0.85),
              fontSize: 25,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Positioned(
          right: 0,
          top: 0,
          child: MaterialButton(
            onPressed: () {
              setState(() {
                if (Navigator.canPop(context)) Navigator.pop(context);
              });
            },
            child: Icon(
              Icons.close_rounded,
              color: Colors.black,
            ),
          ),
        ),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: HexColor("#33A11D"),
            child: MaterialButton(
              onPressed: () {
                PostRequestModel postRequestModel = PostRequestModel();
                postRequestModel.authorEmail = widget.model!.authorEmail;
                postRequestModel.description = widget.model!.description;
                postRequestModel.activityType = widget.model!.activityType;
                postRequestModel.postImages = widget.model!.postImages;

                APIService.createPosts(postRequestModel).then((response) {
                  if (response) {
                    print("success");
                    //go to the next page for success
                  } else {
                    print("failure");
                    //go to the next page for failure
                  }
                  if (Navigator.canPop(context)) Navigator.pop(context);
                });
              },
              child: const Text('POST'),
              textColor: Colors.white,
            ),
          ),
        ),
      ]),
    );
  }

  Widget buildPreview(model) {
    if (model!.imagesCount! > 1) {
      return DialogPictureCarousel(
          images: model!.postImages!,
          description: model!.description!,
          activity: model!.activityType!,
          imagesCount: model!.imagesCount);
    }
    return DialogPictureSingle(
        image: model!.postImages![0],
        description: model!.description!,
        activity: model!.activityType!);
  }
}
