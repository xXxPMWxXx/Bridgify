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
  final _postPrevieweController = PageController();
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
        Container(
          height: MediaQuery.of(context).size.height * 0.7,
          width: MediaQuery.of(context).size.width,
          child: PageView(
            physics: NeverScrollableScrollPhysics(),
            controller: _postPrevieweController,
            children: [
              _buildPreview(widget.model),
              _postOutcome(),
            ],
          ),
        ),
        // SizedBox(
        //   height: MediaQuery.of(context).size.height * 0.7,
        //   width: MediaQuery.of(context).size.width,
        //   child: buildPreview(widget.model),
        // ),
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
                if (_hasClicked) {
                  if (_hasPosted) {
                    Navigator.pushNamedAndRemoveUntil(
                      context,
                      '/',
                      (Route<dynamic> route) {
                        return route.settings.name == '/adminHome';
                      },
                    );
                  }
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
                        print("success");
                        setState(() {
                          _hasPosted = false;
                          _hasClicked = true;
                        });
                        _postPrevieweController.animateToPage(1,
                            duration: Duration(milliseconds: 200),
                            curve: Curves.easeIn);
                      } else {
                        setState(() {
                          _hasPosted = false;
                          _hasClicked = true;
                        });
                        _postPrevieweController.animateToPage(1,
                            duration: Duration(milliseconds: 100),
                            curve: Curves.easeIn);
                      }
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

  _postOutcome() {
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
                SizedBox(height: 16),
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
                Icon(
                  Icons.check_circle_outline_rounded,
                  size: 100,
                  color: Colors.green,
                ),
                SizedBox(height: 16),
                Text(
                  'Post saved successfully!',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.black.withOpacity(0.5),
                  ),
                ),
              ],
            )),
      ],
    );
  }
}
