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
          height: MediaQuery.of(context).size.height * 0.2,
          width: MediaQuery.of(context).size.width * 0.75,
          child: /*_causeOfError(),*/
              Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Current Acitivity: ${widget.model.status!.current_activity!}",
                style: TextStyle(
                    fontSize: 15,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              SizedBox(
                height: 5,
              ),
              Text(
                "Current Temp: ${widget.model.status!.current_temp!}",
                style: TextStyle(
                    fontSize: 15,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              SizedBox(
                height: 5,
              ),
              Text(
                "Current Condition: ${widget.model.status!.condition!}",
                style: TextStyle(
                    fontSize: 15,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              SizedBox(
                height: 5,
              ),
              Text(
                "Condition Description: ${widget.model.status!.condition_description!}",
                style: TextStyle(
                    fontSize: 15,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              SizedBox(
                height: 5,
              ),
              if (widget.model.status!.medication!.isNotEmpty)
                for (int i = 0;
                    i < widget.model.status!.medication!.length;
                    i++)
                  Text(
                    "Medication: ${widget.model.status!.medication![i] }" ,
                    style: TextStyle(
                        fontSize: 15,
                        color: HexColor("#33A11D"),
                        fontWeight: FontWeight.w600),
                  ),
              SizedBox(
                height: 5,
              ),
              Text(
                "Taken Medication: ${widget.model.status!.taken_med!}",
                style: TextStyle(
                    fontSize: 15,
                    color: HexColor("#33A11D"),
                    fontWeight: FontWeight.w600),
              ),
              SizedBox(
                height: 5,
              ),
            ],
          ),
        ),
        Positioned(
          left: 20,
          top: 20,
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
          left: 0,
          top: 0,
          child: MaterialButton(
            onPressed: () {
              if (Navigator.canPop(context)) Navigator.pop(context);
            },
            child: Icon(
              Icons.arrow_back_ios,
              color: Colors.black,
            ),
          ),
        ),
      ]),
    );
  }
}
