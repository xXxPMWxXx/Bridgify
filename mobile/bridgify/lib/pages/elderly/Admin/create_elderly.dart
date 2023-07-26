import 'dart:io';

import 'package:bridgify/config.dart';
import 'package:bridgify/models/elderly_request_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class CreateElderly extends StatefulWidget {
  const CreateElderly({Key? key}) : super(key: key);

  @override
  _CreateElderlyState createState() => _CreateElderlyState();
}

class _CreateElderlyState extends State<CreateElderly> {
  bool isAPICallProcess = false;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  Object? model;
  ElderlyRequestModel? elderlyRequestModel;
  bool isImageSelected = false;

  String? imagePathUpdate;
  String? idElderly;
  String? nameElderly;
  DateTime? dobElderly;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Register Elderly',
              style: TextStyle(color: Colors.black)),
          backgroundColor: Colors.white,
          iconTheme: const IconThemeData(color: Colors.black),
          elevation: 1,
        ),
        body: ProgressHUD(
          inAsyncCall: isAPICallProcess,
          opacity: 0.3,
          key: UniqueKey(),
          child: Form(
            key: globalFormKey,
            child: _profileUI(context),
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    elderlyRequestModel = ElderlyRequestModel();
  }

  Container _profileUI(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 16, top: 25, right: 16),
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: ListView(
          children: [
            // const Text(
            //   "Register Elderly",
            //   style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
            // ),
            picPicker(
              context,
              imagePathUpdate ?? "",
              isImageSelected,
              (file) => {
                setState(
                  () {
                    //model.productPic = file.path;
                    imagePathUpdate = file.path;
                    print(imagePathUpdate);
                    elderlyRequestModel!.photo = imagePathUpdate;
                    print(elderlyRequestModel!.photo);
                    isImageSelected = true;
                  },
                )
              },
            ),
            SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "NRIC",
                    "Last 4 characters of NRIC",
                    (onValidateVal) {
                      if (onValidateVal.isEmpty) {
                        return 'Please input a valid NRIC.';
                      }

                      return null;
                    },
                    (onSavedVal) {
                      elderlyRequestModel!.id = onSavedVal;
                    },
                    maxLength: 4,
                    paddingRight: 0,
                    paddingLeft: 0,
                    initialValue: "",
                    obscureText: false,
                    prefixIcon: const Icon(Icons.person),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
                    textColor: Colors.black.withOpacity(0.7),
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
                Container(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                  child: FormHelper.inputFieldWidget(
                    context,
                    "name",
                    "Name",
                    (onValidateVal) {
                      if (onValidateVal.isEmpty) {
                        return 'Please input a valid name';
                      }

                      return null;
                    },
                    (onSavedVal) {
                      elderlyRequestModel!.name = onSavedVal;
                    },
                    paddingRight: 0,
                    paddingLeft: 0,
                    initialValue: "",
                    obscureText: false,
                    prefixIcon: const Icon(Icons.person),
                    showPrefixIcon: true,
                    prefixIconColor: Colors.black.withOpacity(0.5),
                    textColor: Colors.black.withOpacity(0.7),
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
                Row(
                  children: [
                    IconButton(
                      onPressed: () async {
                        dobElderly = await showDatePicker(
                            context: context,
                            initialDate: DateTime(
                              DateTime.now().year,
                              DateTime.now().month,
                              DateTime.now().day,
                            ),
                            firstDate: DateTime(1920),
                            lastDate: DateTime(
                              DateTime.now().year,
                              DateTime.now().month,
                              DateTime.now().day,
                            ));
                        if (dobElderly != null) {
                          setState(() {});
                          print(
                              'Date selected:  ${dobElderly!.day}-${dobElderly!.month}-${dobElderly!.year}');
                        }
                      },
                      icon: Icon(Icons.calendar_month_outlined),
                    ),
                    if (dobElderly != null)
                      Text(
                          'Select Date: ${dobElderly!.day}-${dobElderly!.month}-${dobElderly!.year}')
                  ],
                )
              ],
            ),
            const SizedBox(height: 35),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                FormHelper.submitButton(
                  height: 50,
                  width: 150,
                  "CLEAR",
                  () {
                    setState(() {});
                  },
                  btnColor: HexColor("FFFFFF"),
                  borderColor: HexColor("FFFFFF"),
                  txtColor: Colors.black,
                  borderRadius: 20,
                  fontWeight: FontWeight.bold,
                ),
                FormHelper.submitButton(
                  height: 50,
                  width: 150,
                  "SAVE",
                  () {
                    // passwordUpdate = passwordUpdate ?? "";
                    // confirmPasswordUpdate = confirmPasswordUpdate ?? "";
                    if (validateAndSave()) {
                      setState(() {
                        isAPICallProcess = true;
                      });

                      // APIService.update(
                      //         updateUserRequestModel!, isImageSelected)
                      //     .then(
                      //   (response) {
                      //     setState(() {
                      //       isAPICallProcess = false;
                      //     });

                      //     if (response) {
                      //       setState(() {
                      //         passwordUpdate = "";
                      //         confirmPasswordUpdate = "";
                      //       });
                      //     } else {
                      //       showDialog(
                      //         context: context,
                      //         builder: (context) {
                      //           return Dialog(
                      //             backgroundColor: Colors.white,
                      //             shape: RoundedRectangleBorder(
                      //               borderRadius: BorderRadius.circular(24),
                      //             ),
                      //             child: const InvalidCredentialsView(
                      //               primaryText: 'Invalid field change !!',
                      //             ),
                      //           );
                      //         },
                      //       );
                      //     }
                      //   },
                      // );
                    }
                  },
                  btnColor: HexColor("207A35"),
                  borderColor: HexColor("207A35"),
                  txtColor: Colors.white,
                  borderRadius: 20,
                  fontWeight: FontWeight.bold,
                ),
              ],
            )
          ],
        ),
      ),
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

  static Widget picPicker(BuildContext context, String fileName,
      bool isImageSelected, Function onFilePicked) {
    Future<XFile?> _imageFile;
    ImagePicker _picker = ImagePicker();

    return GestureDetector(
      onTap: () {
        try {
          _imageFile = _picker.pickImage(source: ImageSource.gallery);
          _imageFile.then((file) async {
            onFilePicked(file);
            // Navigator.of(context).pop();
          });
        } catch (e) {
          Navigator.of(context).pop();
        }
      },
      child: Center(
        child: Stack(
          children: [
            Container(
                width: 130,
                height: 130,
                decoration: BoxDecoration(
                    border: Border.all(
                      width: 4,
                      color: Theme.of(context).scaffoldBackgroundColor,
                    ),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.15),
                          offset: const Offset(0, 10))
                    ],
                    shape: BoxShape.circle),
                child: fileName.isNotEmpty
                    ? isImageSelected
                        ? CircleAvatar(
                            radius: 32,
                            backgroundImage: Image.file(File(fileName)).image)
                        : CircleAvatar(
                            radius: 32,
                            backgroundImage: Image.network(
                                    'http://${Config.apiURL}/images/user_profile/$fileName')
                                .image)
                    : CircleAvatar(
                        radius: 32,
                        backgroundImage: Image.network(
                                'http://${Config.apiURL}/images/user_profile/default.png')
                            .image)),
            Positioned(
              bottom: 0,
              right: 0,
              child: Container(
                height: 40,
                width: 40,
                decoration: BoxDecoration(
                  color: Color(0xFF27c1a9),
                  shape: BoxShape.circle,
                  border: Border.all(
                      color: Theme.of(context).scaffoldBackgroundColor),
                ),
                child: const Icon(Icons.edit, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
