// import 'package:bridgify/accessories/login_signup/otp_input_field.dart';
// import 'package:flutter/material.dart';
// import 'package:snippet_coder_utils/hex_color.dart';

// class OTPPage extends StatefulWidget {
//   const OTPPage({Key? key}) : super(key: key);

//   @override
//   _OTPPageState createState() => _OTPPageState();
// }

// class _OTPPageState extends State<OTPPage> {
//   bool isAPICallProcess = false;

//   @override
//   Widget build(BuildContext context) {
//     var heightScreen = MediaQuery.of(context).size.height;
//     return Scaffold(
//         body: SingleChildScrollView(
//       child: Center(
//         child: Column(
//           children: [
//             SizedBox(height: heightScreen * 0.07),
//             // Image.asset(''),
//             const Text(
//               'OTP VERIFICATION',
//               style: TextStyle(
//                 fontSize: 28,
//               ),
//             ),
//             SizedBox(height: heightScreen * 0.02),
//             const Text(
//               'Enter verification code sent to your\nemail address',
//               style: TextStyle(fontSize: 17, color: Colors.grey),
//               textAlign: TextAlign.center,
//             ),
//             // SizedBox(
//             //   height: heightScreen * 0.04,
//             // ),
//             const OTPInputField(),
//             SizedBox(
//               child: ElevatedButton(
//                 onPressed: () {},
//                 child: Text(
//                   "VERIFY",
//                   style: TextStyle(fontSize: 18),
//                 ),
//                 style: ElevatedButton.styleFrom(
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(15),
//                   ),
//                   backgroundColor: HexColor("207A35"),
//                 ),
//               ),
//             ),
//             SizedBox(height: heightScreen * 0.02),
//             Text(
//               'Resent Code?',
//               style: TextStyle(color: Colors.grey, fontSize: 17),

//             )
//           ],
//         ),
//       ),
//     ));
//   }
// }
import 'package:flutter/material.dart';
import 'package:pinput/pinput.dart';

class OTPPage extends StatefulWidget {
  const OTPPage({Key? key}) : super(key: key);

  @override
  _OTPPageState createState() => _OTPPageState();
}

class _OTPPageState extends State<OTPPage> {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                height: height * 0.07,
              ),
              const Text(
                'Verification Code',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  fontSize: 32.0,
                ),
              ),
              const SizedBox(
                height: 8.0,
              ),
              RichText(
                text: TextSpan(
                  children: [
                    const TextSpan(
                      text:
                          'Please enter the verification code that we have sent to your email ',
                      style: TextStyle(
                        fontSize: 14.0,
                        color: Color(0xff808d9e),
                        fontWeight: FontWeight.w400,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'abcd@gmail.com ',
                      style: TextStyle(
                        fontSize: 14.0,
                        color: Colors.blue.shade900,
                        fontWeight: FontWeight.w400,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: height * 0.1,
              ),

              /// pinput package we will use here
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: SizedBox(
                  width: width,
                  child: Pinput(
                    length: 4,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    defaultPinTheme: PinTheme(
                      height: 60.0,
                      width: 60.0,
                      textStyle: const TextStyle(
                        fontSize: 24.0,
                        color: Colors.black,
                        fontWeight: FontWeight.w700,
                      ),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white,
                        border: Border.all(
                          color: Colors.black.withOpacity(0.5),
                          width: 1.0,
                        ),
                      ),
                    ),
                    focusedPinTheme: PinTheme(
                      height: 60.0,
                      width: 60.0,
                      textStyle: const TextStyle(
                        fontSize: 24.0,
                        color: Colors.black,
                        fontWeight: FontWeight.w700,
                      ),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white,
                        border: Border.all(
                          color: Colors.black,
                          width: 1.0,
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(
                height: 16.0,
              ),
              GestureDetector(
                onTap: () {},
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Didnt Recieve the OTP? ",
                      style: TextStyle(color: Colors.grey),
                    ),
                    Text(
                      "Resend",
                      style: TextStyle(
                          color: Colors.blue.shade900,
                          fontWeight: FontWeight.w400),
                    )
                  ],
                ),
              ),

              /// Continue Button
              const Expanded(child: SizedBox()),
              InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(30.0),
                child: Ink(
                  height: 55.0,
                  width: width,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30.0),
                    color: Colors.black,
                  ),
                  child: const Center(
                    child: Text(
                      'Continue',
                      style: TextStyle(
                        fontSize: 15.0,
                        color: Colors.white,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(
                height: 16.0,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
