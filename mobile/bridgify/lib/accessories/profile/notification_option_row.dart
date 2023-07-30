import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class BuildNotificationOptionRow extends StatefulWidget {
  final String title;
  const BuildNotificationOptionRow({
    Key? key,
    required this.title,
  }) : super(key: key);

  @override
  _BuildNotificationOptionRowState createState() =>
      _BuildNotificationOptionRowState();
}

class _BuildNotificationOptionRowState
    extends State<BuildNotificationOptionRow> {
  bool currentState = true;
  @override
  Widget build(BuildContext context) {
    // currentState = widget.isActive;
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(
        widget.title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.grey.shade600,
        ),
      ),
      Transform.scale(
        scale: 0.7,
        child: CupertinoSwitch(
            value: currentState,
            activeColor: HexColor('#36CF59'),
            onChanged: (bool? value) {
              setState(() {
                currentState = value ?? false;
              });
            }),
      ),
    ]);
  }
}
