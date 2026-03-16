// Destiny Matrix calculation utilities based on web version logic

export interface MatrixPoints {
  apoint: number;
  bpoint: number;
  cpoint: number;
  dpoint: number;
  epoint: number;
  fpoint: number;
  gpoint: number;
  hpoint: number;
  ipoint: number;
  jpoint: number;
  kpoint: number;
  lpoint: number;
  mpoint: number;
  npoint: number;
  opoint: number;
  ppoint: number;
  qpoint: number;
  rpoint: number;
  spoint: number;
  tpoint: number;
  upoint: number;
  vpoint: number;
  wpoint: number;
  xpoint: number;
  f2point: number;
  f1point: number;
  g2point: number;
  g1point: number;
  i2point: number;
  i1point: number;
  h2point: number;
  h1point: number;
}

export interface MatrixPurposes {
  skypoint: number;
  earthpoint: number;
  perspurpose: number;
  femalepoint: number;
  malepoint: number;
  socialpurpose: number;
  generalpurpose: number;
  planetarypurpose: number;
}

export interface ChartHeart {
  sahphysics: number;
  ajphysics: number;
  vishphysics: number;
  anahphysics: number;
  manphysics: number;
  svadphysics: number;
  mulphysics: number;
  sahenergy: number;
  ajenergy: number;
  vishenergy: number;
  anahenergy: number;
  manenergy: number;
  svadenergy: number;
  mulenergy: number;
  sahemotions: number;
  ajemotions: number;
  vishemotions: number;
  anahemotions: number;
  manemotions: number;
  svademotions: number;
  mulemotions: number;
}

export const reduceNumber = (number: number): number => {
  let num = number;
  if (number > 22) {
    num = (number % 10) + Math.floor(number / 10);
  }
  return num;
};

export const calculateYear = (year: number): number => {
  let y = 0;
  while (year > 0) {
    y += year % 10;
    year = Math.floor(year / 10);
  }
  y = reduceNumber(y);
  return y;
};

export const calculatePoints = (aPoint: number, bPoint: number, cPoint: number): {
  points: MatrixPoints;
  purposes: MatrixPurposes;
  chartHeart: ChartHeart;
} => {
  const dpoint = reduceNumber(aPoint + bPoint + cPoint);
  const epoint = reduceNumber(aPoint + bPoint + cPoint + dpoint);
  const fpoint = reduceNumber(aPoint + bPoint);
  const gpoint = reduceNumber(bPoint + cPoint);
  const hpoint = reduceNumber(dpoint + aPoint);
  const ipoint = reduceNumber(cPoint + dpoint);
  const jpoint = reduceNumber(dpoint + epoint);

  const npoint = reduceNumber(cPoint + epoint);
  const lpoint = reduceNumber(jpoint + npoint);
  const mpoint = reduceNumber(lpoint + npoint);
  const kpoint = reduceNumber(jpoint + lpoint);

  const qpoint = reduceNumber(npoint + cPoint);
  const rpoint = reduceNumber(jpoint + dpoint);
  const spoint = reduceNumber(aPoint + epoint);
  const tpoint = reduceNumber(bPoint + epoint);

  const opoint = reduceNumber(aPoint + spoint);
  const ppoint = reduceNumber(bPoint + tpoint);

  const upoint = reduceNumber(fpoint + gpoint + hpoint + ipoint);
  const vpoint = reduceNumber(epoint + upoint);
  const wpoint = reduceNumber(spoint + epoint);
  const xpoint = reduceNumber(tpoint + epoint);

  const f2point = reduceNumber(fpoint + upoint);
  const f1point = reduceNumber(fpoint + f2point);
  const g2point = reduceNumber(gpoint + upoint);
  const g1point = reduceNumber(gpoint + g2point);
  const i2point = reduceNumber(ipoint + upoint);
  const i1point = reduceNumber(ipoint + i2point);
  const h2point = reduceNumber(hpoint + upoint);
  const h1point = reduceNumber(hpoint + h2point);

  // Purposes calculations
  const skypoint = reduceNumber(bPoint + dpoint);
  const earthpoint = reduceNumber(aPoint + cPoint);
  const perspurpose = reduceNumber(skypoint + earthpoint);
  const femalepoint = reduceNumber(gpoint + hpoint);
  const malepoint = reduceNumber(fpoint + ipoint);
  const socialpurpose = reduceNumber(femalepoint + malepoint);
  const generalpurpose = reduceNumber(perspurpose + socialpurpose);
  const planetarypurpose = reduceNumber(socialpurpose + generalpurpose);

  const points: MatrixPoints = {
    apoint: aPoint,
    bpoint: bPoint,
    cpoint: cPoint,
    dpoint: dpoint,
    epoint: epoint,
    fpoint: fpoint,
    gpoint: gpoint,
    hpoint: hpoint,
    ipoint: ipoint,
    jpoint: jpoint,
    kpoint: kpoint,
    lpoint: lpoint,
    mpoint: mpoint,
    npoint: npoint,
    opoint: opoint,
    ppoint: ppoint,
    qpoint: qpoint,
    rpoint: rpoint,
    spoint: spoint,
    tpoint: tpoint,
    upoint: upoint,
    vpoint: vpoint,
    wpoint: wpoint,
    xpoint: xpoint,
    f2point: f2point,
    f1point: f1point,
    g2point: g2point,
    g1point: g1point,
    i2point: i2point,
    i1point: i1point,
    h2point: h2point,
    h1point: h1point,
  };

  const purposes: MatrixPurposes = {
    skypoint: skypoint,
    earthpoint: earthpoint,
    perspurpose: perspurpose,
    femalepoint: femalepoint,
    malepoint: malepoint,
    socialpurpose: socialpurpose,
    generalpurpose: generalpurpose,
    planetarypurpose: planetarypurpose
  };

  const chartHeart: ChartHeart = {
    sahphysics: aPoint,
    ajphysics: opoint,
    vishphysics: spoint,
    anahphysics: wpoint,
    manphysics: epoint,
    svadphysics: jpoint,
    mulphysics: cPoint,

    sahenergy: bPoint,
    ajenergy: ppoint,
    vishenergy: tpoint,
    anahenergy: xpoint,
    manenergy: epoint,
    svadenergy: npoint,
    mulenergy: dpoint,

    sahemotions: reduceNumber(aPoint + bPoint),
    ajemotions: reduceNumber(opoint + ppoint),
    vishemotions: reduceNumber(spoint + tpoint),
    anahemotions: reduceNumber(wpoint + xpoint),
    manemotions: reduceNumber(epoint + epoint),
    svademotions: reduceNumber(jpoint + npoint),
    mulemotions: reduceNumber(cPoint + dpoint),
  };

  return { points, purposes, chartHeart };
};

// Convert matrix points to array format for MatrixSVG component
export const matrixPointsToArray = (points: MatrixPoints): { value: number }[] => {
  return [
    { value: points.epoint }, // 0 - center
    { value: points.apoint }, // 1 - A (day)
    { value: points.bpoint }, // 2 - B (month)
    { value: points.cpoint }, // 3 - C (year)
    { value: points.dpoint }, // 4 - D
    { value: points.fpoint }, // 5 - F
    { value: points.gpoint }, // 6 - G
    { value: points.ipoint }, // 7 - I
    { value: points.hpoint }, // 8 - H
    { value: points.spoint }, // 9 - S
    { value: points.tpoint }, // 10 - T
    { value: points.npoint }, // 11 - N
    { value: points.jpoint }, // 12 - J
    { value: points.wpoint }, // 13 - W
    { value: points.xpoint }, // 14 - X
    { value: points.lpoint }, // 15 - L
    { value: points.kpoint }, // 16 - K
    { value: points.opoint }, // 17 - O
    { value: points.ppoint }, // 18 - P
    { value: points.qpoint }, // 19 - Q
    { value: points.rpoint }, // 20 - R
    { value: 0 }, // 21 - unused
    { value: 0 }, // 22 - unused
    { value: 0 }, // 23 - unused
    { value: 0 }, // 24 - unused
    { value: points.mpoint }, // 25 - M
    { value: points.f1point }, // 26 - F1
    { value: points.f2point }, // 27 - F2
    { value: points.g1point }, // 28 - G1
    { value: points.g2point }, // 29 - G2
    { value: points.i1point }, // 30 - I1
    { value: points.i2point }, // 31 - I2
    { value: points.h1point }, // 32 - H1
    { value: points.h2point }, // 33 - H2
    { value: points.upoint }, // 34 - U
    { value: points.vpoint }, // 35 - V
  ];
};

// Parse date string and calculate matrix
export const calculateMatrixFromDate = (dateString: string): {
  points: MatrixPoints;
  purposes: MatrixPurposes;
  chartHeart: ChartHeart;
  matrixArray: { value: number }[];
} | null => {
  // Parse date in format DD.MM.YYYY or YYYY-MM-DD
  let day: number, month: number, year: number;
  
  if (dateString.includes('.')) {
    const parts = dateString.split('.');
    if (parts.length !== 3) return null;
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
    year = parseInt(parts[2]);
  } else if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    year = parseInt(parts[0]);
    month = parseInt(parts[1]);
    day = parseInt(parts[2]);
  } else {
    return null;
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) return null;

  const aPoint = reduceNumber(day);
  const bPoint = reduceNumber(month);
  const cPoint = calculateYear(year);

  const result = calculatePoints(aPoint, bPoint, cPoint);
  const matrixArray = matrixPointsToArray(result.points);

  return {
    ...result,
    matrixArray
  };
};