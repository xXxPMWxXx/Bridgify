import 'package:bridgify/config.dart';
import 'package:flutter/material.dart';

class ElderlyAvatar extends StatelessWidget {
  final String filename;
  final double radius;
  const ElderlyAvatar({
    super.key,
    required this.filename,
    required this.radius,
  });

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: radius,
      backgroundImage: Image.network(
        'http://${Config.apiURL}/images/trained_face/$filename',
        fit: BoxFit.contain,
      ).image,
      // ),
    );
  }
}
