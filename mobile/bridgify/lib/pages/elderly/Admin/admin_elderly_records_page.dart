import 'package:bridgify/accessories/elderly/elderly_record_item.dart';
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class AdminElderlyRecords extends StatefulWidget {
  const AdminElderlyRecords({super.key});

  @override
  State<AdminElderlyRecords> createState() => _AdminElderlyRecordsState();
}

class _AdminElderlyRecordsState extends State<AdminElderlyRecords> {
  @override
  void initState() {
    super.initState();
    setState(() {});
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
            onPressed: () {
              if (Navigator.canPop(context)) Navigator.pop(context);
            },
            icon: Icon(
              Icons.arrow_back_ios,
              color: HexColor('#207A35'),
            ),
          ),
        ),
        body: Container(
          padding: const EdgeInsets.only(bottom: 25),
          child: FutureBuilder(
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
                    return ElderlyRecordItem(
                        context: context, model: model.data![index]);
                  },
                );
              }
              return const Center(
                child: CircularProgressIndicator(),
              );
            },
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        floatingActionButton: FloatingActionButton(
          backgroundColor: HexColor("#207A35"),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(20.0), // Adjust the radius as needed
          ),
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
