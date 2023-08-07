import 'package:bridgify/config.dart';
import 'package:bridgify/models/elderly_request_model.dart' as req;
import 'package:bridgify/models/elderly_response_model.dart';
import 'package:bridgify/pages/elderly/Admin/update_status.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class ElderlyRecordItem extends StatelessWidget {
  final ElderlyResponseModel? model;
  final BuildContext context;
  const ElderlyRecordItem(
      {Key? key, required this.context, required this.model})
      : super(key: key);

  @override
  Widget build(context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
              offset: const Offset(0, 5),
              color: Theme.of(context).primaryColor.withOpacity(.2),
              spreadRadius: 2,
              blurRadius: 5)
        ],
      ),
      child: Row(
        children: [
          SizedBox(
            height: 100,
            width: 75,
            child: Container(
              decoration:
                  BoxDecoration(borderRadius: BorderRadius.circular(20)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(
                  'http://${Config.apiURL}/images/trained_face/${model!.photo}',
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Elderly ID: ${model!.id}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    'Name: ${model!.name}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    'Date Of Birth: ${model!.dob}',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: Colors.grey),
                  ),
                ],
              ),
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: EdgeInsets.symmetric(
                  vertical: 25,
                ),
                decoration: BoxDecoration(
                  color: HexColor("#207A35"),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(8.0),
                      bottomRight: Radius.circular(8.0)),
                ),
                child: IconButton(
                  onPressed: () {
                    req.ElderlyRequestModel elderlyRequestModel =
                        req.ElderlyRequestModel();
                    elderlyRequestModel.id = model!.id;
                    elderlyRequestModel.name = model!.name;
                    elderlyRequestModel.dob = model!.dob;
                    elderlyRequestModel.photo = model!.photo;

                    //set status
                    elderlyRequestModel.status = req.Status();
                    elderlyRequestModel.status!.current_activity =
                        model!.status!.current_activity;
                    elderlyRequestModel.status!.current_temp =
                        model!.status!.current_temp;
                    elderlyRequestModel.status!.medication =
                        model!.status!.medication;
                    elderlyRequestModel.status!.taken_med =
                        model!.status!.taken_med;
                    elderlyRequestModel.status!.condition =
                        model!.status!.condition;
                    elderlyRequestModel.status!.condition_description =
                        model!.status!.condition_description;
                    elderlyRequestModel.status!.awake = model!.status!.awake;
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => UpdateStatus(
                            model: elderlyRequestModel,
                            transactionType: 'update'),
                      ),
                    );
                  },
                  icon: Icon(
                    Icons.update,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
