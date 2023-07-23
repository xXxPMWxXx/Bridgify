import 'package:bridgify/accessories/post/build_picture.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

class BuildPost extends StatefulWidget {
  final List<PostResponseModel>? models;
  const BuildPost({super.key, required this.models});

  @override
  _BuildPostState createState() => _BuildPostState();
}

class _BuildPostState extends State<BuildPost> {
  List<String> dropDownValue = ['All'];
  String? currentItem = 'All';

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      APIService.getUserProfile().then((response) {
        Map userProfile = response as Map<String, dynamic>;
        for (var elder in userProfile["elderly"]) {
          dropDownValue.add(elder.toString());
        }
        print(dropDownValue);
      });
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DropdownButton(
            value: currentItem,
            items: dropDownValue
                .map((name) => DropdownMenuItem(
                      value: name,
                      child: Text(name),
                    ))
                .toList(),
            onChanged: (selectedItem) {
              setState(() {
                currentItem = selectedItem.toString();
              });
              print('Selected Item: $selectedItem');
            }),
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
          ),
        ),
      ],
    );
  }
}
