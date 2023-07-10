import 'package:flutter/material.dart';

class PictureCarousel extends StatefulWidget {
  List<String> images;
  PictureCarousel({Key? key, required this.images}) : super(key: key);

  @override
  _PictureCarouselState createState() => _PictureCarouselState();
}

class _PictureCarouselState extends State<PictureCarousel> {
  int currentIndex = 0;
  final PageController controller = PageController();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
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
              return Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3),
                      spreadRadius: 2,
                      blurRadius: 20,
                      offset: Offset(0, 10),
                    ),
                  ],
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: Image.network(
                            widget.images[index % widget.images.length])
                        .image,
                  ),
                ),
              );
            },
          ),
        ),
        SizedBox(
          height: 20,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            for (var i = 0; i < widget.images.length; i++)
              buildIndicator(currentIndex == i)
          ],
        ),
      ],
    );
  }

  Widget buildIndicator(bool isSelected) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: Container(
        height: isSelected ? 10 : 10,
        width: isSelected ? 10 : 10,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: isSelected ? Colors.black : Colors.grey,
        ),
      ),
    );
  }
}
