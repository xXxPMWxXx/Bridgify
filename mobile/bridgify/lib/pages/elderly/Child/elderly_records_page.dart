import 'package:bridgify/accessories/elderly/elderly_record_item.dart';
import 'package:bridgify/pages/elderly/Child/update_elderly.dart';
import 'package:flutter/material.dart';

class ElderlyRecords extends StatefulWidget {
  const ElderlyRecords({super.key});

  @override
  State<ElderlyRecords> createState() => _ElderlyRecordsState();
}

class _ElderlyRecordsState extends State<ElderlyRecords> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('My Diary', style: TextStyle(color: Colors.black)),
          backgroundColor: Colors.white,
          centerTitle: true,
          elevation: 1,
        ),
        body: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 15),
          children: const [
            ElderlyRecordItem(color: Colors.green),
            ElderlyRecordItem(color: Colors.red),
            ElderlyRecordItem(color: Colors.blue),
            ElderlyRecordItem(color: Colors.teal),
            ElderlyRecordItem(color: Colors.orange),
            ElderlyRecordItem(color: Colors.deepOrange),
            ElderlyRecordItem(color: Colors.indigo),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => const UpdateElderly()));
          },
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
