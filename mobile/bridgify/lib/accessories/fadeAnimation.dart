import 'package:flutter/material.dart';
import 'package:simple_animations/multi_tween/multi_tween.dart';
import 'package:simple_animations/stateless_animation/play_animation.dart';

class FadeAnimation extends StatelessWidget {
  final double delay;
  final Widget child;

  const FadeAnimation(this.delay, this.child, {super.key});

  @override
  Widget build(BuildContext context) {
    final tween = MultiTween<String>()
      ..add("opacity", Tween(begin: 0.0, end: 1.0),
          const Duration(milliseconds: 500))
      ..add("translateY", Tween(begin: -30.0, end: 0.0),
          const Duration(milliseconds: 500), Curves.easeOut);

    return PlayAnimation<MultiTweenValues<String>>(
      delay: Duration(milliseconds: (500 * delay).round()),
      duration: tween.duration,
      tween: tween,
      child: child,
      builder: (context, child, animation) => Opacity(
        opacity: animation.get("opacity"),
        child: Transform.translate(
            offset: Offset(0, animation.get("translateY")), child: child),
      ),
    );
  }
}
