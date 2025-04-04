interface UserCardProps {
  name: string;
  postCount: number;
}

const UserCard = ({ name, postCount }: UserCardProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">Posts: {postCount}</p>
    </div>
  );
};

export default UserCard;
