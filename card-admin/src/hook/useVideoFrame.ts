import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const config = {
  fps: 2,
  w: 720,
  h: 1280,
  framePath: "/frames/image%06.jpg",
};

export const useVideoFrame = () => {
  const ffmpeg = createFFmpeg({ log: true });

  const getFrame = async (filePath: string) => {
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(filePath));
    ffmpeg.FS("mkdir", "frames");
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-qscale:v",
      "1",
      "-vf",
      `fps=${config.fps}`,
      "/frames/image%06d.jpg"
    );

    const files = ffmpeg.FS("readdir", "frames");

    for (let file of files) {
      if (file.indexOf("jpg") > -1) {
        const img_data = await ffmpeg.FS("readFile", `/frames/${file}`);
      }
    }

    await ffmpeg.exit(0);
    //   await ffmpeg.run(...commands);
  };

  return {
    ffmpeg,
    getFrame
  }
};
