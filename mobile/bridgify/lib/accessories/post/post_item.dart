import 'package:flutter/material.dart';

class PostItem extends StatelessWidget {
  const PostItem({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 15, right: 15, bottom: 20),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.asset('images/img1.jpeg',
                fit: BoxFit.cover, height: 120, width: 100),
            // child: Image.asset('assets/images/food4.jpg', fit: BoxFit.cover, height: 120, width: 100),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Here is Product Title',
                    style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 5),
                Text(
                  'Here is the description of this project, kindly read it carefully. We offer 10% discount on this product.',
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(height: 1.5),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 5),
                Text('Rs.500 PKR',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1))
              ],
            ),
          )
        ],
      ),
    );
  }
}
