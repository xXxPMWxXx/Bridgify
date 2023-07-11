import 'package:flutter/material.dart';

class PostText extends StatelessWidget {
  final String text;
  final double fontSize;
  final Color hashTagColor;

  PostText({
    required this.text,
    required this.fontSize,
    this.hashTagColor = Colors.blue,
  });

  @override
  Widget build(BuildContext context) {
    final hashTagRegExp = RegExp(r'\#\w+');

    List<InlineSpan> spans = [];

    final matches = hashTagRegExp.allMatches(text);

    int currentStartIndex = 0;

    for (var match in matches) {
      final hashTag = match.group(0);

      if (hashTag != null) {
        final beforeText = text.substring(currentStartIndex, match.start);
        final hashTagText = hashTag;

        spans.add(TextSpan(
            text: beforeText,
            style: TextStyle(fontSize: fontSize, color: Colors.grey[800])));
        spans.add(
          TextSpan(
            text: hashTagText,
            style: TextStyle(
              fontSize: fontSize,
              color: hashTagColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        );

        currentStartIndex = match.end;
      }
    }

    spans.add(TextSpan(
        text: text.substring(currentStartIndex),
        style: TextStyle(fontSize: fontSize, color: Colors.grey[800])));

    return RichText(
      text: TextSpan(
        children: spans,
        style: DefaultTextStyle.of(context).style,
      ),
    );
  }
}
