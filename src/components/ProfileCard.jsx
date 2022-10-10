const ProfileCard = () => {
  return (
    <div className="w-full bg-white rounded border">
      <div className="w-1/2 mx-auto h-auto flex flex-col  justify-center items-center">
        <img
          className="w-44 h-44 my-10 object-cover rounded-full"
          src="https://ted-conferences-speaker-photos-production.s3.amazonaws.com/yoa4pm3vyerco6hqbhjxly3bf41d"
        />
        <h2 className="font-bold pb-10 text-3xl">Spend Bill Gates's Money</h2>
      </div>
    </div>
  );
};
export default ProfileCard;
