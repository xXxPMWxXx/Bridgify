// import 'dart:io';

// import 'package:bridgify/accessories/profile/user_avatar.dart';
// import 'package:bridgify/services/api_service.dart';
// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';

// Widget picPicker(
//   BuildContext context,
//   bool isImageSelected,
//   String fileName,
//   Function onFilePicked,
// ) {
//   Future<XFile?> _imageFile;
//   ImagePicker _picker = ImagePicker();

//   return GestureDetector(
//     onTap: () {
//       _imageFile =
//           _picker.pickImage(source: ImageSource.gallery);
//       _imageFile.then((file) async {
//         (file) => {
//               setState(() {
//                 imagePathUpdate = file?.path;
//               })
//             };
//         Navigator.of(context).pop();
//       });
//     },
//     child: Center(
//       child: Stack(
//         children: [
//           Container(
//             width: 130,
//             height: 130,
//             decoration: BoxDecoration(
//                 border: Border.all(
//                   width: 4,
//                   color: Theme.of(context).scaffoldBackgroundColor,
//                 ),
//                 boxShadow: [
//                   BoxShadow(
//                       spreadRadius: 2,
//                       blurRadius: 10,
//                       color: Colors.black.withOpacity(0.1),
//                       offset: const Offset(0, 10))
//                 ],
//                 shape: BoxShape.circle),
//             child: FutureBuilder(
//               future: APIService.getUserProfile(),
//               builder: (BuildContext context, AsyncSnapshot<Object> model) {
//                 var userProfileData = model.data as Map<String, dynamic>?;

//                 if (model.hasData) {
//                   var imagePath = userProfileData?["imagePath"];

//                   return imagePath != "" && imagePath != null
//                       ? CircleAvatar(
//                           radius: 32,
//                           backgroundImage: Image.network(imagePath).image)
//                       : const UserAvatar(filename: 'img1.jpeg', radius: 32);
//                 }
//                 return const Center(
//                   child: CircularProgressIndicator(),
//                 );
//               },
//             ),
//           ),
//           Positioned(
//             bottom: 0,
//             right: 0,
//             child: Container(
//               height: 40,
//               width: 40,
//               decoration: BoxDecoration(
//                 color: Color(0xFF27c1a9),
//                 shape: BoxShape.circle,
//                 border: Border.all(
//                     color: Theme.of(context).scaffoldBackgroundColor),
//               ),
//               child: const Icon(Icons.edit, color: Colors.white),
//             ),
//           ),
//         ],
//       ),
//     ),
//     child: Center(
//       child: Column(
//         children: [
//           fileName.isNotEmpty
//               ? isImageSelected
//                   ? Image.file(
//                       File(fileName),
//                       width: 300,
//                       height: 300,
//                     )
//                   : SizedBox(
//                       child: Image.network(
//                         fileName,
//                         width: 200,
//                         height: 200,
//                         fit: BoxFit.scaleDown,
//                       ),
//                     )
//               : SizedBox(
//                   child: Image.network(
//                     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
//                     width: 200,
//                     height: 200,
//                     fit: BoxFit.scaleDown,
//                   ),
//                 ),
//         ],
//       ),
//     ),
//   );
// }
