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
  final _postPreviewController = PageController();
  var _hasPosted = false;
  var _hasClicked = false;
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
          child: PageView(
            physics: const NeverScrollableScrollPhysics(),
            controller: _postPreviewController,
            children: [
              _buildPreview(widget.model),
              _postOutcome(),
            ],
          ),
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
              if (Navigator.canPop(context)) Navigator.pop(context);
            },
            child: const Icon(
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
                if (_hasClicked) {
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context);
                  }
                } else {
                  PostRequestModel postRequestModel = PostRequestModel();
                  postRequestModel.authorEmail = widget.model!.authorEmail;
                  postRequestModel.description = widget.model!.description;
                  postRequestModel.activityType = widget.model!.activityType;
                  postRequestModel.postImages = widget.model!.postImages;

                  APIService.createPosts(postRequestModel).then(
                    (response) {
                      if (response) {
                        setState(() {
                          _hasPosted = true;
                          _hasClicked = true;
                        });
                      } else {
                        setState(() {
                          _hasPosted = false;
                          _hasClicked = true;
                        });
                      }
                      _postPreviewController.animateToPage(1,
                          duration: const Duration(milliseconds: 200),
                          curve: Curves.easeIn);
                    },
                  );
                }
              },
              textColor: Colors.white,
              child: Visibility(
                  visible: !_hasClicked,
                  replacement:
                      _hasPosted ? const Text('DONE') : const Text('RE-TRY'),
                  child: const Text('POST')),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildPreview(model) {
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

  Widget _postOutcome() {
    return Stack(
      alignment: Alignment.center,
      children: [
        Visibility(
          visible: _hasPosted,
          replacement: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.close_rounded,
                size: 100,
                color: Colors.red,
              ),
              const SizedBox(height: 16),
              Text(
                'Something went wrong!',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
              Text(
                'Please try posting again later',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.check_circle_outline_rounded,
                size: 100,
                color: Colors.green,
              ),
              const SizedBox(height: 16),
              Text(
                'Post saved successfully!',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
