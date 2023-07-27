import 'package:bridgify/accessories/elderly/elderly_record_item.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/pages/elderly/Admin/create_elderly.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';

class AdminElderlyRecords extends StatefulWidget {
  const AdminElderlyRecords({super.key});

  @override
  State<AdminElderlyRecords> createState() => _AdminElderlyRecordsState();
}

class _AdminElderlyRecordsState extends State<AdminElderlyRecords> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Elderly Records',
              style: TextStyle(color: Colors.black)),
          backgroundColor: Colors.white,
          centerTitle: true,
          elevation: 1,
          leading: IconButton(
            onPressed: () async {
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/adminHome',
                (Route<dynamic> route) {
                  return route.settings.name == '/home';
                },
              );
            },
            icon: const Icon(
              Icons.arrow_back_ios,
              color: Color(0xFF27c1a9),
            ),
          ),
        ),
        body: FutureBuilder(
          future: APIService.getElderly(),
          builder: (BuildContext context,
              AsyncSnapshot<List<ElderlyResponseModel>?> model) {
            if (model.hasData) {
              return ListView.builder(
                shrinkWrap: true,
                physics: const ClampingScrollPhysics(),
                scrollDirection: Axis.vertical,
                padding: const EdgeInsets.all(0),
                itemCount: model.data!.length,
                itemBuilder: (context, index) {
                  print(model.data!.length);
                  return ElderlyRecordItem(model: model.data![index]);
                },
              );
            }
            return const Center(
              child: CircularProgressIndicator(),
            );
          },
        ),

        // body: ListView(
        //   padding: const EdgeInsets.symmetric(horizontal: 15),
        //   children: const [
        //     ElderlyRecordItem(color: Colors.green),
        //     ElderlyRecordItem(color: Colors.red),
        //     ElderlyRecordItem(color: Colors.blue),
        //     ElderlyRecordItem(color: Colors.teal),
        //     ElderlyRecordItem(color: Colors.orange),
        //     ElderlyRecordItem(color: Colors.deepOrange),
        //     ElderlyRecordItem(color: Colors.indigo),
        //   ],
        // ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.pushNamed(
              context,
              '/adminCreateElderly',
            );
          },
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
