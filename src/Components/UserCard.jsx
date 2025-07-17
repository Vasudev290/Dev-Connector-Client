const UserCard = (props) => {
  const { user } = props;
  const { firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age+",  "+ gender}</p>
          <p><strong>{skills.join(", ")}</strong></p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Intersted</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
