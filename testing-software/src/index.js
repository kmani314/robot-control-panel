import m from 'mithril';
import Tester from './tester';

m.mount(document.body, {
  view: () => m(Tester, { width: window.innerWidth, height: window.innerHeight }),
});
