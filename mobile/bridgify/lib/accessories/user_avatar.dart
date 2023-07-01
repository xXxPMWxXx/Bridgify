import 'package:flutter/material.dart';

class UserAvatar extends StatelessWidget {
  final String filename;
  final double radius;
  const UserAvatar({
    super.key,
    required this.filename,
    required this.radius,
  });

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      // radius: radius,
      // backgroundColor: Colors.white,
      // child: CircleAvatar(
      radius: radius,
      backgroundImage: Image.asset('images/$filename').image,
      // ),
    );
  }
}
