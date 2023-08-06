import 'dart:io';

import 'package:bridgify/accessories/post/post_text.dart';
import 'package:flutter/material.dart';

class DialogPictureSingle extends StatelessWidget {
  final String image;
  final String description;
  final String activity;
  const DialogPictureSingle(
      {super.key,
      required this.image,
      required this.description,
      required this.activity});

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
                // boxShadow: [
                // BoxShadow(
                //   color: Colors.black.withOpacity(0.3),
                //   spreadRadius: 2,
                //   blurRadius: 20,
                //   offset: Offset(0, 10),
                // ),
                // ],
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: Image.file(File(image)).image,
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          PostText(
            text: "$description #${activity.trim().replaceAll(' ', '_')}",
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
