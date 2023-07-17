import 'package:bridgify/accessories/post/build_picture.dart';
import 'package:bridgify/accessories/post/picture_carousel.dart';
import 'package:bridgify/accessories/post/picture_single.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:flutter/material.dart';

class BuildPost extends StatefulWidget {
  final List<PostResponseModel>? models;
  const BuildPost({super.key, required this.models});

  @override
  _BuildPostState createState() => _BuildPostState();
}

class _BuildPostState extends State<BuildPost> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
            flex: 2,
            child: ListView.builder(
              shrinkWrap: true,
              physics: const ClampingScrollPhysics(),
              scrollDirection: Axis.vertical,
              padding: EdgeInsets.all(0),
              itemCount: widget.models!.length,
              itemBuilder: (context, index) {
                return BuildPicture(
                    model: widget.models![widget.models!.length - 1 - index]);
              },
            ))
      ],
    );
  }
}
