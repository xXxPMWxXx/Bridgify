import 'package:flutter/material.dart';

class BackButton extends StatefulWidget {
  const BackButton({super.key});

  @override
  _BackButtonState createState() => _BackButtonState();
}

class _BackButtonState extends State<BackButton> {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      padding: EdgeInsets.zero,
      alignment: Alignment.centerLeft,
      icon: const Icon(
        Icons.arrow_drop_down,
        color: Colors.black,
      ),
      onPressed: () {},
    );
  }
}
