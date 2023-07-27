import 'dart:io';

import 'package:bridgify/config.dart';
import 'package:bridgify/models/elderly_request_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';

class UpdateStatus extends StatefulWidget {
  final ElderlyRequestModel model;
  const UpdateStatus({Key? key, required this.model}) : super(key: key);

  @override
  State<UpdateStatus> createState() => _UpdateStatusState();
}

class _UpdateStatusState extends State<UpdateStatus> {
  Status? currentStatus;
  final _statusPageController = PageController();
  int pageIndex = 0;
  bool awakenStatus = false;
  bool takenMedsStatus = false;
  List<TextEditingController> listController = [TextEditingController()];
  List<String?> statusMedication = [];

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
      body: Container(
        clipBehavior: Clip.none,
        child: PageView(
          physics: const NeverScrollableScrollPhysics(),
          controller: _statusPageController,
          children: [
            medicationRequirements(context),
            buildStatusPage(context),
          ],
        ),
      ),
      bottomSheet: Container(
        width: double.infinity,
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
        child: ElevatedButton(
          onPressed: () {
            if (pageIndex == 0) {
              setState(() {
                pageIndex++;
              });
              _statusPageController.nextPage(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeIn);
            } else {
              _statusPageController.previousPage(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeIn);
            }
          },
          style: ElevatedButton.styleFrom(
              fixedSize: Size(
                MediaQuery.of(context).size.width,
                MediaQuery.of(context).size.height * 0.05,
              ),
              // padding: const EdgeInsets.all(15),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10))),
          child:
              pageIndex == 0 ? const Text('Update Status') : const Text('Save'),
        ),
      ),
    );
  }

  Widget demoElderlyRecordItem({required ElderlyRequestModel model}) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
              offset: const Offset(0, 5),
              color: Theme.of(context).primaryColor.withOpacity(.1),
              spreadRadius: 1,
              blurRadius: 2)
        ],
      ),
      child: Row(
        children: [
          //Change container to include elderly image
          SizedBox(
            height: 100,
            width: 85,
            child: Container(
              // padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration:
                  BoxDecoration(borderRadius: BorderRadius.circular(25)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.file(File(model.photo!)),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Elderly ID: ${model.id}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    'Name: ${model.name}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    'Date Of Birth: ${model.dob}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget buildSwitch({required Widget child, required String text}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          text,
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
        ),
        child,
      ],
    );
  }

  Widget buildStatusPage(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(15),
      children: [
        Row(
          children: [
            IconButton(
              onPressed: () {
                setState(() {
                  pageIndex--;
                });
                _statusPageController.previousPage(
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeIn);
              },
              icon: Icon(Icons.arrow_back_ios,
                  color: Color(0xFF27c1a9), size: 20),
            ),
            Text(
              "Current Status",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        demoElderlyRecordItem(model: widget.model),
        Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                buildSwitch(
                  child: CupertinoSwitch(
                      value: awakenStatus,
                      onChanged: (value) {
                        setState(() {
                          awakenStatus = value;
                          print(awakenStatus);
                        });
                      }),
                  text: 'Awake?',
                ),
                buildSwitch(
                  child: CupertinoSwitch(
                      value: takenMedsStatus,
                      onChanged: (value) {
                        setState(() {
                          takenMedsStatus = value;
                          print(takenMedsStatus);
                        });
                      }),
                  text: 'Taken Medicine?',
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.grey.shade200),
                ),
              ),
              child: FormHelper.inputFieldWidget(
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
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.grey.shade200),
                ),
              ),
              child: FormHelper.inputFieldWidget(
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
                prefixIcon: const Icon(Icons.thermostat_rounded),
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
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.grey.shade200),
                ),
              ),
              child: FormHelper.inputFieldWidget(
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
                prefixIcon: const Icon(Icons.wheelchair_pickup_rounded),
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
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.grey.shade200),
                ),
              ),
              child: FormHelper.inputFieldWidget(
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
                prefixIcon: const Icon(Icons.description_rounded),
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
            ),
          ],
        ),
      ],
    );
  }

  Widget medicationRequirements(BuildContext context) {
    return ListView(
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.all(15),
      children: [
        Padding(
          padding: const EdgeInsets.all(15),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Current Medication",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
              ),
              GestureDetector(
                onTap: () {
                  setState(() {
                    listController.add(TextEditingController());
                  });
                },
                child: Center(
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: const Color(0xFF444C60),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Row(
                      // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Add",
                          style: TextStyle(color: Colors.white),
                        ),
                        Icon(
                          Icons.add,
                          color: Colors.white,
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        Container(
          height: MediaQuery.of(context).size.height * 0.5,
          child: ListView.builder(
            // physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 15),
            shrinkWrap: false,
            itemCount: listController.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.only(top: 15),
                child: Row(
                  children: [
                    Expanded(
                      child: FormHelper.inputFieldWidget(
                        context,
                        "medication",
                        "Medication",
                        (onValidateVal) {},
                        (onSavedVal) {
                          // postActivityType.clear(),
                          if (onSavedVal != "") {
                            statusMedication.add(onSavedVal);
                          }
                        },
                        paddingRight: 0,
                        paddingLeft: 0,
                        initialValue: "",
                        prefixIcon: const Icon(Icons.medication),
                        showPrefixIcon: true,
                        prefixIconColor: Colors.black.withOpacity(0.5),
                        hintColor: Colors.grey.withOpacity(0.7),
                        borderFocusColor: Colors.grey.shade700,
                        borderColor: Colors.grey.shade200,
                        borderWidth: 5,
                        borderRadius: 5,
                        borderErrorColor: Colors.white,
                        errorBorderWidth: 0,
                        focusedErrorBorderWidth: 0,
                        borderFocusedErrorColor: Colors.white,
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          listController[index].clear();
                          listController[index].dispose();
                          listController.removeAt(index);
                        });
                      },
                      child: const Icon(
                        Icons.delete,
                        color: Color.fromARGB(255, 214, 107, 107),
                        size: 35,
                      ),
                    )
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(
          height: 10,
        ),
      ],
    );
  }
}
