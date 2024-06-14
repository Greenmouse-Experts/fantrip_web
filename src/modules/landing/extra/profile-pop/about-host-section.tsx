const AboutHostSection = () => {
  return (
    <div>
      <p className="monts fw-600 text-lg">About</p>
      <div className="monts grid gap-2 mt-3">
        <div className="flex gap-x-2">
          <p>Name:</p>
          <p>John Smith</p>
        </div>
        <div className="flex gap-x-2">
          <p>Location:</p>
          <p>Manchester, Uk.</p>
        </div>
      </div>
      <div className="mt-3 monts">
        <p className="fw-500 mb-2">Bio:</p>
        <p>
          Hi there! I'm John, a die-hard Liverpool FC fan hosting my cozy home
          near Anfield Stadium. Experience the best of Liverpool's football
          culture and cozy comforts during your stay. Let me show you around the
          city and share my passion for the Reds! YNWA!
        </p>
      </div>
    </div>
  );
};

export default AboutHostSection;
