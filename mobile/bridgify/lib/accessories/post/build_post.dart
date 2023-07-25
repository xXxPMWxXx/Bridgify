import 'package:bridgify/accessories/post/build_picture.dart';
import 'package:bridgify/models/post_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

class BuildPost extends StatefulWidget {
  // final List<PostResponseModel>? models;
  const BuildPost({
    super.key,
    /*required this.models*/
  });

  @override
  _BuildPostState createState() => _BuildPostState();
}

class _BuildPostState extends State<BuildPost> {
  List<String> dropDownValue = ['My Elderly', 'General'];
  final ScrollController _scrollController = ScrollController();
  String? currentItem;
  @override
  void initState() {
    super.initState();
    currentItem = dropDownValue[0];
    //   Future.delayed(Duration.zero, () {
    //     APIService.getUserProfile().then((response) {
    //       Map userProfile = response as Map<String, dynamic>;
    //       for (var elder in userProfile["elderly"]) {
    //         dropDownValue.add(elder.toString());
    //       }
    //       print(dropDownValue);
    //     });
    //     setState(() {});
    //   });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text(
                "My Posts",
                style: TextStyle(
                  color: Colors.grey.shade800,
                  fontFamily: "Sofia",
                  fontSize: 20,
                ),
              ),
              const SizedBox(width: 35),
              Container(
                width: 165,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: DropdownButtonFormField<String>(
                  icon: Icon(
                    Icons.filter_alt,
                    color: Colors.grey.shade600,
                  ),
                  value: currentItem,
                  onChanged: (value) {
                    setState(() {
                      currentItem = value;
                    });
                    _scrollController.animateTo(0.0,
                        duration: const Duration(milliseconds: 1),
                        curve: Curves.easeInOut);
                    print('Selected Value: $value');
                  },
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 16.0,
                  ),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                  ),
                  items: dropDownValue.map((value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Row(
                        children: [
                          value == 'My Elderly'
                              ? Icon(
                                  Icons.elderly,
                                  color: Colors.grey.shade600,
                                )
                              : Icon(Icons.group, color: Colors.grey.shade600),
                          const SizedBox(width: 5),
                          Text(
                            value,
                            style: const TextStyle(
                              color: Colors.black,
                              fontSize: 16.0,
                              fontFamily: 'Sofia',
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),
        if (currentItem == dropDownValue[0])
          FutureBuilder(
            future: APIService.getPostsByUser(),
            builder: (
              BuildContext context,
              AsyncSnapshot<List<PostResponseModel>?> model,
            ) {
              if (model.hasData) {
                return Expanded(
                  flex: 2,
                  child: ListView.builder(
                    controller: _scrollController,
                    shrinkWrap: true,
                    physics: const ClampingScrollPhysics(),
                    scrollDirection: Axis.vertical,
                    padding: const EdgeInsets.all(0),
                    itemCount: model.data!.length,
                    itemBuilder: (context, index) {
                      return BuildPicture(
                          model: model.data![model.data!.length - 1 - index]);
                    },
                  ),
                );
              }

              return const Center(
                child: CircularProgressIndicator(),
              );
            },
          ),
        if (currentItem == dropDownValue[1])
          FutureBuilder(
            future: APIService.getPostsByNoElderlyInvolved(),
            builder: (
              BuildContext context,
              AsyncSnapshot<List<PostResponseModel>?> model,
            ) {
              if (model.hasData) {
                return Expanded(
                  flex: 2,
                  child: ListView.builder(
                    controller: _scrollController,
                    shrinkWrap: true,
                    physics: const ClampingScrollPhysics(),
                    scrollDirection: Axis.vertical,
                    padding: const EdgeInsets.all(0),
                    itemCount: model.data!.length,
                    itemBuilder: (context, index) {
                      return BuildPicture(
                          model: model.data![model.data!.length - 1 - index]);
                    },
                  ),
                );
              }

              return const Center(
                child: CircularProgressIndicator(),
              );
            },
          ),
      ],
    );
  }
}
