import 'package:bridgify/accessories/dialog/rating_view.dart';
import 'package:bridgify/config.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';
import 'package:zego_zimkit/zego_zimkit.dart';

class AdminChatListScreen extends StatefulWidget {
  final String conversationID; //Bridgify no phone number, use email
  const AdminChatListScreen({super.key, required this.conversationID});

  @override
  State<AdminChatListScreen> createState() => _AdminChatListScreenState();
}

class _AdminChatListScreenState extends State<AdminChatListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: HexColor("#225518"),
          elevation: 0,
          title: const Text("Bridgify User Chats"),
        ),
        body: Column(
          children: [
            _topSection(),
            _chatListSection(),
          ],
        ));
  }

  Widget _topSection() {
    return InkWell(
      onTap: () {
        copyToClipboard(widget.conversationID);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Successfully copied to clipboard"),
        ));
      },
      child: const SizedBox(height: 0),
    );
  }

  Widget _chatListSection() {
    return Expanded(
        child: ZIMKitConversationListView(
      onLongPress: _onChatItemLongPress,
      itemBuilder: (context, conversation, defaultWidget) {
        return Theme(
          data: ThemeData(
            primaryColor: HexColor("#225518"),
            iconTheme: IconThemeData(color: HexColor("#225518")),
          ),
          child: defaultWidget,
        );
      },
      onPressed: (context, conversation, defaultAction) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ZIMKitMessageListPage(
              showPickFileButton: false,
              showPickMediaButton: false,
              sendButtonWidget: Icon(Icons.send, color: HexColor("#4EA13D")),
              onMessageItemLongPress: _onMessageItemLongPress,
              inputDecoration:
                  const InputDecoration(hintText: "Type message here..."),
              inputBackgroundDecoration:
                  BoxDecoration(borderRadius: BorderRadius.circular(40)),
              appBarBuilder: (context, defaultAppBar) {
                return AppBar(
                  backgroundColor: HexColor("#225518"),
                  title: Row(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(conversation.name,
                              style: const TextStyle(fontSize: 16),
                              overflow: TextOverflow.clip),
                          Text(conversation.id,
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
                                child: const RatingView(),
                              );
                            },
                          );
                        }),
                  ],
                );
              },
              conversationID: conversation.id,
              conversationType: conversation.type,
              messageItemBuilder: (context, message, defaultWidget) {
                return Theme(
                  data: ThemeData(
                    primaryColor: HexColor("#33A11D"),
                    iconTheme: IconThemeData(color: HexColor("#33A11D")),
                  ),
                  child: defaultWidget,
                );
              },
            ),
          ),
        );
      },
    ));
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

Future<void> _onChatItemLongPress(
  BuildContext context,
  ZIMKitConversation conversation,
  LongPressStartDetails details,
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
              ZIMKit().deleteConversation(conversation.id, conversation.type);
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
