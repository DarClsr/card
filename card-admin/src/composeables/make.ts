export const UseMake = () => {
  const template_data = [
    {
      duration: 4,
      text: "场景1",
      color: "red",
      top: "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740373270-4d3975d76132ea33.jpg",
      bottom:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740373270-4d3975d76132ea33.jpg",
      image:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740372826-7c2b01e63c6c5071.jpg?x-oss-process=image/resize,w_720",
    },
    {
      duration: 4,
      color: "blue",
      text: "场景2",
      top: "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740372826-7c2b01e63c6c5071.jpg?x-oss-process=image/resize,w_720",
      bottom:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740372826-7c2b01e63c6c5071.jpg?x-oss-process=image/resize,w_720",
      video:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/videos/1669366990765-0de2dfc80dc7b347.mp4",
    },
    {
      duration: 2,
      color: "#fff",
      text: "无上下贴片场景3",
      video:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/videos/1669366990765-0de2dfc80dc7b347.mp4",
    },
    {
      duration: 4,
      text: "无上下贴片场景4",
      color: "orange",
      image:
        "https://tradeplus.oss-cn-hangzhou.aliyuncs.com/files/1668740372826-7c2b01e63c6c5071.jpg?x-oss-process=image/resize,w_720",
    },
  ];

  

  const getTemplateData = () => {
    let result: any = [];
    let start = 0;
    for (let index in template_data) {
      const prev = result[Number(index) - 1];
      const item = template_data[index];
      if (prev) {
        start = prev.end;
      }
      result.push({
        start: start,
        end: (start += item.duration * 1000),
        ...item,
      });
    }
    return JSON.parse(JSON.stringify(result));
  };

  return {
    getTemplateData,
  };
};
