import 'package:bridgify/accessories/fadeAnimation.dart';
import 'package:flutter/material.dart';

class BackgroundWidget extends StatefulWidget {
  const BackgroundWidget({super.key});

  @override
  _BackgroundWidgetState createState() => _BackgroundWidgetState();
}

class _BackgroundWidgetState extends State<BackgroundWidget> {
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      width: double.infinity,
      curve: Curves.fastLinearToSlowEaseIn,
      duration: const Duration(milliseconds: 1000),
      decoration: const BoxDecoration(
          gradient: LinearGradient(begin: Alignment.topCenter, colors: [
        // Color(0xFFF75C5C),
        // Color(0xFFFFCE95),
        Color.fromRGBO(32, 122, 53, 0.729),
        Color.fromRGBO(35, 50, 38, 30),
      ])),
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(
                  height: 100.0,
                ),
                FadeAnimation(
                    1,
                    Text(
                      "Welcome to Bridgify",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 30,
                          fontWeight: FontWeight.w700,
                          fontFamily: "Sofia"),
                    )),
                SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
