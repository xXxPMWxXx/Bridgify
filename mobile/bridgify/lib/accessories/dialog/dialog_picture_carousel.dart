import 'dart:io';

import 'package:bridgify/accessories/post/post_text.dart';
import 'package:flutter/material.dart';

class DialogPictureCarousel extends StatefulWidget {
  final List<String> images;
  final String description;
  final String activity;
  final int imagesCount;
  const DialogPictureCarousel({
    Key? key,
    required this.images,
    required this.description,
    required this.activity,
    required this.imagesCount,
  }) : super(key: key);

  @override
  _PictureCarouselState createState() => _PictureCarouselState();
}

class _PictureCarouselState extends State<DialogPictureCarousel> {
  int currentIndex = 0;
  int indicatorCount = 0;
  final PageController controller = PageController();

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
            child: PageView.builder(
              itemCount: widget.imagesCount,
              controller: controller,
              onPageChanged: (index) {
                setState(() {
                  currentIndex = index % widget.imagesCount;
                });
              },
              itemBuilder: (context, index) {
                widget.images[index % widget.imagesCount];
                return Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    // boxShadow: [
                    //   BoxShadow(
                    //     color: Colors.black.withOpacity(0.3),
                    //     spreadRadius: 2,
                    //     blurRadius: 20,
                    //     offset: Offset(0, 10),
                    //   ),
                    // ],
                    image: DecorationImage(
                      fit: BoxFit.cover,
                      image: Image.file(
                        File(
                          widget.images[index % widget.imagesCount],
                        ),
                      ).image,
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (indicatorCount = 0;
                  indicatorCount < widget.imagesCount;
                  indicatorCount++)
                buildIndicator(currentIndex == indicatorCount)
            ],
          ),
          const SizedBox(
            height: 5,
          ),
          PostText(
            text: "${widget.description} #${widget.activity}",
            fontSize: 16,
          ),
          const SizedBox(
            height: 10,
          )
        ],
      ),
    );
  }

  Widget buildIndicator(bool isSelected) {
    // indicatorCount++;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: Container(
        height: isSelected ? 8 : 8,
        width: isSelected ? 8 : 8,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: isSelected ? Colors.black : Colors.grey,
        ),
      ),
    );
  }
}
