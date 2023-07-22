import 'package:bridgify/accessories/dialog/current_status_view.dart';
import 'package:bridgify/accessories/elderly/elderly_avatar.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:flutter/material.dart';

class BuildElderlyAvatar extends StatefulWidget {
  final ElderlyResponseModel model;
  const BuildElderlyAvatar({
    Key? key,
    required this.model,
  }) : super(key: key);

  @override
  _BuildElderlyAvatarState createState() => _BuildElderlyAvatarState();
}

class _BuildElderlyAvatarState extends State<BuildElderlyAvatar> {
  // get filename => filename;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 20.0),
      child: GestureDetector(
        onTap: () {
          showDialog(
              context: context,
              builder: (context) {
                return Dialog(
                  backgroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: CurrentStatus(model: widget.model),
                );
              });
        },
        child: Column(
          children: [
            ElderlyAvatar(
              filename: widget.model.photo!,
              radius: 31,
            ),
            const SizedBox(
              height: 5,
            ),
            Text(
              widget.model.name!,
              style: const TextStyle(color: Colors.white, fontSize: 12),
            )
          ],
        ),
      ),
    );
  }
}
  
  
  // Padding BuildElderlyAvatar(String name, String filename) {
    
  // }