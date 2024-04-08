import './style.css'
const BouncingBall = () => {
  return (
    <div className="contain">
      <div className="shadow"></div>
      <div className="gravity">
        <div className="ball"></div>
      </div>
    </div>
  );
};

export default BouncingBall;
