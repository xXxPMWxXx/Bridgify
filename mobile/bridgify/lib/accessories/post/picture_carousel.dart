import 'package:bridgify/accessories/post/post_text.dart';
import 'package:bridgify/config.dart';
import 'package:flutter/material.dart';

class PictureCarousel extends StatefulWidget {
  List<String> images;
  String description;
  String activity;
  PictureCarousel(
      {Key? key,
      required this.images,
      required this.description,
      required this.activity})
      : super(key: key);

  @override
  _PictureCarouselState createState() => _PictureCarouselState();
}

class _PictureCarouselState extends State<PictureCarousel> {
  int currentIndex = 0;
  final PageController controller = PageController();

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
            child: PageView.builder(
              controller: controller,
              onPageChanged: (index) {
                setState(() {
                  currentIndex = index % widget.images.length;
                });
              },
              itemBuilder: (context, index) {
                widget.images[index % widget.images.length];
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
                      image: Image.network('http://' +
                              Config.apiURL +
                              '/images/post/' +
                              widget.images[index % widget.images.length])
                          .image,
                    ),
                  ),
                );
              },
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (var i = 0; i < widget.images.length; i++)
                buildIndicator(currentIndex == i)
            ],
          ),
          SizedBox(
            height: 5,
          ),
          PostText(
            text: widget.description + " #${widget.activity}",
            fontSize: 16,
          ),
          SizedBox(
            height: 10,
          )
        ],
      ),
    );
  }

  Widget buildIndicator(bool isSelected) {
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
