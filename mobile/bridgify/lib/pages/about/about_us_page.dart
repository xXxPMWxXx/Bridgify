import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final topContentText = Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        Text(
          'About Us',
          style: TextStyle(color: Colors.white, fontSize: 45.0),
        ),
        Container(
          width: 100.0,
          child: new Divider(color: HexColor('#EDFDF9')),
        ),
      ],
    );

    final topContent = Stack(
      children: <Widget>[
        Container(
            padding: EdgeInsets.only(left: 10.0),
            height: MediaQuery.of(context).size.height * 0.35,
            decoration: new BoxDecoration(
              image: new DecorationImage(
                image: Image.asset('images/drawer.png').image,
                fit: BoxFit.fitWidth,
              ),
            )),
        Container(
          height: MediaQuery.of(context).size.height * 0.35,
          padding: EdgeInsets.all(40.0),
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.bottomCenter,
              colors: [
                Color.fromRGBO(48, 132, 67, 0.722),
                Color.fromRGBO(48, 132, 67, 0.6),
              ],
            ),
          ),
          child: Center(
            child: topContentText,
          ),
        ),
        Positioned(
          left: 8.0,
          top: 60.0,
          child: InkWell(
            onTap: () {
              Navigator.pop(context);
            },
            child: IconButton(
              onPressed: () async {
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  '/home',
                  (Route<dynamic> route) {
                    return route.settings.name == '/home';
                  },
                );
              },
              icon: Icon(
                Icons.arrow_back_ios,
                color: HexColor('#FFFFFF'),
              ),
            ),
          ),
        )
      ],
    );

    final firstPara = Text(
      'Welcome to Bridgify! We are a passionate team dedicated to redefining family connections and elderly care in Singapore.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );
    final secondPara = Text(
      'With the growing elderly population and the challenges of modern life, we saw a need for a solution that brings families closer together.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );

    final thirdPara = Text(
      'Our mission is clear: to empower families by keeping them effortlessly connected with their elderly loved ones. Through our innovative solution, caregivers and care centers provide real-time updates on health, activities, and well-being, ensuring you\'re always in the know and your loved ones are always cared for.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );

    final bottomContent = Container(
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.all(40.0),
      child: Center(
        child: Column(
          children: <Widget>[
            firstPara,
            SizedBox(
              height: 30,
            ),
            secondPara
          ],
        ),
      ),
    );

    return Scaffold(
      body: Column(
        children: <Widget>[topContent, bottomContent],
      ),
    );
  }
}
