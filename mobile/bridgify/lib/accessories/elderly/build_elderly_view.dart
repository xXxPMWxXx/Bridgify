import 'package:bridgify/accessories/elderly/build_elderly_avatar.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:flutter/material.dart';

class BuildElderlyView extends StatefulWidget {
  final List<ElderlyResponseModel>? models;
  const BuildElderlyView({super.key, required this.models});

  @override
  _BuildElderlyViewState createState() => _BuildElderlyViewState();
}

class _BuildElderlyViewState extends State<BuildElderlyView> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
            flex: 2,
            child: ListView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.all(0),
              itemCount: widget.models!.length,
              itemBuilder: (context, index) {
                return BuildElderlyAvatar(
                    model: widget.models![widget.models!.length - 1 - index]);
              },
            ))
      ],
    );
  }
}
