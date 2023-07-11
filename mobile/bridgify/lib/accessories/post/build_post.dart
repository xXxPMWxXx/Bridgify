import 'package:bridgify/accessories/post/picture_carousel.dart';
import 'package:bridgify/accessories/post/picture_single.dart';
import 'package:flutter/material.dart';

class BuildPost extends StatefulWidget {
  const BuildPost({super.key});

  @override
  _BuildPostState createState() => _BuildPostState();
}

class _BuildPostState extends State<BuildPost> {
  List<String> images = [
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=640",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940",
    "https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=200&w=1260",
  ];
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(left: 10, right: 10, top: 45),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Stories",
            style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.grey[500]),
          ),
          SizedBox(
            height: 60,
          ),
          Container(
            height: 2,
            color: Colors.grey[300],
            margin: EdgeInsets.symmetric(horizontal: 30),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.only(top: 8),
              children: [
                PictureCarousel(images: images),
                PictureCarousel(images: images),
                PictureCarousel(
                  images: images,
                )
                // PictureSingle(
                //     urlImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=640",
                //     //"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=940"
                //     ),
                // PictureSingle(
                //     urlImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940",
                //     //"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=640"
                //     ),
                // PictureSingle(
                //     urlImage: "https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=200&w=1260",
                //     //"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=640"
                //     ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
