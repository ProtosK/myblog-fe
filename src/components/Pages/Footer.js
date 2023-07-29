const Footer = () => {
  
  return (
    
    <div className="footer-container col-12 col-sm-4">
      <ul class="social-icon">
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul>
      <ul class="menu">
        <li class="menu__item">
          <a class="menu__link" href="#">
            Home
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">
            About
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">
            Services
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">
            Team
          </a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="#">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
