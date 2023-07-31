import 'package:snippet_coder_utils/hex_color.dart';
import 'package:flutter/material.dart';

class InvalidCredentialsView extends StatefulWidget {
  const InvalidCredentialsView(
      {super.key, required this.primaryText, this.secondaryText});
  final String primaryText;
  final String? secondaryText;

  @override
  State<InvalidCredentialsView> createState() => _InvalidCredentialsViewState();
}

class _InvalidCredentialsViewState extends State<InvalidCredentialsView> {
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
          width: MediaQuery.of(context).size.width * 0.80,
          child: /*_causeOfError(),*/
              Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                widget.primaryText,
                style: TextStyle(
                    fontSize: 18,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              const SizedBox(
                height: 10,
              ),
              if (widget.secondaryText != null) Text(widget.secondaryText!),
              const SizedBox(
                height: 40,
              ),
            ],
          ),
        ),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: HexColor("#33A11D"),
            child: MaterialButton(
              onPressed: () {
                if (Navigator.canPop(context)) Navigator.pop(context);
              },
              textColor: Colors.white,
              child: const Text('OK'),
            ),
          ),
        ),
      ]),
    );
  }
}
