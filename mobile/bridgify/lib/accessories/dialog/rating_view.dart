import 'dart:math';

import 'package:snippet_coder_utils/hex_color.dart';
import 'package:flutter/material.dart';

class RatingView extends StatefulWidget {
  const RatingView({super.key});

  @override
  State<RatingView> createState() => _RatingViewState();
}

class _RatingViewState extends State<RatingView> {
  final _ratingPageController = PageController();
  var _starPosition = 200.0;
  var _rating = 0;
  var _hasSkipped = false;
  var _selectedChipIndex = -1;
  var _isMoreDetailActive = false;
  final _moreDetailFocusNode = FocusNode();
  final List<String> category = ['Friendliness', 'Promptness', 'Knowledge'];

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          children: [
            SizedBox(
              height: max(300, MediaQuery.of(context).size.height * 0.3),
              child: PageView(
                physics: const NeverScrollableScrollPhysics(),
                controller: _ratingPageController,
                children: [
                  _buildThanksNote(),
                  _causeOfRating(),
                ],
              ),
            ),
            //done button
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: Container(
                color: HexColor("#33A11D"),
                child: MaterialButton(
                  onPressed: _hideDialog,
                  textColor: Colors.white,
                  child: const Text('Done'),
                ),
              ),
            ),
            //skip button
            if (!_hasSkipped)
              Positioned(
                right: 0,
                child: MaterialButton(
                  onPressed: /*_hideDialog*/
                      () {
                    _ratingPageController.nextPage(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeIn);
                    setState(() {
                      _starPosition = 30.0;
                      _rating = 0;
                      _hasSkipped = true;
                    });
                  },
                  child: const Text('Skip'),
                ),
              ),
            //star rating
            AnimatedPositioned(
              top: _starPosition,
              left: 0,
              right: 0,
              duration: const Duration(milliseconds: 300),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  5,
                  (index) => IconButton(
                    icon: index < _rating
                        ? const Icon(
                            Icons.star,
                            size: 32,
                          )
                        : const Icon(Icons.star_border, size: 32),
                    color: HexColor("#33A11D"),
                    onPressed: () {
                      _ratingPageController.nextPage(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeIn);
                      setState(() {
                        _starPosition = 30.0;
                        _rating = index + 1;
                        _hasSkipped = true;
                      });
                    },
                  ),
                ),
              ),
            ),
            //back button
            if (_isMoreDetailActive)
              Positioned(
                left: 0,
                top: 0,
                child: MaterialButton(
                  onPressed: () {
                    setState(() {
                      _starPosition = 30.0;
                      _isMoreDetailActive = false;
                    });
                  },
                  child: const Icon(
                    Icons.arrow_back_ios,
                    color: Colors.black,
                  ),
                ),
              ),
          ],
        ));
  }

  _buildThanksNote() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          'Thanks for chatting with \n us on Bridgify',
          style: TextStyle(
            fontSize: 24,
            color: HexColor("#33A11D"),
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const Text('We\'d love to get your feedback.'),
        const Text('How has your experience been?'),
        const SizedBox(height: 30)
      ],
    );
  }

  _causeOfRating() {
    return Stack(
      alignment: Alignment.center,
      children: [
        Visibility(
          visible: !_isMoreDetailActive,
          replacement: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _selectedChipIndex != -1
                  ? const Text('Tell us more')
                  : const Text('Please share your experience'),
              if (_selectedChipIndex != -1)
                Chip(
                  label: Text('Text ${_selectedChipIndex + 1}'),
                ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: TextField(
                  focusNode: _moreDetailFocusNode,
                  decoration: InputDecoration(
                    hintText: 'Write your review here...',
                    hintStyle: TextStyle(
                      color: Colors.grey[400],
                    ),
                    border: InputBorder.none,
                  ),
                ),
              )
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('What could be better'),
              //Cause selection
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 8.0,
                children: List.generate(
                  3,
                  (index) => InkWell(
                    onTap: () {
                      setState(() {
                        _selectedChipIndex = index;
                      });
                    },
                    child: Chip(
                      backgroundColor: _selectedChipIndex == index
                          ? HexColor("#33A11D")
                          : Colors.grey[300],
                      label: Text(category[index]),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              //More button
              InkWell(
                onTap: () {
                  _moreDetailFocusNode.requestFocus();
                  setState(() {
                    _starPosition = 50.0;
                    _isMoreDetailActive = true;
                  });
                },
                child: const Text(
                  'Want to tell us more?',
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
        ),
      ],
    );
  }

  _hideDialog() {
    if (Navigator.canPop(context)) Navigator.pop(context);
  }
}
