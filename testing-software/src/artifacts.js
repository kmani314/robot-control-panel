function cursor(two, x, y) {
  const csr = two.makeCircle(x, y, 25);
  csr.stroke = '#2492e';
  csr.fill = '#28a475';
  csr.linewidth = 5;
  return csr;
}

function benchmark1(two, pts, num) {
  let circle;

  for (let i = 0; i < pts.length; i += 1) {
    circle = two.makeCircle(pts[i][0], pts[i][1], 10);
    circle.linewidth = 5;
    let fill = '#ffffff';
    if (i < num) fill = '#28a475';
    if (i === num) fill = '#d73a49';
    circle.fill = fill;
  }
}

export default { cursor, benchmark1 };
