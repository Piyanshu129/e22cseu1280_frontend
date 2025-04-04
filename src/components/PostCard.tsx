interface PostCardProps {
  title: string;
  body: string;
  commentCount?: number;
}

const PostCard = ({ title, body, commentCount }: PostCardProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{body}</p>
      {commentCount !== undefined && (
        <p className="text-blue-500">Comments: {commentCount}</p>
      )}
    </div>
  );
};

export default PostCard;
