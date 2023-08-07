import 'package:bridgify/accessories/notification/build_notification_item.dart';
import 'package:bridgify/models/notification_request_model.dart';
import 'package:bridgify/models/notification_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  NotificationRequestModel? notificationRequestModel;
  String? elderlyString;
  int elderlyCount = 0;

  @override
  void initState() {
    super.initState();
    notificationRequestModel = NotificationRequestModel();
    Future.delayed(Duration.zero, () {
      if (ModalRoute.of(context)?.settings.arguments != null) {
        final Map arguments = ModalRoute.of(context)?.settings.arguments as Map;
        elderlyString = arguments['elderly'];
        elderlyCount = arguments['elderlyCount'];
        setState(() {
          notificationRequestModel!.linkedElderly = elderlyString;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title:
              const Text('Notification', style: TextStyle(color: Colors.white)),
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomCenter,
                colors: [
                  Color.fromRGBO(48, 132, 67, 0.722),
                  Color.fromRGBO(48, 132, 67, 0.6),
                ],
              ),
            ),
          ),
          centerTitle: true,
          elevation: 1,
          leading: IconButton(
            onPressed: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/home',
                (Route<dynamic> route) {
                  return route.settings.name == '/home';
                },
              );
            },
            icon: Icon(
              Icons.arrow_back_ios,
              color: Colors.white,
            ),
          ),
        ),
        backgroundColor: HexColor('#EDFDF9'),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                elderlyCount != 0 || elderlyString != ""
                    ? FutureBuilder(
                        future: APIService.getElderlyNotifications(
                            notificationRequestModel!),
                        builder: (BuildContext context,
                            AsyncSnapshot<List<NotificationResponseModel>?>
                                model) {
                          if (model.hasData) {
                            return ListView.builder(
                              
                              physics: const ClampingScrollPhysics(),
                              scrollDirection: Axis.vertical,
                              shrinkWrap: true,
                              itemCount: model.data!.length,
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: EdgeInsets.symmetric(
                                      vertical: 10, horizontal: 5),
                                  child: Column(
                                    // Adjust padding as needed
                                    children: [
                                      BuildNotificationitem(
                                          model: model.data![index]),
                                      Container(
                                        width:
                                            MediaQuery.of(context).size.width *
                                                0.75,
                                        child: Divider(
                                            color: Colors.grey.shade500),
                                      )
                                    ],
                                  ),
                                );
                              },
                            );
                          }
                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 80.0),
                            child: Center(
                              child: Text(
                                "No notifications received yet",
                                style: TextStyle(
                                    color: Colors.grey.shade800, fontSize: 16),
                              ),
                            ),
                          );
                        },
                      )
                    : Padding(
                        padding: const EdgeInsets.symmetric(vertical: 80.0),
                        child: Center(
                          child: Text(
                            "No notifications received yet",
                            style: TextStyle(
                                color: Colors.grey.shade800, fontSize: 16),
                          ),
                        ),
                      )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
