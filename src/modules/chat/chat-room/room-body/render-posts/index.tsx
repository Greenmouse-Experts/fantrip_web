import ImagePostRender from "./components/image-post-render";
import TextPostRender from "./components/text-post-render";
import VideoPostRender from "./components/video-post-render";

const RenderPostsIndex = () => {
  const posts = [
    {
      posterName: "Charline",
      role: "guest",
      type: "image",
      post: "Another win from La Albiceleste, they qualify to the finals 😊",
      like: 22,
      dislike: 16,
      comment: 4,
      image: "",
      file: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721917870/fantrip/match_1_p6nva5.png",
      time: "1 hour ago",
    },
    {
      posterName: "Pale Pinky",
      role: "guest",
      type: "video",
      post: "Preparation for the summer olympics in paris, too exited",
      like: 32,
      dislike: 6,
      comment: 10,
      file: "https://res.cloudinary.com/greenmouse-tech/video/upload/v1721917861/fantrip/sample_640x360_y7vsr1.mp4",
      time: "2 hour ago",
    },
    {
      posterName: "Chritain Yelpin",
      role: "host",
      type: "text",
      post: "Off the airport, buzzed to go see man-utd defeat chelsea in stanford bridge...Up reds!! 😊",
      like: 90,
      dislike: 10,
      comment: 4,
      file: "",
      image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1718361981/fantrip/profile_be8gmr.jpg",
      time: "2 hour ago",
    },
  ];
  return (
    <div className="grid mt-4">
      {posts.map((item, i) => {
        if (item.type === "text") return <TextPostRender item={item} key={i}/>;
        if(item.type === "image") return <ImagePostRender item={item} key={i}/>;
        if(item.type === "video") return <VideoPostRender item={item} key={i}/>
      })}
    </div>
  );
};

export default RenderPostsIndex;
