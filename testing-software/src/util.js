function calcPos(gx, gy, kf, kd, sensitivity, vel, pos, width, height) {
  const x = vel.x + sensitivity * gx;
  const y = vel.y + sensitivity * gy;

  // velocity vector
  const mag = Math.sqrt(vel.x ** 2 + vel.y ** 2);
  let xf = 0;
  let yf = 0;
  let xd = 0;
  let yd = 0;

  if (mag) {
    [xf, yf] = [(-vel.x * kf) / mag, (-vel.y * kf) / mag];
    [xd, yd] = [Math.sign(x) * (kd * (-vel.x) ** 2), Math.sign(y) * (kd * (-vel.y) ** 2)];
  }

  if (Math.sign(x) !== Math.sign(x + xf)) xf = -x;
  if (Math.sign(y) !== Math.sign(y + yf)) yf = -y;

  const newvel = {
    x: x + xf - xd,
    y: y + yf - yd,
  };

  const newpos = { x: pos.x + newvel.x, y: pos.y + newvel.y };

  if (pos.x > width || pos.x < 0) {
    newpos.x = newpos.x > 0 ? width : 0;
    newvel.x = 0;
  }

  if (pos.y > height || pos.y < 0) {
    newpos.y = newpos.y > 0 ? height : 0;
    newvel.y = 0;
  }

  return {
    newvel,
    newpos,
  };
}

function dist(x1, x2, y1, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
export default { calcPos, dist };
