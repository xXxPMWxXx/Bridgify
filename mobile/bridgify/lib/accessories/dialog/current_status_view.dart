import 'package:bridgify/accessories/elderly/elderly_avatar.dart';
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
          height: MediaQuery.of(context).size.height * 0.3 +
              (MediaQuery.of(context).size.height *
                  0.05 *
                  widget.model.status!.medication!.length),
          width: MediaQuery.of(context).size.width * 0.7,
          child: Container(),
        ),
        Positioned(
          left: 20,
          top: 55,
          child: Row(
            children: [
              ElderlyAvatar(
                filename: widget.model.photo!,
                radius: 31,
              ),
              SizedBox(width: 10),
              Text.rich(
                TextSpan(
                  text: truncateString(widget.model.name!, 10),
                  style: const TextStyle(
                    fontSize: 15,
                    color: Colors.black54,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
        Positioned(
          right: 20,
          top: 70,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: Colors.grey[100], // Grayish-white background color
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                Container(
                  width: 8.5,
                  height: 8.5,
                  margin: const EdgeInsets.only(right: 5),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: widget.model.status!.awake!.toLowerCase() == "true"
                        ? HexColor("#4EA13D")
                        : Colors.grey.shade400,
                  ),
                ),
                Text(
                  widget.model.status!.awake!.toLowerCase() == "true"
                      ? 'Awake'
                      : 'Asleep',
                  style: TextStyle(
                    color: widget.model.status!.awake!.toLowerCase() == "true"
                        ? HexColor("#4EA13D")
                        : Colors.grey.shade400,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          left: 20,
          top: 125,
          child: Text.rich(
            TextSpan(
              text: "Current Activity: ",
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black54,
                fontWeight: FontWeight.w600,
              ),
              children: <TextSpan>[
                TextSpan(
                  text: widget.model.status!.current_activity!,
                  style: const TextStyle(
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          left: 20,
          top: 150,
          child: Text.rich(
            TextSpan(
              text: "Current Temp: ",
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black54,
                fontWeight: FontWeight.w600,
              ),
              children: <TextSpan>[
                TextSpan(
                  text: "${widget.model.status!.current_temp!}\u00B0C",
                  style: const TextStyle(
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          left: 20,
          top: 175,
          child: Text.rich(
            TextSpan(
              text: "Current Condition: ",
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black54,
                fontWeight: FontWeight.w600,
              ),
              children: <TextSpan>[
                TextSpan(
                  text: widget.model.status!.condition!,
                  style: const TextStyle(
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          left: 20,
          top: 200,
          child: Text.rich(
            TextSpan(
              text: "Condition Description: ",
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black54,
                fontWeight: FontWeight.w600,
              ),
              children: <TextSpan>[
                TextSpan(
                  text: widget.model.status!.condition_description!,
                  style: const TextStyle(
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        ),
        if (widget.model.status!.medication!.isNotEmpty)
          Positioned(
            left: 20,
            top: 225,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Medication:",
                  style: TextStyle(
                      fontSize: 15,
                      color: Colors.black54,
                      fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 5),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (int i = 0;
                        i < widget.model.status!.medication!.length;
                        i++)
                      Row(
                        children: [
                          const Icon(
                            Icons.medication,
                            size: 25,
                            color: Colors.black54,
                          ),
                          const SizedBox(width: 8),
                          Text.rich(
                            TextSpan(
                              text: "${widget.model.status!.medication![i]}: ",
                              style: const TextStyle(
                                fontSize: 15,
                                color: Colors.black54,
                                fontWeight: FontWeight.w600,
                              ),
                              children: <TextSpan>[
                                TextSpan(
                                  text:
                                      widget.model.status!.taken_med! == "True"
                                          ? "Taken"
                                          : "Not Taken",
                                  style: const TextStyle(
                                    color: Colors.black87,
                                  ),
                                ),
                              ],
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
          left: 0,
          right: 0,
          top: 0,
          child: Container(
            height: 45, // Set the desired height of the bar
            color: widget.model.status!.awake!.toLowerCase() == "true"
                ? HexColor("#33A11D")
                : Colors.grey,
            alignment: Alignment.center,
            child: const Text(
              'Current Status',
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
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
              color: Colors.white,
            ),
          ),
        ),
      ]),
    );
  }

  String truncateString(String input, int maxLength) {
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.substring(0, maxLength - 3) + '...';
    }
  }
}
