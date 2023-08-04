import 'package:bridgify/accessories/post/post_text.dart';
import 'package:bridgify/config.dart';
import 'package:flutter/material.dart';

class PictureSingle extends StatelessWidget {
  final String image;
  final String description;
  final String activity;
  final List<dynamic>? elderlyInvolved;
  const PictureSingle(
      {super.key,
      required this.image,
      required this.description,
      required this.activity,
      required this.elderlyInvolved});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.grey.withOpacity(0.1),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PostText(text: "Bridgify", fontSize: 17),
                  PostText(
                    text: "Singapore",
                    fontSize: 12,
                  ),
                ],
              ),
              Icon(Icons.more_vert)
            ],
          ),
          const SizedBox(height: 15),
          SizedBox(
            height: MediaQuery.of(context).size.width - 70,
            width: double.infinity,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                color: Colors.black45,
                // boxShadow: [
                //   BoxShadow(
                //     color: Colors.black.withOpacity(0.3),
                //     spreadRadius: 0.5,
                //     blurRadius: 20,
                //     offset: Offset(0, 4),
                //   ),
                // ],
                image: DecorationImage(
                  fit: BoxFit.contain,
                  image: Image.network(
                          'http://${Config.apiURL}/images/post/$image')
                      .image,
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          if (elderlyInvolved!.isNotEmpty)
            if (elderlyInvolved!.length == 1)
              PostText(
                text:
                    "${elderlyInvolved![0].substring(0, elderlyInvolved![0].length - 6).split(' ')[0]} is having fun",
                fontSize: 16,
              ),
          if (elderlyInvolved!.length == 2)
            PostText(
              text:
                  "${elderlyInvolved![0].substring(0, elderlyInvolved![0].length - 6).split(' ')[0]}, ${elderlyInvolved![1].substring(0, elderlyInvolved![1].length - 6).split(' ')[0]} are having fun",
              fontSize: 16,
            ),
          if (elderlyInvolved!.length >= 2)
            PostText(
              text:
                  "${elderlyInvolved![0].substring(0, elderlyInvolved![0].length - 6).split(' ')[0]}, ${elderlyInvolved![1].substring(0, elderlyInvolved![0].length - 6).split(' ')[0]} and ${elderlyInvolved!.length - 1} others are having fun",
              fontSize: 16,
            ),
          const SizedBox(
            height: 15,
          ),
          PostText(
            text: "$description #${activity.replaceAll(' ', '_')}",
            fontSize: 16,
          ),
          const SizedBox(
            height: 10,
          )
        ],
      ),
    );
  }
}
