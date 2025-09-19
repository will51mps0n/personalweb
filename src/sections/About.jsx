const KITTY_IPSUM = `Kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff. Sunbathe sleep on your keyboard nap all day chase imaginary bugs, flick tail claw drapes meow loud. Purr mew chirp chew the houseplants jump on the table, nap in the laundry bask in sunbeams.`;

const About = () => {
  return (
    <section id="about" className="snap-section full-height-only about-section">
      <div className="about-inner" data-glitch-content>
        <h2 className="about-title">About Me</h2>
        <div className="about-copy">
          <p>{KITTY_IPSUM}</p>
          <p>
            Kitty ipsum dolor sit amet, bat at the yarn unravel mysterious spaces stalk
            the hallway. Curl up by the window stretch across the notebook, paw at the
            moonlight, chase the whispering breeze then curl back into a donut.
          </p>
          <p>
            Nap on the sofa, supervise every keystroke, and commandeer the comfiest
            blanket. Chirp at birds, chase sparkles in the sunbeams, then purr loudly
            as the day winds down.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
