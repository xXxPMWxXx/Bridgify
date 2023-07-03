import 'package:bridgify/accessories/profile/user_avatar.dart';
import 'package:flutter/material.dart';

class BuildContactAvatar extends StatefulWidget {
  final String name;
  final String fileName;
  const BuildContactAvatar({
    Key? key,
    required this.name,
    required this.fileName,
  }) : super(key: key);

  @override
  _BuildContactAvatarState createState() => _BuildContactAvatarState();
}

class _BuildContactAvatarState extends State<BuildContactAvatar> {
  // get filename => filename;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 20.0),
      child: Column(
        children: [
          UserAvatar(
            filename: widget.fileName,
            radius: 35,
          ),
          const SizedBox(
            height: 5,
          ),
          Text(
            widget.name,
            style: const TextStyle(color: Colors.white, fontSize: 12),
          )
        ],
      ),
    );
  }
}
  
  
  // Padding BuildContactAvatar(String name, String filename) {
    
  // }