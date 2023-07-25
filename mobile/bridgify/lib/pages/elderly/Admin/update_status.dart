import 'package:bridgify/models/elderly_response_model.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';

class UpdateStatus extends StatefulWidget {
  final ElderlyResponseModel model;
  const UpdateStatus({Key? key, required this.model}) : super(key: key);

  @override
  State<UpdateStatus> createState() => _UpdateStatusState();
}

class _UpdateStatusState extends State<UpdateStatus> {
  Status? currentStatus;
  @override
  void initState() {
    currentStatus = widget.model.status;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Current Status Update',
            style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: const IconThemeData(color: Colors.black),
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(15),
        children: [
          FormHelper.inputFieldWidget(
            context,
            'current activity',
            'Current Activity',
            (onValidateVal) {},
            (onSavedVal) {
              if (onSavedVal == "") {
                currentStatus!.current_activity =
                    currentStatus!.current_activity;
              } else {
                currentStatus!.current_activity = onSavedVal;
              }
            },
            paddingRight: 0,
            paddingLeft: 0,
            initialValue: "",
            obscureText: false,
            prefixIcon: const Icon(Icons.run_circle_outlined),
            showPrefixIcon: true,
            prefixIconColor: Colors.black.withOpacity(0.5),
            textColor: Colors.grey,
            hintColor: Colors.grey.withOpacity(0.7),
            borderFocusColor: Colors.white,
            borderColor: Colors.white,
            borderRadius: 0,
            borderErrorColor: Colors.white,
            errorBorderWidth: 0,
            focusedErrorBorderWidth: 0,
            borderFocusedErrorColor: Colors.white,
          ),
          const SizedBox(height: 20),
          FormHelper.inputFieldWidget(
            context,
            'current temp',
            'Current Temp',
            (onValidateVal) {},
            (onSavedVal) {
              if (onSavedVal == "") {
                currentStatus!.current_temp = currentStatus!.current_temp;
              } else {
                currentStatus!.current_temp = onSavedVal;
              }
            },
            paddingRight: 0,
            paddingLeft: 0,
            initialValue: "",
            obscureText: false,
            prefixIcon: const Icon(Icons.run_circle_outlined),
            showPrefixIcon: true,
            prefixIconColor: Colors.black.withOpacity(0.5),
            textColor: Colors.grey,
            hintColor: Colors.grey.withOpacity(0.7),
            borderFocusColor: Colors.white,
            borderColor: Colors.white,
            borderRadius: 0,
            borderErrorColor: Colors.white,
            errorBorderWidth: 0,
            focusedErrorBorderWidth: 0,
            borderFocusedErrorColor: Colors.white,
          ),
          const SizedBox(height: 20),
          FormHelper.inputFieldWidget(
            context,
            'condition',
            'Condition',
            (onValidateVal) {},
            (onSavedVal) {
              if (onSavedVal == "") {
                currentStatus!.condition = currentStatus!.condition;
              } else {
                currentStatus!.condition = onSavedVal;
              }
            },
            paddingRight: 0,
            paddingLeft: 0,
            initialValue: "",
            obscureText: false,
            prefixIcon: const Icon(Icons.run_circle_outlined),
            showPrefixIcon: true,
            prefixIconColor: Colors.black.withOpacity(0.5),
            textColor: Colors.grey,
            hintColor: Colors.grey.withOpacity(0.7),
            borderFocusColor: Colors.white,
            borderColor: Colors.white,
            borderRadius: 0,
            borderErrorColor: Colors.white,
            errorBorderWidth: 0,
            focusedErrorBorderWidth: 0,
            borderFocusedErrorColor: Colors.white,
          ),
          const SizedBox(height: 20),
          FormHelper.inputFieldWidget(
            context,
            'condition description',
            'Condition Description',
            (onValidateVal) {},
            (onSavedVal) {
              if (onSavedVal == "") {
                currentStatus!.condition_description =
                    currentStatus!.condition_description;
              } else {
                currentStatus!.condition_description = onSavedVal;
              }
            },
            paddingRight: 0,
            paddingLeft: 0,
            initialValue: "",
            obscureText: false,
            prefixIcon: const Icon(Icons.run_circle_outlined),
            showPrefixIcon: true,
            prefixIconColor: Colors.black.withOpacity(0.5),
            textColor: Colors.grey,
            hintColor: Colors.grey.withOpacity(0.7),
            borderFocusColor: Colors.white,
            borderColor: Colors.white,
            borderRadius: 0,
            borderErrorColor: Colors.white,
            errorBorderWidth: 0,
            focusedErrorBorderWidth: 0,
            borderFocusedErrorColor: Colors.white,
          ),
          const SizedBox(height: 20),
          FormHelper.inputFieldWidget(
            context,
            'condition description',
            'Condition Description',
            (onValidateVal) {},
            (onSavedVal) {
              if (onSavedVal == "") {
                currentStatus!.condition_description =
                    currentStatus!.condition_description;
              } else {
                currentStatus!.condition_description = onSavedVal;
              }
            },
            paddingRight: 0,
            paddingLeft: 0,
            initialValue: "",
            obscureText: false,
            prefixIcon: const Icon(Icons.run_circle_outlined),
            showPrefixIcon: true,
            prefixIconColor: Colors.black.withOpacity(0.5),
            textColor: Colors.grey,
            hintColor: Colors.grey.withOpacity(0.7),
            borderFocusColor: Colors.white,
            borderColor: Colors.white,
            borderRadius: 0,
            borderErrorColor: Colors.white,
            errorBorderWidth: 0,
            focusedErrorBorderWidth: 0,
            borderFocusedErrorColor: Colors.white,
          ),
        ],
      ),
      bottomSheet: Container(
        width: double.infinity,
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
        child: ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.all(15),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10))),
          child: const Text('Save'),
        ),
      ),
    );
  }
}
