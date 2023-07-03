import 'package:bridgify/accessories/login_signup/otp_input_field.dart';
import 'package:flutter/material.dart';

class OTPPage extends StatefulWidget {
  const OTPPage({Key? key}) : super(key: key);

  @override
  _OTPPageState createState() => _OTPPageState();
}

class _OTPPageState extends State<OTPPage> {
  bool isAPICallProcess = false;

  @override
  Widget build(BuildContext context) {
    var heightScreen = MediaQuery.of(context).size.height;
    return Scaffold(
        body: SingleChildScrollView(
      child: Center(
        child: Column(
          children: [
            SizedBox(height: heightScreen * 0.07),
            // Image.asset(''),
            const Text(
              'OTP VERIFICATION',
              style: TextStyle(
                fontSize: 28,
              ),
            ),
            SizedBox(height: heightScreen * 0.02),
            const Text(
              'Enter verification code sent to your\nemail address',
              style: TextStyle(fontSize: 17, color: Colors.grey),
              textAlign: TextAlign.center,
            ),
            // SizedBox(
            //   height: heightScreen * 0.04,
            // ),
            const OTPInputField(),
            SizedBox(
                child: ElevatedButton(
                    onPressed: () {},
                    child: Text(
                      "VERIFY",
                      style: TextStyle(fontSize: 18),
                    )))
          ],
        ),
      ),
    ));
  }
}
