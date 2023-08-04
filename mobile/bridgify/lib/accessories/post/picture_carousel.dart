import 'package:bridgify/accessories/post/post_text.dart';
import 'package:bridgify/config.dart';
import 'package:flutter/material.dart';

class PictureCarousel extends StatefulWidget {
  final List<String> images;
  final String description;
  final String activity;
  final List<dynamic>? elderlyInvolved;
  const PictureCarousel(
      {Key? key,
      required this.images,
      required this.description,
      required this.activity,
      required this.elderlyInvolved})
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
              itemCount: widget.images.length,
              controller: controller,
              onPageChanged: (index) {
                setState(() {
                  currentIndex = index % widget.images.length;
                });
              },
              itemBuilder: (context, index) {
                return Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    color: Colors.black45,
                    // boxShadow: [
                    //   BoxShadow(
                    //     color: Colors.black.withOpacity(0.3),
                    //     spreadRadius: 2,
                    //     blurRadius: 20,
                    //     offset: Offset(0, 10),
                    //   ),
                    // ],
                    image: DecorationImage(
                      fit: BoxFit.contain,
                      image: Image.network(
                              'http://${Config.apiURL}/images/post/${widget.images[index % widget.images.length]}')
                          .image,
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
              for (var i = 0; i < widget.images.length; i++)
                buildIndicator(currentIndex == i)
            ],
          ),
          const SizedBox(
            height: 5,
          ),
          if (widget.elderlyInvolved!.isNotEmpty)
            if (widget.elderlyInvolved!.length == 1)
              PostText(
                text:
                    "${widget.elderlyInvolved![0].substring(0, widget.elderlyInvolved![0].length - 6).split(' ')[0]} is having fun",
                fontSize: 16,
              ),
          if (widget.elderlyInvolved!.length == 2)
            PostText(
              text:
                  "${widget.elderlyInvolved![0].substring(0, widget.elderlyInvolved![0].length - 6).split(' ')[0]}, ${widget.elderlyInvolved![1].substring(0, widget.elderlyInvolved![1].length - 6).split(' ')[0]} are having fun",
              fontSize: 16,
            ),
          if (widget.elderlyInvolved!.length >= 2)
            PostText(
              text:
                  "${widget.elderlyInvolved![0].substring(0, widget.elderlyInvolved![0].length - 6).split(' ')[0]}, ${widget.elderlyInvolved![1].substring(0, widget.elderlyInvolved![1].length - 6).split(' ')[0]} and ${widget.elderlyInvolved!.length - 1} others are having fun",
              fontSize: 16,
            ),
          const SizedBox(
            height: 5,
          ),
          PostText(
            text:
                "${widget.description} #${widget.activity.replaceAll(' ', '_')}",
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
