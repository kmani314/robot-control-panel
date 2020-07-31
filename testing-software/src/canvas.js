import Two from 'two.js';
import m from 'mithril';
import util from './util';
import artifacts from './artifacts';
import './main.css';

export default function canvas() {
  let two;
  let gamepad;

  let width;
  let height;

  let vel = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  let cursor;

  let kf;
  let kd;
  let sensitivity;
  let benchmark = 0;
  let numPoints = 10;
  let points;
  let text;
  let start;

  return {
    oncreate(vnode) {
      width = vnode.dom.clientWidth;
      height = vnode.dom.clientHeight;

      pos = { x: width / 2, y: height / 2 };

      two = new Two({
        type: Two.Types.canvas,
        width,
        height,
      }).appendTo(vnode.dom);

      // resize canvas on window size change
      window.addEventListener('resize', () => {
        width = vnode.dom.clientWidth;
        height = vnode.dom.clientHeight;
      });

      cursor = artifacts.cursor(two, pos.x, pos.y);
      two.bind('update', () => {
        // updates joystick position every animation frame
        [gamepad] = navigator.getGamepads();
        // gamepad has been disconnected
        if (!gamepad) return;

        // calculate position
        ({ newvel: vel, newpos: pos } = util.calcPos(
          gamepad.axes[0],
          gamepad.axes[1],
          kf,
          kd,
          sensitivity,
          vel,
          pos,
          width,
          height,
        ));

        cursor.translation.set(
          pos.x,
          pos.y,
        );

        switch (benchmark) {
          case 0:
            break;
          case 1:
            two.clear();
            text = two.makeText('hit the red circles', 150, 39, {
              size: 24,
            });
            cursor = artifacts.cursor(two, pos.x, pos.y);
            points = Array.from({ length: numPoints },
              () => [Math.floor(Math.random() * width), Math.floor(Math.random() * height)]);

            artifacts.benchmark1(two, points, 0);
            benchmark += 1;
            break;
          default:
            if (benchmark === 2) start = Date.now();

            if (benchmark > 2) {
              text.translation.x = 75;
              text.translation.y = 39;
              text.value = `${((Date.now() - start) / 1000).toFixed(3)}s`;
            }

            if (util.dist(pos.x, points[benchmark - 2][0], pos.y, points[benchmark - 2][1]) < 30) {
              benchmark += 1;
              artifacts.benchmark1(two, points, benchmark - 2);
              if ((benchmark - 2) === points.length) {
                benchmark = 0;
                two.clear();
                text = two.makeText(`${((Date.now() - start) / 1000).toFixed(3)}s`, 75, 39, {
                  size: 24,
                });
                cursor = artifacts.cursor(two, pos.x, pos.y);
              }
            }
        }
      }).play();
    },
    view(vnode) {
      ({
        kf,
        kd,
        sensitivity,
        points: numPoints,
      } = vnode.attrs);

      if (vnode.attrs.button) benchmark = 1;

      return m('div', { class: 'container' });
    },
  };
}
