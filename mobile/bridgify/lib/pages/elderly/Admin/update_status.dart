import 'dart:io';

import 'package:bridgify/config.dart';
import 'package:bridgify/models/elderly_request_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';

class UpdateStatus extends StatefulWidget {
  final ElderlyRequestModel model;
  final String? transactionType;
  const UpdateStatus(
      {Key? key, required this.model, required this.transactionType})
      : super(key: key);

  @override
  State<UpdateStatus> createState() => _UpdateStatusState();
}

class _UpdateStatusState extends State<UpdateStatus> {
  bool isAPICallProcess = false;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  ElderlyRequestModel? elderlyRequestModel;
  String? transactionType;
  Status? currentStatus;
  final _statusPageController = PageController();
  int pageIndex = 0;
  bool awakenStatus = false;
  bool takenMedsStatus = false;
  List<TextEditingController>? listController = [];
  bool postStatus = false;

  @override
  void initState() {
    super.initState();
    elderlyRequestModel = widget.model;
    transactionType = widget.transactionType;
    currentStatus = elderlyRequestModel!.status ?? Status();

    if (elderlyRequestModel!.status != null) {
      awakenStatus = stringToBool(currentStatus!.awake!.toLowerCase());
      takenMedsStatus = stringToBool(currentStatus!.taken_med!.toLowerCase());
      if (currentStatus!.medication!.isNotEmpty) {
        for (var meds in elderlyRequestModel!.status!.medication!) {
          listController!.add(TextEditingController(text: meds));
        }
      }
    } else {
      currentStatus!.awake = awakenStatus.toString().toLowerCase();
      currentStatus!.taken_med = takenMedsStatus.toString().toLowerCase();
      listController!.add(TextEditingController(text: ""));
    }
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
      body: ProgressHUD(
        key: UniqueKey(),
        inAsyncCall: isAPICallProcess,
        child: Form(key: globalFormKey, child: pageManager(context)),
      ),
      bottomSheet: Visibility(
        visible: MediaQuery.of(context).viewInsets.bottom == 0,
        child: Container(
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
              } else if (pageIndex == 1) {
                validateAndSave();
                if (validateAndSave()) {
                  setState(() {
                    isAPICallProcess = true;
                  });
                  print(listController);
                  currentStatus!.medication = [];
                  for (var i = 0; i < listController!.length; i++) {
                    String temp = listController![i].text;
                    if (temp.trim() != "") {
                      currentStatus!.medication!.add(temp.trim());
                    }
                  }
                  elderlyRequestModel!.status = currentStatus;
                  if (transactionType == "creation") {
                    APIService.createElderly(elderlyRequestModel!)
                        .then((response) {
                      setState(() {
                        pageIndex++;
                        isAPICallProcess = false;
                      });
                      if (response) {
                        _statusPageController.animateToPage(2,
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.elasticIn);
                      } else {
                        _statusPageController.animateToPage(3,
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.elasticIn);
                      }
                    });
                  } else {
                    APIService.updateElderly(elderlyRequestModel!)
                        .then((response) {
                      setState(() {
                        pageIndex++;
                        isAPICallProcess = false;
                      });
                      if (response) {
                        _statusPageController.animateToPage(2,
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.elasticIn);
                      } else {
                        _statusPageController.animateToPage(3,
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.elasticIn);
                      }
                    });
                  }
                }
              } else {
                // if (Navigator.canPop(context)) Navigator.pop(context);
                Navigator.pushNamed(
                  context,
                  '/adminElderlyRecords',
                );
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
            child: pageIndex == 0
                ? const Text('Update Medication')
                : pageIndex == 1
                    ? const Text('Save Status')
                    : const Text('Done'),
          ),
        ),
      ),
    );
  }

  bool stringToBool(String statusBool) {
    if (statusBool.toLowerCase() == 'true') {
      return true;
    }
    return false;
  }

  Widget pageManager(BuildContext context) {
    return Container(
      clipBehavior: Clip.none,
      child: PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: _statusPageController,
        children: [
          medicationRequirements(context),
          buildStatusPage(context),
          successStatusOutcome(),
          failureStatusOutcome(),
        ],
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
          SizedBox(
            height: 100,
            width: 85,
            child: Container(
              // padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration:
                  BoxDecoration(borderRadius: BorderRadius.circular(25)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: transactionType == "creation" && pageIndex <= 1
                    ? Image.file(File(model.photo!))
                    : Image.network(
                        'http://${Config.apiURL}/images/trained_face/${model.photo}',
                        fit: BoxFit.cover,
                      ),
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

  Widget failureStatusOutcome() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(
          Icons.close_rounded,
          size: 100,
          color: Colors.red,
        ),
        const SizedBox(height: 16),
        Text(
          'Something went wrong!',
          style: TextStyle(
            fontSize: 20,
            color: Colors.black.withOpacity(0.5),
          ),
        ),
        Text(
          'Please try again later',
          style: TextStyle(
            fontSize: 20,
            color: Colors.black.withOpacity(0.5),
          ),
        ),
      ],
    );
  }

  Widget successStatusOutcome() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(
          Icons.check_circle_outline_rounded,
          size: 100,
          color: Colors.green,
        ),
        const SizedBox(height: 16),
        Text(
          transactionType == 'creation'
              ? 'Elderly registered successfully!'
              : 'Status updated successfully!',
          style: TextStyle(
            fontSize: 20,
            color: Colors.black.withOpacity(0.5),
          ),
        ),
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
              icon: const Icon(Icons.arrow_back_ios,
                  color: Color(0xFF27c1a9), size: 20),
            ),
            const Text(
              "Current Status",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        demoElderlyRecordItem(model: elderlyRequestModel!),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 10.0),
          child: Column(
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
                            currentStatus!.awake = awakenStatus.toString();
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
                            currentStatus!.taken_med =
                                takenMedsStatus.toString();
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
                  (onValidateVal) {
                    if (onValidateVal.isEmpty) {
                      return 'Please input a valid activity.';
                    }

                    return null;
                  },
                  (onSavedVal) {
                    if (onSavedVal != "") {
                      currentStatus!.current_activity = onSavedVal;
                    }
                  },
                  paddingRight: 0,
                  paddingLeft: 0,
                  initialValue: currentStatus!.current_activity ?? "",
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
                  (onValidateVal) {
                    if (onValidateVal.isEmpty) {
                      return 'Please input a valid temperature.';
                    }

                    return null;
                  },
                  (onSavedVal) {
                    if (onSavedVal != "") {
                      currentStatus!.current_temp = onSavedVal;
                    }
                  },
                  isNumeric: true,
                  paddingRight: 0,
                  paddingLeft: 0,
                  initialValue: currentStatus!.current_temp ?? "",
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
                  (onValidateVal) {
                    if (onValidateVal.isEmpty) {
                      return 'Please input a valid condition.';
                    }

                    return null;
                  },
                  (onSavedVal) {
                    if (onSavedVal != "") {
                      currentStatus!.condition = onSavedVal;
                    }
                  },
                  paddingRight: 0,
                  paddingLeft: 0,
                  initialValue: currentStatus!.condition ?? "",
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
                  (onValidateVal) {
                    if (onValidateVal.isEmpty) {
                      return 'Please input a valid description.';
                    }

                    return null;
                  },
                  (onSavedVal) {
                    if (onSavedVal != "") {
                      currentStatus!.condition_description = onSavedVal;
                    }
                  },
                  paddingRight: 0,
                  paddingLeft: 0,
                  initialValue: currentStatus!.condition_description ?? "",
                  obscureText: false,
                  prefixIcon: const Icon(Icons.description_rounded),
                  showPrefixIcon: true,
                  prefixIconColor: Colors.black.withOpacity(0.5),
                  textColor: Colors.black.withOpacity(0.5),
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
                    print("added");
                    print(listController);
                    listController!.add(TextEditingController());
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
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.5,
          child: ListView.builder(
            // physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 15),
            shrinkWrap: true,
            itemCount: listController!.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.only(top: 15),
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 5),
                        height: 60,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          border:
                              Border.all(width: 5, color: Colors.grey.shade200),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextFormField(
                          controller: listController![index],
                          autofocus: false,
                          style:
                              TextStyle(color: Colors.black.withOpacity(0.5)),
                          decoration: InputDecoration(
                            border: InputBorder.none,
                            hintText: "Medication",
                            hintStyle:
                                TextStyle(color: Colors.grey.withOpacity(0.7)),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          listController![index].clear();
                          listController![index].dispose();
                          listController!.removeAt(index);
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

  bool validateAndSave() {
    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();
      return true;
    }
    return false;
  }
}
