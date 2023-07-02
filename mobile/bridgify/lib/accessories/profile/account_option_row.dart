import 'package:flutter/material.dart';

class BuildAccountOptionRow extends StatelessWidget {
  final String title;
  const BuildAccountOptionRow({super.key, required this.title});


  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.grey.shade600,
          ),
        ),
        IconButton(
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                        title: Text(title),
                        content: const Column(
                          children: [
                            Text("Option 1"),
                            Text("Option 2"),
                            Text("Option 3")
                          ],
                        ),
                        actions: [
                          TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: const Text("Close"))
                        ]);
                  });
            },
            icon: const Icon(Icons.arrow_forward_ios, color: Colors.grey))
      ],
    );
  }
}