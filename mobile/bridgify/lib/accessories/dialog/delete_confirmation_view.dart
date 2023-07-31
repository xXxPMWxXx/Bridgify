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
            height: _hasClicked
                ? MediaQuery.of(context).size.height * 0.4
                : MediaQuery.of(context).size.height * 0.2,
            width: MediaQuery.of(context).size.width * 0.8,
            child: PageView(
              physics: const NeverScrollableScrollPhysics(),
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
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context, "refresh");
                  }
                  // Navigator.pushNamedAndRemoveUntil(
                  //   context,
                  //   '/adminHome',
                  //   (route) => false,
                  // );
                } else {
                  APIService.deleteElderly(widget.id).then(
                    (response) {
                      if (response) {
                        setState(() {
                          _hasPosted = true;
                          _hasClicked = true;
                        });
                        _pageConfirmationController.nextPage(
                            duration: const Duration(milliseconds: 200),
                            curve: Curves.easeIn);
                      } else {
                        setState(() {
                          _hasPosted = false;
                          _hasClicked = true;
                        });
                        _pageConfirmationController.nextPage(
                            duration: const Duration(milliseconds: 100),
                            curve: Curves.easeIn);
                      }
                    },
                  );
                }
              },
              textColor: Colors.white,
              child: _hasClicked ? const Text("Done") : const Text("Yes, I'm sure"),
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
        const SizedBox(
          height: 10,
        ),
        Text(widget.secondaryText),
        const SizedBox(
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
              const SizedBox(height: 16),
              Text(
                'Something went wrong!',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
              Text(
                'Please try again later',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.check_circle_outline_rounded,
                size: 100,
                color: Colors.green,
              ),
              const SizedBox(height: 16),
              Text(
                'Elderly account deleted successfully!',
                style: TextStyle(
                  fontSize: 18,
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
