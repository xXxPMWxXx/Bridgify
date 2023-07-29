import 'package:bridgify/services/api_service.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:flutter/material.dart';

class DeleteConfirmationView extends StatefulWidget {
  const DeleteConfirmationView(
      {super.key, required this.secondaryText, required this.id});
  final String secondaryText;
  final String id;

  @override
  State<DeleteConfirmationView> createState() => _DeleteConfirmationViewState();
}

class _DeleteConfirmationViewState extends State<DeleteConfirmationView> {
  final _pageConfirmationController = PageController();
  var _hasPosted = false;
  var _hasClicked = false;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(children: [
        SizedBox(
            height: MediaQuery.of(context).size.height * 0.2,
            width: MediaQuery.of(context).size.width * 0.75,
            child: PageView(
              physics: NeverScrollableScrollPhysics(),
              controller: _pageConfirmationController,
              children: [
                _confirmationPage(),
                _deleteOutcome(),
              ],
            )),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: HexColor("#33A11D"),
            child: MaterialButton(
              onPressed: () {
                if (_hasClicked) {
                  if (_hasPosted) {
                    Navigator.pushNamedAndRemoveUntil(
                      context,
                      '/adminElderlyRecords',
                      (Route<dynamic> route) {
                        return route.settings.name == '/adminElderlyRecords';
                      },
                    );
                  }
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context);
                  }
                } else {
                  APIService.deleteElderly(widget.id).then(
                    (response) {
                      if (response) {
                        print("success");
                        setState(() {
                          _hasPosted = true;
                          _hasClicked = true;
                        });
                        _pageConfirmationController.animateToPage(1,
                            duration: Duration(milliseconds: 200),
                            curve: Curves.easeIn);
                      } else {
                        setState(() {
                          _hasPosted = false;
                          _hasClicked = true;
                        });
                        _pageConfirmationController.animateToPage(1,
                            duration: Duration(milliseconds: 100),
                            curve: Curves.easeIn);
                      }
                    },
                  );
                }
              },
              child: const Text("Yes, I'm sure"),
              textColor: Colors.white,
            ),
          ),
        ),
      ]),
    );
  }

  Widget _confirmationPage() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          "Are you sure?",
          style: TextStyle(
              fontSize: 18,
              color: HexColor("#33A11D"),
              fontWeight: FontWeight.w600),
        ),
        SizedBox(
          height: 10,
        ),
        Text(widget.secondaryText),
        SizedBox(
          height: 40,
        ),
      ],
    );
  }

  Widget _deleteOutcome() {
    return Stack(
      alignment: Alignment.center,
      children: [
        Visibility(
          visible: _hasPosted,
          replacement: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.close_rounded,
                size: 100,
                color: Colors.red,
              ),
              SizedBox(height: 16),
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
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.check_circle_outline_rounded,
                size: 100,
                color: Colors.green,
              ),
              SizedBox(height: 16),
              Text(
                'Elderly account deleted successfully!',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
