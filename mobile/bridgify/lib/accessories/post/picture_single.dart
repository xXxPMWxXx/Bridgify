import 'package:bridgify/accessories/post/post_text.dart';
import 'package:bridgify/config.dart';
import 'package:flutter/material.dart';

class PictureSingle extends StatelessWidget {
  final String image;
  final String description;
  final String activity;
  const PictureSingle(
      {super.key,
      required this.image,
      required this.description,
      required this.activity});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 8),
      padding: EdgeInsets.symmetric(horizontal: 18, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.grey.withOpacity(0.1),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
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
          SizedBox(height: 15),
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
                          'http://' + Config.apiURL + '/images/post/' + image)
                      .image,
                ),
              ),
            ),
          ),
          SizedBox(
            height: 15,
          ),
          PostText(
            text: description + " #${activity}",
            fontSize: 16,
          ),
          SizedBox(
            height: 10,
          )
        ],
      ),
    );
  }
}
