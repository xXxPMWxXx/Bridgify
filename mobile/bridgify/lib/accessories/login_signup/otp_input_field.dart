import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class OTPInputField extends StatelessWidget {
  const OTPInputField({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 50.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          CustomField(),
          CustomField(),
          CustomField(),
          CustomField(),
        ],
      ),
    );
  }
}

class CustomField extends StatelessWidget {
  const CustomField({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 75,
      width: 60,
      // child: FormHelper.inputFieldWidget(
      //   context,
      //   "",
      //   "",
      //   (onValidateVal) {
      //     if (onValidateVal?.isEmpty) {
      //       return "Empty Field detected";
      //     }

      //     return null;
      //   },
      //   (onSavedVal) => {
      //     // passwordLogin = onSavedVal,
      //   },
      //   onChange: (value) {
      //     if (value.length == 1) {
      //       FocusScope.of(context).nextFocus();
      //     }
      //   },
      //   paddingRight: 0,
      //   paddingLeft: 0,
      //   initialValue: "",
      //   isNumeric: true,
      //   fontSize: 30,
      //   textColor: Colors.black.withOpacity(0.7),
      //   hintColor: Colors.grey.withOpacity(0.7),
      //   contentPadding: 20,
      //   backgroundColor: Colors.grey.shade100,
      //   borderFocusColor: HexColor("D3D3D3"),
      //   borderColor: HexColor("E0E0E0"),
      //   borderRadius: 15.0,
      //   borderErrorColor: Colors.white,
      //   errorBorderWidth: 0,
      //   focusedErrorBorderWidth: 0,
      //   borderFocusedErrorColor: Colors.white,
      // )
      child: TextFormField(
        keyboardType: TextInputType.number,
        onChanged: (value) {
          if (value.length == 1) {
            FocusScope.of(context).nextFocus();
          }
          if (value.isEmpty) {
            FocusScope.of(context).previousFocus();
          }
        },
        textAlign: TextAlign.center,
        inputFormatters: [
          LengthLimitingTextInputFormatter(1),
          FilteringTextInputFormatter.digitsOnly
        ],
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.grey.shade100,
          focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(15),
              borderSide: BorderSide(
                color: HexColor("D3D3D3"),
              )),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide(
              color: HexColor("E0E0E0"),
            ),
          ),
        ),
      ),
    );
  }
}
