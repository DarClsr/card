import registerPromiseWorker from "promise-worker/register";

registerPromiseWorker(async (message: any) => {
  const fetchVideourl = async (url: string) => {
    return await fetch(url).then((res) => res.arrayBuffer());
  };


  if (message.type === "FETCH_VIDEO") {
    const video_blob = await fetchVideourl(message.url);
    return video_blob;
  }
});
