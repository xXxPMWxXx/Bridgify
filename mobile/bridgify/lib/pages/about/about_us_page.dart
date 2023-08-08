import 'package:bridgify/services/api_service.dart';
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
        const Text(
          'About Us',
          style: TextStyle(color: Colors.white, fontSize: 45.0),
        ),
        SizedBox(
          width: 100.0,
          child: Divider(color: HexColor('#EDFDF9')),
        ),
      ],
    );

    final topContent = Stack(
      children: <Widget>[
        Container(
            padding: const EdgeInsets.only(left: 10.0),
            height: MediaQuery.of(context).size.height * 0.35,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: Image.asset('images/drawer.png').image,
                fit: BoxFit.fitWidth,
              ),
            )),
        Container(
          height: MediaQuery.of(context).size.height * 0.35,
          padding: const EdgeInsets.all(40.0),
          width: MediaQuery.of(context).size.width,
          decoration: const BoxDecoration(
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
            child: FutureBuilder(
              future: APIService.getUserProfile(),
              builder: (BuildContext context, AsyncSnapshot<Object> model) {
                var userProfileData = model.data as Map<String, dynamic>?;
                if (model.hasData) {
                  if (userProfileData?["accRole"] == "Admin") {
                    return IconButton(
                      onPressed: () async {
                        Navigator.pushNamedAndRemoveUntil(
                          context,
                          '/adminHome',
                          (Route<dynamic> route) {
                            return route.settings.name == '/adminHome';
                          },
                        );
                      },
                      icon: const Icon(
                        Icons.arrow_back_ios,
                        color: Colors.white,
                      ),
                    );
                  }
                }
                //public user
                return IconButton(
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
                    color: HexColor('#207A35'),
                  ),
                );
              },
            ),
          ),
        )
      ],
    );

    const firstPara = Text(
      'Welcome to Bridgify! We are a passionate team dedicated to redefining family connections and elderly care in Singapore.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );
    const secondPara = Text(
      'With the growing elderly population and the challenges of modern life, we saw a need for a solution that brings families closer together.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );

    const thirdPara = Text(
      'Our mission is clear: to empower families by keeping them effortlessly connected with their elderly loved ones. Through our innovative solution, caregivers and care centers provide real-time updates on health, activities, and well-being, ensuring you\'re always in the know and your loved ones are always cared for.',
      style: TextStyle(fontSize: 18.0),
      textAlign: TextAlign.center,
    );

    final bottomContent = Container(
      width: MediaQuery.of(context).size.width,
      padding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 40.0),
      child: const Center(
        child: Column(
          children: <Widget>[
            firstPara,
            SizedBox(
              height: 15,
            ),
            secondPara,
            SizedBox(
              height: 15,
            ),
            thirdPara
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
