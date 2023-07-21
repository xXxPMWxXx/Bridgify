import 'package:bridgify/accessories/dialog/rating_view.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:zego_zimkit/zego_zimkit.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen(
      {Key? key, required this.conversationID, required this.conversationType})
      : super(key: key);

  final String conversationID;
  final ZIMConversationType conversationType;

  @override
  Widget build(BuildContext context) {
    return ZIMKitMessageListPage(
      showPickFileButton: false,
      showPickMediaButton: false,
      sendButtonWidget: Icon(Icons.send, color: HexColor("#4EA13D")),
      onMessageItemLongPress: _onMessageItemLongPress,
      inputDecoration: const InputDecoration(hintText: "Type message here..."),
      inputBackgroundDecoration:
          BoxDecoration(borderRadius: BorderRadius.circular(40)),
      appBarBuilder: (context, defaultAppBar) {
        return AppBar(
          backgroundColor: HexColor("#225518"),
          title: Row(
            children: [
              CircleAvatar(
                  backgroundImage: Image.asset('images/test.png').image),
              const SizedBox(width: 15),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Administrator',
                      style: const TextStyle(fontSize: 16),
                      overflow: TextOverflow.clip),
                  Text(conversationID,
                      style: const TextStyle(fontSize: 12),
                      overflow: TextOverflow.clip),
                ],
              )
            ],
          ),
          actions: [
            IconButton(
                icon: const Icon(Icons.rate_review_rounded),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return Dialog(
                        backgroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: RatingView(),
                      );
                    },
                  );
                }),
          ],
        );
      },
      conversationID: conversationID,
      conversationType: conversationType,
      messageItemBuilder: (context, message, defaultWidget) {
        return Theme(
          data: ThemeData(
            primaryColor: HexColor("#33A11D"),
            iconTheme: IconThemeData(color: Colors.white),
          ),
          child: defaultWidget,
        );
      },
    );
  }
}

Future<void> _onMessageItemLongPress(
  BuildContext context,
  LongPressStartDetails details,
  ZIMKitMessage message,
  Function defaultAction,
) async {
  showCupertinoDialog(
    context: context,
    barrierDismissible: true,
    builder: (context) {
      return CupertinoAlertDialog(
        title: const Text('Confirm'),
        content: const Text('Do you want to delete this message?'),
        actions: [
          CupertinoDialogAction(
            onPressed: () {
              ZIMKit().deleteMessage([message]);
              Navigator.pop(context);
            },
            child: const Text('Delete'),
          ),
          CupertinoDialogAction(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Cancel'),
          ),
        ],
      );
    },
  );
}