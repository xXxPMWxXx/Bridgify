import 'package:bridgify/accessories/elderly/elderly_avatar.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/models/notification_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

class BuildNotificationitem extends StatefulWidget {
  final NotificationResponseModel? model;
  const BuildNotificationitem({Key? key, required this.model})
      : super(key: key);

  @override
  State<BuildNotificationitem> createState() => _BuildNotificationitemState();
}

class _BuildNotificationitemState extends State<BuildNotificationitem> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: APIService.getElderlyById(widget.model!.elderlyID!),
      builder:
          (BuildContext context, AsyncSnapshot<ElderlyResponseModel?> model) {
        if (model.hasData) {
          String notificationMessage =
              "${model.data!.name!}${widget.model!.message!}";
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
              children: [
                ElderlyAvatar(
                  filename: model.data!.photo!,
                  radius: 25,
                ),
                SizedBox(
                  height: 50.0,
                  child: VerticalDivider(
                    color: Colors.grey.shade500,
                    width: 25,
                  ),
                ),
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        notificationMessage,
                        softWrap: true,
                        style: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.copyWith(color: Colors.grey.shade600),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        }
        return const Center(
          child: CircularProgressIndicator(),
        );
      },
    );
  }
}
