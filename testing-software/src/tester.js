import m from 'mithril';
import svg from './svg';
import canvas from './canvas';
import './main.css';

export default function tester() {
  let gamepad;

  let sensitivity = 2;
  let kf = 0.1;
  let kd = 0.01;
  let button = false;
  let points = 10;

  return {
    oncreate() {
      window.addEventListener('gamepadconnected', (e) => {
        gamepad = e.gamepad;
        m.redraw();
      });

      window.addEventListener('gamepaddisconnected', () => {
        gamepad = null;
        // trigger redraw to update interface
        m.redraw();
      });
    },

    view() {
      return [m(canvas, {
        sensitivity,
        kd,
        kf,
        button,
        points,
      }),
      m('div', { class: 'info-pane' },
        m('p', { class: 'info-pane-title' }, 'rcp joystick tester'),
        gamepad ? m('p', { class: 'info-good' }, `joystick connected ${gamepad.id}`)
          : m('p', { class: 'info-degraded' }, 'joystick not connected'),
        m('p', `sensitivity: ${sensitivity}`),
        m('input', {
          type: 'range',
          min: 0,
          max: 5,
          value: sensitivity,
          step: 0.1,
          oninput: (e) => { sensitivity = e.target.value; },
        }),
        m('p', `kF: ${kf}`),
        m('input', {
          type: 'range',
          min: 0,
          max: 0.5,
          value: kf,
          step: 0.01,
          oninput: (e) => { kf = e.target.value; },
        }),
        m('p', `kD: ${kd}`),
        m('input', {
          type: 'range',
          min: 0,
          max: 0.1,
          value: kd,
          step: 0.01,
          oninput: (e) => { kd = e.target.value; },
        }),
        m('p', `points: ${points}`),
        m('input', {
          type: 'range',
          min: 1,
          max: 25,
          value: points,
          step: 1,
          oninput: (e) => { points = e.target.value; },
        }),
        m('button', {
          disabled: !gamepad,
          onmousedown: () => {
            button = true;
          },
          onmouseup: () => {
            button = false;
          },
        }, 'benchmark'),
        m('footer', m('a', { href: 'https://github.com/kmani314/robot-control-panel' }, 'kmani314/robot-control-panel', m(svg.github))))];
    },
  };
}
