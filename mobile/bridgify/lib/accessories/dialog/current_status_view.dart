import 'package:bridgify/models/elderly_response_model.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:flutter/material.dart';

class CurrentStatus extends StatefulWidget {
  const CurrentStatus({
    super.key,
    required this.model,
  });
  final ElderlyResponseModel model;

  @override
  State<CurrentStatus> createState() => _CurrentStatusState();
}

class _CurrentStatusState extends State<CurrentStatus> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(children: [
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.4,
          width: MediaQuery.of(context).size.width * 0.7,
          child: /*_causeOfError(),*/
              Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [],
          ),
        ),
        Positioned(
          left: 20,
          top: 50,
          child: Text(
            'Current Status',
            style: TextStyle(
              color: Colors.black.withOpacity(0.85),
              fontSize: 25,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Positioned(
          left: 20,
          top: 100,
          child: Text(
            "Current Acitivity: ${widget.model.status!.current_activity!}",
            style: TextStyle(
                fontSize: 15,
                color: HexColor("#33A11D"),
                fontWeight: FontWeight.w600),
          ),
        ),
        Positioned(
          left: 20,
          top: 125,
          child: Text(
            "Current Temp: ${widget.model.status!.current_temp!}",
            style: TextStyle(
                fontSize: 15,
                color: HexColor("#33A11D"),
                fontWeight: FontWeight.w600),
          ),
        ),
        Positioned(
          left: 20,
          top: 150,
          child: Text(
            "Current Condition: ${widget.model.status!.condition!}",
            style: TextStyle(
                fontSize: 15,
                color: HexColor("#33A11D"),
                fontWeight: FontWeight.w600),
          ),
        ),
        Positioned(
          left: 20,
          top: 175,
          child: Text(
            "Condition Description: ${widget.model.status!.condition_description!}",
            style: TextStyle(
                fontSize: 15,
                color: HexColor("#33A11D"),
                fontWeight: FontWeight.w600),
          ),
        ),
        if (widget.model.status!.medication!.isNotEmpty)
          Positioned(
            left: 20,
            top: 200,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Medication:",
                  style: TextStyle(
                      fontSize: 15,
                      color: HexColor("#33A11D"),
                      fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 5),
                Column(
                  children: [
                    for (int i = 0;
                        i < widget.model.status!.medication!.length;
                        i++)
                      Row(
                        // mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.medication,
                            size: 25,
                            color: HexColor("#33A11D"),
                          ),
                          const SizedBox(
                              width:
                                  8), // Add some spacing between the icon and text
                          Text(
                            "${widget.model.status!.medication![i]}: ${widget.model.status!.taken_med! == "True" ? "Taken" : "Not Taken"}",
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                              color: HexColor("#33A11D"),
                            ),
                          ),
                          const SizedBox(height: 30),
                        ],
                      ),
                  ],
                )
              ],
            ),
          ),
        Positioned(
          left: -10,
          top: 0,
          child: MaterialButton(
            onPressed: () {
              if (Navigator.canPop(context)) Navigator.pop(context);
            },
            child: const Icon(
              Icons.arrow_back_ios,
              color: Colors.black,
            ),
          ),
        ),
      ]),
    );
  }
}
