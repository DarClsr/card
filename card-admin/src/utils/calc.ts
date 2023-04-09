export const  calculateImage = (pw:number, ph:number, w:number, h:number) => {
    let px = 0;
    let py = 0;
    if (pw < w && ph < h) {
      px = 0.5 * w - 0.5 * pw;
      py = 0.5 * h - 0.5 * ph;
    } else if (ph / pw > h / w) {
      var uu = ph;
      ph = h;
      pw = (pw * h) / uu;
      px = 0.5 * w - 0.5 * pw;
    } else {
      var uu = pw;
      pw = w;
      ph = (ph * pw) / uu;
      py = 0.5 * h - 0.5 * ph;
    }
    return { px, py, pw, ph };
  };