import React, { useState } from 'react';

const App = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  
  // Tiffin menu items data
  const menuItems = [
    {
      id: 1,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato curry',
      price: 40,
      image: '/tiffins/masala.jpg'
    },
    {
      id: 2,
      name: 'Plain Dosa',
      description: 'Traditional rice crepe served with sambar and chutney',
      price: 40,
      image: '/tiffins/plaindosa.webp'
    },
    {
      id: 3,
      name: 'Cut Dosa',
      description: 'Crispy dosa cut into pieces, served with sambar and chutney',
      price: 55,
      image: '/tiffins/cutdosa.jpg'
    },
    {
      id: 4,
      name: 'Onion Dosa',
      description: 'Dosa topped with sautéed onions and spices',
      price: 55,
      image: '/tiffins/Onion-Masala-Dosa.jpg'
    },
    {
      id: 5,
      name: 'Uthappam',
      description: 'Thick pancake with vegetables and spices',
      price: 55,
      image: '/tiffins/uttapam.jpg'
    },
    {
      id: 6,
      name: 'Upma Dosa',
      description: 'Dosa filled with savory semolina upma',
      price: 55,
      image: '/tiffins/upmadosa.jpg'
    },
    {
      id: 7,
      name: 'Neeyi Dosa',
      description: 'Ghee-roasted dosa with delicious aroma',
      price: 55,
      image: '/tiffins/upma.webp'
    },
    {
      id: 8,
      name: 'Mysoor Bajji',
      description: 'Deep-fried spiced potato fritter with Mysore touch',
      price: 40,
      image: '/tiffins/Mysoor-Bajji.jpg'
    },
    {
      id: 9,
      name: 'Poori',
      description: 'Deep-fried wheat bread served with potato curry',
      price: 40,
      image: '/tiffins/poori.png'
    },
    {
      id: 10,
      name: 'Idli',
      description: 'Steamed rice cake served with sambar and chutney',
      price: 40,
      image: '/tiffins/idly.jpg'
    },
    {
      id: 11,
      name: 'Upma',
      description: 'Savory semolina porridge with vegetables',
      price: 35,
      image: '/tiffins/upma 1.webp'
    },
    {
      id: 12,
      name: 'Ragi Dosa',
      description: 'Nutritious finger millet dosa with health benefits',
      price: 55,
      image: '/tiffins/ragi.jpg'
    },
    {
      id: 13,
      name: 'Vada',
      description: 'Crispy fried lentil donuts served with sambar',
      price: 40,
      image: '/tiffins/vadaa.jpg'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      comment: "The masala dosa here is simply outstanding! Authentic South Indian flavors that remind me of home.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      comment: "We visit every weekend for their idli and vada. The sambhar is the best in town!",
      rating: 5
    },
    {
      id: 3,
      name: "David Wilson",
      comment: "First time trying South Indian cuisine and I'm hooked! The staff was very helpful in recommending dishes.",
      rating: 4
    }
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setActiveNav(sectionId);
    setShowMobileMenu(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <h1>Neelakantam Tiffins</h1>
          </div>
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${showMobileMenu ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`navigation ${showMobileMenu ? 'show' : ''}`}>
        <div className="container">
          <ul className="nav-list">
            <li className={activeNav === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
            <li className={activeNav === 'menu' ? 'active' : ''} onClick={() => scrollToSection('menu')}>Menu</li>
            <li className={activeNav === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About Us</li>
            <li className={activeNav === 'testimonials' ? 'active' : ''} onClick={() => scrollToSection('testimonials')}>Testimonials</li>
            <li className={activeNav === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Experience Authentic South Indian Flavors</h1>
          <p>Serving the finest South Indian delicacies with traditional recipes passed down through generations</p>
          <button className="btn-primary" onClick={() => scrollToSection('menu')}>View Our Menu</button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu section">
        <div className="container">
          <div className="section-title">
            <h2>Our Special Tiffin Menu</h2>
            <div className="underline"></div>
          </div>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="menu-card-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price">₹{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
            <div className="underline"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
            <h3>Our Story</h3>
            <p>Started in Mahbubnagar 20 years ago, Neelakantam Tiffins has been proudly serving delicious and authentic South Indian tiffins ever since. We’ve stayed true to traditional recipes, bringing the real taste of South India to every plate.</p>
            <p>Our food is prepared using fresh, high-quality ingredients, and we serve it on natural banana leaves to give our customers a truly traditional Indian experience. This small detail reflects our big commitment to culture and authenticity.</p>
            <p>What began as a small tiffin center has now become a trusted name in Mahbubnagar, loved for its homely flavors, simple charm, and warm hospitality.</p>
          </div>

            <div className="about-image">
              <img src="center.jpg" alt="Restaurant" />
            </div>
          </div>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🍲</div>
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest and highest quality ingredients in all our dishes.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Our experienced chefs are masters in preparing authentic South Indian cuisine.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌿</div>
              <h3>Vegetarian Friendly</h3>
              <p>Wide range of vegetarian options to satisfy all preferences.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials section">
  <div className="container">
    <div className="section-title">
      <h2>What Our Customers Say</h2>
      <div className="underline"></div>
    </div>
    <div className="testimonials-grid">
      {/* Using testimonials with proper image paths */}
      {[
        {
          id: 1,
          name: "Sarah Johnson",
          rating: 5,
          comment: "This product exceeded all my expectations. The customer service team was incredibly helpful throughout the entire process.",
          image: './ratings/one.jpg'
        },
        {
          id: 2,
          name: "Michael Chen",
          rating: 4,
          comment: "Great value for the price. I've been using it for 3 months now and it has significantly improved my workflow.",
          image: './ratings/two.jpg'
        },
        {
          id: 3,
          name: "Jessica Williams",
          rating: 5,
          comment: "Absolutely love this! It solved all the problems I was facing with my previous solution. Highly recommended!",
          image: './ratings/three.jpg'
        },
        {
          id: 4,
          name: "David Rodriguez",
          rating: 4,
          comment: "The quality is outstanding. Would definitely purchase again and recommend to friends and colleagues.",
          image: './ratings/four.jpg'
        },
        {
          id: 5,
          name: "Emma Thompson",
          rating: 5,
          comment: "This has been a game-changer for my business. The time I save using this solution is invaluable.",
          image: './ratings/five.jpg'
        }
      ].map((testimonial) => (
        <div className="testimonial-card" key={testimonial.id}>
          <div className="testimonial-image">
            <img 
              src={testimonial.image} 
              alt={`${testimonial.name}`} 
              className="testimonial-avatar"
              width="120"
              height="120"
            />
          </div>
          <div className="testimonial-content">
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p>
            <div className="testimonial-author">- {testimonial.name}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <div className="section-title">
            <h2>Contact Us</h2>
            <div className="underline"></div>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Food Street, Cuisine City, 560001</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>info@southindiandelights.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h3>Hours</h3>
                  <p>Daily: 7:00 AM - 10:30 PM</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a message</h3>
              <div className="form-container">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    placeholder="Your Message" 
                    rows="5" 
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>South Indian Delights</h3>
              <p>Serving authentic South Indian cuisine since 1985.</p>
              <div className="social-links">
                <a href="#" className="social-icon">FB</a>
                <a href="#" className="social-icon">IG</a>
                <a href="#" className="social-icon">TW</a>
                <a href="#" className="social-icon">YT</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                <li><a href="#menu" onClick={() => scrollToSection('menu')}>Menu</a></li>
                <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Our Locations</h3>
              <ul>
                <li>Cuisine City</li>
                <li>Food Town</li>
                <li>Flavor Avenue</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} South Indian Delights. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Global Styles */

        .testimonial-avatar {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border: 3px solid #f8f8f8;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        :root {
          --primary-color: #e63946;
          --secondary-color: #457b9d;
          --background-color: #f1faee;
          --text-color: #1d3557;
          --light-text: #f1faee;
          --card-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }
        
        body {
          background-color: var(--background-color);
          color: var(--text-color);
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section {
          padding: 5rem 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .underline {
          height: 3px;
          width: 100px;
          background-color: var(--primary-color);
          margin: 0 auto;
        }
        
        .btn-primary {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: var(--transition);
        }
        
        .btn-primary:hover {
          background-color: #c1272d;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Header Styles */
        .header {
          background-color: var(--primary-color);
          color: var(--light-text);
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo h1 {
          font-size: 1.8rem;
          margin-bottom: 0.1rem;
        }
        
        .logo p {
          font-size: 0.9rem;
        }
        
        .mobile-menu-toggle {
          display: none;
        }
        
        /* Navigation Styles */
        .navigation {
          background-color: var(--secondary-color);
          padding: 0.5rem 0;
          position: fixed;
          width: 100%;
          top: 70px;
          z-index: 999;
        }
        
        .nav-list {
          display: flex;
          justify-content: center;
          list-style: none;
        }
        
        .nav-list li {
          margin: 0 1.5rem;
          padding: 0.5rem 0;
          color: var(--light-text);
          cursor: pointer;
          position: relative;
          transition: var(--transition);
        }
        
        .nav-list li:hover, .nav-list li.active {
          color: #fff;
        }
        
        .nav-list li.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #fff;
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/api/placeholder/1200/800') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 0 1rem;
          margin-top: 110px;
        }
        
        .hero-content {
          max-width: 800px;
        }
        
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        /* Menu Section */
        .menu {
          background-color: #fff;
        }
        
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .menu-card {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--card-shadow);
          transition: var(--transition);
        }
        
        .menu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .menu-card-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }
        
        .menu-card-content {
          padding: 1.5rem;
        }
        
        .menu-card-content h3 {
          margin-bottom: 0.5rem;
          color: var(--primary-color);
        }
        
        .menu-card-content p {
          margin-bottom: 1rem;
          color: #666;
        }
        
        .price {
          font-weight: bold;
          font-size: 1.2rem;
          color: var(--secondary-color);
        }
        
        /* About Section */
        .about-content {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        
        .about-text {
          flex: 1;
          min-width: 300px;
        }
        
        .about-text h3 {
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          color: var(--secondary-color);
        }
        
        .about-text p {
          margin-bottom: 1rem;
        }
        
        .about-image {
          flex: 1;
          min-width: 300px;
        }
        
        .about-image img {
          width: 100%;
          border-radius: 10px;
          box-shadow: var(--card-shadow);
        }
        
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }
        
        .feature {
          flex: 1;
          min-width: 250px;
          text-align: center;
          padding: 2rem;
          background-color: white;
          border-radius: 10px;
          box-shadow: var(--card-shadow);
          transition: var(--transition);
        }
        
        .feature:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature h3 {
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        /* Testimonials Section */
        .testimonials {
          background-color: #f8f9fa;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .testimonial-card {
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: var(--card-shadow);
          transition: var(--transition);
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .testimonial-rating {
          margin-bottom: 1rem;
        }
        
        .star {
          color: gold;
          font-size: 1.2rem;
        }
        
        .testimonial-comment {
          font-style: italic;
          margin-bottom: 1rem;
        }
        
        .testimonial-author {
          text-align: right;
          font-weight: bold;
        }
        
        /* Contact Section */
        .contact-container {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        }
        
        .contact-info {
          flex: 1;
          min-width: 300px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        
        .contact-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: var(--primary-color);
        }
        
        .contact-item h3 {
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }
        
        .contact-form {
          flex: 1;
          min-width: 300px;
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: var(--card-shadow);
        }
        
        .contact-form h3 {
          margin-bottom: 1.5rem;
          color: var(--secondary-color);
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        
        .form-group textarea {
          resize: vertical;
        }
        
        /* Footer */
        .footer {
          background-color: var(--text-color);
          color: var(--light-text);
          padding: 4rem 0 2rem;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        
        .footer-section {
          flex: 1;
          min-width: 250px;
          margin-bottom: 2rem;
        }
        
        .footer-section h3 {
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
        }
        
        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: var(--primary-color);
        }
        
        .footer-section p {
          margin-bottom: 1rem;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-color: #333;
          border-radius: 50%;
          color: white;
          text-align: center;
          line-height: 40px;
          text-decoration: none;
          transition: var(--transition);
        }
        
        .social-icon:hover {
          background-color: var(--primary-color);
          transform: translateY(-3px);
        }
        
        .footer-section ul {
          list-style: none;
        }
        
        .footer-section ul li {
          margin-bottom: 0.5rem;
        }
        
        .footer-section ul li a {
          color: var(--light-text);
          text-decoration: none;
          transition: var(--transition);
        }
        
        .footer-section ul li a:hover {
          color: var(--primary-color);
          padding-left: 5px;
        }
        
        .copyright {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #444;
        }
        
        /* Responsive Styles */
        @media screen and (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
            cursor: pointer;
          }
          
          .hamburger {
            width: 30px;
            height: 20px;
            position: relative;
          }
          
          .hamburger span {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: white;
            transition: var(--transition);
          }
          
          .hamburger span:nth-child(1) {
            top: 0;
          }
          
          .hamburger span:nth-child(2) {
            top: 9px;
          }
          
          .hamburger span:nth-child(3) {
            top: 18px;
          }
          
          .hamburger.active span:nth-child(1) {
            transform: rotate(45deg);
            top: 9px;
          }
          
          .hamburger.active span:nth-child(2) {
            opacity: 0;
          }
          
          .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg);
            top: 9px;
          }
          
          .navigation {
            height: 0;
            overflow: hidden;
            transition: var(--transition);
            top: 70px;
          }
          
          .navigation.show {
            height: auto;
          }
          
          .nav-list {
            flex-direction: column;
            padding: 1rem 0;
          }
          
          .nav-list li {
            margin: 0.5rem 0;
            text-align: center;
          }
          
          .hero {
            margin-top: 70px;
          }
          
          .hero h1 {
            font-size: 2rem;
          }
          
          .hero p {
            font-size: 1rem;
          }
          
          .section-title h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;