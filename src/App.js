import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaChevronLeft, FaChevronRight, FaChevronUp, FaLeaf, FaUtensils, FaStar, FaArrowRight } from 'react-icons/fa';

const App = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [phoneHighlighted, setPhoneHighlighted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 400);
      const sections = ['home', 'menu', 'about', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMobileMenu]);

  const menuItems = [
    { id: 1, name: 'Masala Dosa', description: 'Crispy rice crepe filled with spiced potato curry', price: 40, image: '/tiffins/masaladosa.jpg', category: 'dosas' },
    { id: 2, name: 'Plain Dosa', description: 'Traditional rice crepe served with sambar and chutney', price: 40, image: '/tiffins/plaindosa.webp', category: 'dosas' },
    { id: 3, name: 'Cut Dosa', description: 'Crispy dosa cut into pieces, served with sambar and chutney', price: 55, image: '/tiffins/cutdosa.jpg', category: 'dosas' },
    { id: 4, name: 'Onion Dosa', description: 'Dosa topped with saut\u00e9ed onions and spices', price: 55, image: '/tiffins/Onion-Masala-Dosa.jpg', category: 'dosas' },
    { id: 5, name: 'Uthappam', description: 'Thick pancake with vegetables and spices', price: 55, image: '/tiffins/uttapam.jpg', category: 'breakfast' },
    { id: 6, name: 'Upma Dosa', description: 'Dosa filled with savory semolina upma', price: 55, image: '/tiffins/upmadosa.jpg', category: 'dosas' },
    { id: 7, name: 'Neeyi Dosa', description: 'Ghee-roasted dosa with delicious aroma', price: 55, image: '/tiffins/upma.webp', category: 'dosas' },
    { id: 8, name: 'Mysoor Bajji', description: 'Deep-fried with a Mysore touch', price: 40, image: '/tiffins/bonda.jpg', category: 'snacks' },
    { id: 9, name: 'Poori', description: 'Deep-fried wheat bread served with potato curry', price: 40, image: '/tiffins/poori.png', category: 'breakfast' },
    { id: 10, name: 'Idli', description: 'Steamed rice cake served with sambar and chutney', price: 40, image: '/tiffins/idly.jpg', category: 'breakfast' },
    { id: 11, name: 'Upma', description: 'Savory semolina porridge with vegetables', price: 35, image: '/tiffins/upma 1.webp', category: 'breakfast' },
    { id: 12, name: 'Ragi Dosa', description: 'Nutritious finger millet dosa with health benefits', price: 55, image: '/tiffins/ragi.jpg', category: 'dosas' },
    { id: 13, name: 'Vada', description: 'Crispy fried lentil donuts served with sambar', price: 40, image: '/tiffins/vada.jpg', category: 'snacks' },
  ];

  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  const testimonialData = [
    { id: 1, name: "Sarah Johnson", image: './ratings/one.jpg', designation: "Food Blogger" },
    { id: 2, name: "Michael Chen", image: './ratings/two.jpg', designation: "Regular Customer" },
    { id: 3, name: "Jessica Williams", image: './ratings/three.jpg', designation: "Food Critic" },
    { id: 4, name: "David Rodriguez", image: './ratings/four.jpg', designation: "First-time Visitor" },
  ];

  const scrollToSection = (sectionId, orderDetails = null) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setActiveNav(sectionId);
    setShowMobileMenu(false);
    if (orderDetails) {
      setPhoneHighlighted(true);
      setTimeout(() => setPhoneHighlighted(false), 3000);
    }
  };

  const categories = [
    { key: 'all', label: 'All Items', icon: <FaUtensils /> },
    { key: 'dosas', label: 'Dosas', icon: '\ud83e\uded3' },
    { key: 'breakfast', label: 'Breakfast', icon: '\ud83c\udf73' },
    { key: 'snacks', label: 'Snacks', icon: '\ud83c\udf58' },
  ];

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <motion.header
        className={`header ${scrollY > 50 ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="container header-content">
          <motion.div className="logo" whileHover={{ scale: 1.03 }}>
            <div className="logo-icon">
              <FaLeaf />
            </div>
            <div className="logo-text">
              <h1>Neelakantam</h1>
              <span className="logo-tagline">Authentic Tiffins</span>
            </div>
          </motion.div>

          <nav className="desktop-nav">
            <ul className="nav-list">
              {['home', 'menu', 'about', 'testimonials', 'contact'].map((item) => (
                <li key={item} className={activeNav === item ? 'active' : ''}>
                  <a href={`#${item}`} onClick={e => { e.preventDefault(); scrollToSection(item); }}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.button
            className="order-btn-header"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            Order Now
          </motion.button>

          <div className="mobile-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <div className={`hamburger ${showMobileMenu ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <div className="drawer-logo">
                  <FaLeaf className="drawer-logo-icon" />
                  <span>Neelakantam</span>
                </div>
                <button className="drawer-close" onClick={() => setShowMobileMenu(false)}>{'\u2715'}</button>
              </div>
              <ul className="drawer-nav">
                {['home', 'menu', 'about', 'testimonials', 'contact'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={activeNav === item ? 'active' : ''}
                  >
                    <a href={`#${item}`} onClick={e => { e.preventDefault(); scrollToSection(item); }}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      <FaArrowRight className="drawer-arrow" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="drawer-footer">
                <a href="tel:+919876543210" className="drawer-cta">
                  <FaPhoneAlt /> Call to Order
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== HERO ===== */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-bg">
          <img src="/start.jpg" alt="" className="hero-bg-img" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="hero-overlay" />
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FaStar className="hero-badge-star" /> 35+ Years of Tradition
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Experience Authentic<br />
            <span className="hero-highlight">South Indian</span> Flavors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Serving the finest South Indian delicacies with traditional recipes passed down through generations, right from Mahbubnagar
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <motion.button
              className="btn-primary"
              onClick={() => scrollToSection('menu')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Menu <FaArrowRight style={{ marginLeft: 8 }} />
            </motion.button>
            <motion.button
              className="btn-outline"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Order Now
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="hero-stat">
              <strong>35+</strong>
              <span>Years</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>13+</strong>
              <span>Dishes</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>1000+</strong>
              <span>Happy Customers</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ===== MENU ===== */}
      <section id="menu" className="menu-section section">
        <div className="section-decoration">
          <div className="deco-circle deco-1" />
          <div className="deco-circle deco-2" />
        </div>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Specialties</span>
            <h2>Tiffin Menu</h2>
            <div className="section-underline" />
            <p className="section-desc">Authentic flavors prepared fresh every morning</p>
          </motion.div>

          <motion.div
            className="category-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className="cat-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="menu-grid"
            layout
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  className="menu-card"
                  key={item.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="card-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="card-price-badge">{'\u20B9'}{item.price}</div>
                    <div className="card-overlay">
                      <motion.button
                        className="card-order-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => scrollToSection('contact', { name: item.name, price: item.price })}
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="card-footer">
                      <span className="card-tag">{item.category}</span>
                      <button
                        className="card-link-btn"
                        onClick={() => scrollToSection('contact', { name: item.name, price: item.price })}
                      >
                        Order <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="about-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Know Us Better</span>
            <h2>Our Story</h2>
            <div className="section-underline" />
          </motion.div>

          <div className="about-grid">
            <motion.div
              className="about-image-wrapper"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="about-img-container">
                <img src="center.jpg" alt="Neelakantam Tiffins Restaurant" />
                <div className="about-img-accent" />
                <div className="about-exp-badge">
                  <strong>35+</strong>
                  <span>Years of Service</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h3>A Legacy of Authentic South Indian Cuisine</h3>
              <p>Started in Mahbubnagar 35 years ago, Neelakantam Tiffins has been proudly serving delicious and authentic South Indian tiffins ever since. We've stayed true to traditional recipes, bringing the real taste of South India to every plate.</p>
              <p>Our food is prepared using fresh, high-quality ingredients, and we serve it on natural banana leaves to give our customers a truly traditional Indian experience.</p>
              <p>What began as a small tiffin center has now become a trusted name in Mahbubnagar, loved for its homely flavors, simple charm, and warm hospitality.</p>
              <div className="about-highlights">
                {[
                  { icon: '\ud83c\udf72', title: 'Fresh Daily', desc: 'Prepared fresh every morning' },
                  { icon: '\ud83c\udf3f', title: '100% Vegetarian', desc: 'Pure veg South Indian fare' },
                  { icon: '\ud83d\udc68\u200d\ud83c\udf73', title: 'Expert Chefs', desc: 'Masters of traditional cuisine' },
                  { icon: '\ud83c\udf43', title: 'Banana Leaf', desc: 'Traditional serving style' },
                ].map((h, i) => (
                  <div className="about-highlight-item" key={i}>
                    <div className="highlight-icon">{h.icon}</div>
                    <div>
                      <strong>{h.title}</strong>
                      <span>{h.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="testimonials-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Reviews</span>
            <h2>What Our Customers Say</h2>
            <div className="section-underline" />
            <p className="section-desc">Real experiences from our valued customers</p>
          </motion.div>

          <div className="testimonial-carousel">
            <button className="carousel-btn carousel-prev" onClick={() => setCurrentTestimonial(prev => (prev - 1 + 4) % 4)} aria-label="Previous">
              <FaChevronLeft />
            </button>

            <div className="carousel-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  className="testimonial-slide"
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 60, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="testimonial-image-wrapper">
                    <img
                      src={testimonialData[currentTestimonial].image}
                      alt={testimonialData[currentTestimonial].name}
                      className="testimonial-image"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="carousel-btn carousel-next" onClick={() => setCurrentTestimonial(prev => (prev + 1) % 4)} aria-label="Next">
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-dots">
            {testimonialData.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT / ORDER ===== */}
      <section id="contact" className="contact-section section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2>Order Now</h2>
            <div className="section-underline" />
            <p className="section-desc">Order via Zomato or visit us directly</p>
          </motion.div>

          <div className="contact-grid">
            <motion.div
              className={`zomato-card ${phoneHighlighted ? 'pulse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="zomato-card-glow" />
              <div className="zomato-icon-wrap">
                <motion.div
                  className="zomato-icon"
                  whileHover={{ scale: 1.1, rotate: [0, -8, 8, -8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPhoneAlt />
                </motion.div>
              </div>
              <h3>Order on Zomato</h3>
              <a
                href="https://zomato.onelink.me/xqzv/8lsrun22"
                className="zomato-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Zomato
                <FaArrowRight />
              </a>
              <div className="zomato-hours">
                <FaClock />
                <span>7:00 AM {'\u2013'} 1:00 PM</span>
              </div>
            </motion.div>

            <motion.div
              className="steps-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3>How to Order</h3>
              <div className="steps-list">
                {[
                  { num: 1, title: "Open Zomato App", desc: "Find us on Zomato or click the link", color: "#2EC4B6" },
                  { num: 2, title: "Choose Your Items", desc: "Browse our full menu and add to cart", color: "#6A9BD8" },
                  { num: 3, title: "Place Your Order", desc: "Delivery or takeaway \u2014 your choice!", color: "#FF6B35" },
                ].map((step, i) => (
                  <motion.div
                    className="step-row"
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ x: 6 }}
                  >
                    <div className="step-num" style={{ background: step.color }}>{step.num}</div>
                    <div className="step-info">
                      <strong>{step.title}</strong>
                      <span>{step.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="location-info">
                <div className="location-icon-wrap">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Railway Gate, 1-2-1/1ca, Nawabpet Rd, New Gunj, Subhash Nagar, Mahbubnagar, Telangana 509001</p>
                </div>
              </div>
              <div className="contact-map">
                <iframe
                  title="Restaurant Location"
                  src="https://www.google.com/maps?q=railway+gate,+1-2-1%2F1ca,+Nawabpet+Rd,+New+Gunj,+Subhash+Nagar,+Mahbubnagar,+Telangana+509001&output=embed"
                  frameBorder="0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-top">
          <div className="container footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <FaLeaf className="footer-logo-icon" />
                <h3>Neelakantam Tiffins</h3>
              </div>
              <p>Serving authentic South Indian cuisine since 1990. A legacy of taste, tradition, and trust.</p>
              <div className="social-links">
                {[
                  { icon: <FaFacebookF />, url: "https://facebook.com" },
                  { icon: <FaInstagram />, url: "https://instagram.com" },
                  { icon: <FaTwitter />, url: "https://twitter.com" },
                  { icon: <FaYoutube />, url: "https://youtube.com" },
                ].map((s, i) => (
                  <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn" whileHover={{ y: -4, scale: 1.15 }}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {['home', 'menu', 'about', 'testimonials', 'contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={e => { e.preventDefault(); scrollToSection(item); }}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Timings</h4>
              <ul className="timing-list">
                <li><span>Mon {'\u2013'} Sat</span><span>7:00 AM {'\u2013'} 1:00 PM</span></li>
                <li><span>Sunday</span><span>7:00 AM {'\u2013'} 2:00 PM</span></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Updates</h4>
              <p>Subscribe to our newsletter for offers</p>
              <div className="subscribe-box">
                <input type="email" placeholder="your@email.com" aria-label="Email" />
                <button aria-label="Subscribe">{'\u2192'}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>{'\u00A9'} {new Date().getFullYear()} Neelakantam Tiffins. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy-policy">Privacy</a>
              <a href="/terms-of-service">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== BACK TO TOP ===== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== STYLES ===== */}
      <style>{styles}</style>
    </div>
  );
};

const styles = `
  /* ========== RESET & ROOT ========== */
  *, *::before, *::after {
    margin: 0; padding: 0; box-sizing: border-box;
  }

  :root {
    --primary: #FF6B35;
    --primary-light: #FF8957;
    --primary-dark: #E85A20;
    --accent: #2EC4B6;
    --accent-light: #56D4C8;
    --bg: #FAFBFC;
    --bg-alt: #F3F4F6;
    --surface: #FFFFFF;
    --text: #1A1A2E;
    --text-secondary: #5A5A7A;
    --text-muted: #9CA3AF;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
    --shadow-md: 0 8px 30px rgba(0,0,0,0.06);
    --shadow-lg: 0 20px 50px rgba(0,0,0,0.08);
    --shadow-xl: 0 25px 60px rgba(0,0,0,0.12);
    --radius: 12px;
    --radius-lg: 20px;
    --radius-full: 9999px;
    --transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    --font: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  .app {
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    display: block;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
  }

  .section {
    padding: 100px 0;
    position: relative;
  }

  /* ========== SECTION HEADER ========== */
  .section-header {
    text-align: center;
    margin-bottom: 56px;
  }
  .section-label {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 12px;
    background: rgba(255,107,53,0.08);
    padding: 6px 18px;
    border-radius: var(--radius-full);
  }
  .section-header h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: var(--text);
    margin-bottom: 16px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .section-underline {
    height: 4px;
    width: 60px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    margin: 0 auto 16px;
    border-radius: 2px;
  }
  .section-desc {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
  }

  /* ========== HEADER ========== */
  .header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 16px 0;
    transition: var(--transition);
    background: transparent;
  }
  .header.scrolled {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 10px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  }
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
  }
  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
  }
  .logo h1 {
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
    transition: var(--transition);
    line-height: 1.1;
  }
  .header.scrolled .logo h1 {
    color: var(--text);
  }
  .logo-tagline {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    transition: var(--transition);
    display: block;
  }
  .header.scrolled .logo-tagline {
    color: var(--text-muted);
  }

  /* Desktop Nav */
  .desktop-nav { display: block; }
  .nav-list {
    display: flex;
    list-style: none;
    gap: 8px;
    align-items: center;
  }
  .nav-list li {
    position: relative;
  }
  .nav-list li a {
    display: block;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .header.scrolled .nav-list li a {
    color: var(--text-secondary);
  }
  .nav-list li a:hover,
  .nav-list li.active a {
    color: var(--primary);
    background: rgba(255,107,53,0.08);
  }
  .header:not(.scrolled) .nav-list li a:hover,
  .header:not(.scrolled) .nav-list li.active a {
    background: rgba(255,255,255,0.12);
    color: white;
  }

  .order-btn-header {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 14px rgba(255,107,53,0.3);
  }
  .order-btn-header:hover {
    background: var(--primary-dark);
    box-shadow: 0 6px 20px rgba(255,107,53,0.4);
  }

  /* Hamburger */
  .mobile-menu-toggle {
    display: none;
    cursor: pointer;
    z-index: 1001;
    padding: 8px;
  }
  .hamburger {
    width: 24px; height: 18px; position: relative;
  }
  .hamburger span {
    position: absolute;
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: var(--transition);
    left: 0;
  }
  .header.scrolled .hamburger span { background: var(--text); }
  .hamburger span:nth-child(1) { top: 0; }
  .hamburger span:nth-child(2) { top: 8px; }
  .hamburger span:nth-child(3) { top: 16px; }
  .hamburger.active span:nth-child(1) { transform: rotate(45deg); top: 8px; background: var(--text); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: rotate(-45deg); top: 8px; background: var(--text); }

  /* Mobile Drawer */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(4px);
    z-index: 1100;
  }
  .mobile-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 300px;
    max-width: 85vw;
    background: var(--surface);
    z-index: 1200;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 40px rgba(0,0,0,0.15);
  }
  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--bg-alt);
  }
  .drawer-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text);
  }
  .drawer-logo-icon { color: var(--primary); font-size: 1.2rem; }
  .drawer-close {
    background: var(--bg-alt);
    border: none;
    width: 36px; height: 36px;
    border-radius: 50%;
    font-size: 1rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary);
    transition: var(--transition);
  }
  .drawer-close:hover { background: var(--primary); color: white; }
  .drawer-nav {
    list-style: none;
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
  }
  .drawer-nav li a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);
    border-left: 3px solid transparent;
  }
  .drawer-nav li.active a,
  .drawer-nav li a:hover {
    color: var(--primary);
    background: rgba(255,107,53,0.04);
    border-left-color: var(--primary);
  }
  .drawer-arrow { font-size: 0.7rem; opacity: 0.4; }
  .drawer-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--bg-alt);
  }
  .drawer-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--primary);
    color: white;
    padding: 14px;
    border-radius: var(--radius);
    font-weight: 600;
    text-decoration: none;
    font-size: 0.95rem;
    transition: var(--transition);
  }
  .drawer-cta:hover { background: var(--primary-dark); }

  /* ========== HERO ========== */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-bg-img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    position: absolute;
    top: 0; left: 0;
    will-change: transform;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(26,26,46,0.88) 0%,
      rgba(26,26,46,0.65) 40%,
      rgba(46,196,182,0.4) 100%
    );
    z-index: 1;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 720px;
    padding: 0 24px;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 8px 20px;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 24px;
  }
  .hero-badge-star { color: #FFD700; }
  .hero h1 {
    font-size: clamp(2.2rem, 5.5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 20px;
    letter-spacing: -1px;
  }
  .hero-highlight {
    background: linear-gradient(90deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero p {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: rgba(255,255,255,0.8);
    margin-bottom: 32px;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
    line-height: 1.7;
  }
  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--primary);
    color: white;
    padding: 14px 32px;
    border: none;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 8px 25px rgba(255,107,53,0.35);
    font-family: var(--font);
  }
  .btn-primary:hover {
    background: var(--primary-dark);
    box-shadow: 0 12px 35px rgba(255,107,53,0.45);
  }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: white;
    padding: 14px 32px;
    border: 2px solid rgba(255,255,255,0.35);
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    backdrop-filter: blur(4px);
    font-family: var(--font);
  }
  .btn-outline:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.6);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg);
    padding: 20px 40px;
    max-width: 480px;
    margin: 0 auto;
  }
  .hero-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-stat strong {
    font-size: 1.6rem;
    font-weight: 800;
    color: white;
  }
  .hero-stat span {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }
  .hero-stat-divider {
    width: 1px;
    height: 32px;
    background: rgba(255,255,255,0.2);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .scroll-mouse {
    width: 24px; height: 38px;
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  .scroll-dot {
    width: 4px; height: 8px;
    background: rgba(255,255,255,0.7);
    border-radius: 2px;
    animation: scrollDot 2s ease-in-out infinite;
  }
  @keyframes scrollDot {
    0%, 100% { opacity: 1; transform: translateY(0); }
    50% { opacity: 0.3; transform: translateY(8px); }
  }
  .scroll-indicator span {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.4);
    font-weight: 500;
  }

  /* ========== MENU SECTION ========== */
  .menu-section {
    background: var(--bg);
  }
  .section-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .deco-circle {
    position: absolute;
    border-radius: 50%;
  }
  .deco-1 {
    width: 400px; height: 400px;
    top: -150px; right: -100px;
    background: radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%);
  }
  .deco-2 {
    width: 350px; height: 350px;
    bottom: -100px; left: -80px;
    background: radial-gradient(circle, rgba(46,196,182,0.04) 0%, transparent 70%);
  }

  .category-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 48px;
  }
  .category-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border: 1.5px solid var(--bg-alt);
    background: var(--surface);
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font);
  }
  .category-tab:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .category-tab.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    box-shadow: 0 4px 14px rgba(255,107,53,0.25);
  }
  .cat-icon {
    font-size: 1rem;
    display: inline-flex;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    position: relative;
    z-index: 2;
  }

  .menu-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0,0,0,0.04);
    transition: var(--transition);
  }
  .menu-card:hover {
    box-shadow: var(--shadow-lg);
  }

  .card-image {
    position: relative;
    height: 280px;
    overflow: hidden;
  }
  .card-image img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .menu-card:hover .card-image img {
    transform: scale(1.08);
  }
  .card-price-badge {
    position: absolute;
    top: 14px; right: 14px;
    background: var(--surface);
    color: var(--primary);
    font-weight: 800;
    font-size: 0.95rem;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(26,26,46,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .menu-card:hover .card-overlay {
    opacity: 1;
  }
  .card-order-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: var(--radius-full);
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(255,107,53,0.4);
    transition: var(--transition);
    font-family: var(--font);
  }
  .card-order-btn:hover {
    background: var(--primary-dark);
  }

  .card-body {
    padding: 20px;
  }
  .card-body h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 6px;
  }
  .card-body p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 14px;
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-tag {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: var(--accent);
    background: rgba(46,196,182,0.08);
    padding: 4px 10px;
    border-radius: var(--radius-full);
  }
  .card-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    color: var(--primary);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font);
  }
  .card-link-btn:hover {
    gap: 8px;
  }

  /* ========== ABOUT SECTION ========== */
  .about-section {
    background: var(--bg-alt);
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .about-img-container {
    position: relative;
  }
  .about-img-container img {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    position: relative;
    z-index: 2;
  }
  .about-img-accent {
    position: absolute;
    top: -16px; right: -16px;
    width: 100%; height: 100%;
    border: 3px solid var(--accent);
    border-radius: var(--radius-lg);
    z-index: 1;
    opacity: 0.3;
  }
  .about-exp-badge {
    position: absolute;
    bottom: -20px; left: 24px;
    background: var(--primary);
    color: white;
    padding: 16px 24px;
    border-radius: var(--radius);
    z-index: 3;
    box-shadow: 0 8px 25px rgba(255,107,53,0.35);
    text-align: center;
  }
  .about-exp-badge strong {
    display: block;
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
  }
  .about-exp-badge span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.85;
  }

  .about-text h3 {
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 800;
    color: var(--text);
    margin-bottom: 20px;
    line-height: 1.3;
  }
  .about-text p {
    color: var(--text-secondary);
    font-size: 0.98rem;
    line-height: 1.8;
    margin-bottom: 16px;
  }
  .about-highlights {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 28px;
  }
  .about-highlight-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surface);
    padding: 14px 16px;
    border-radius: var(--radius);
    border: 1px solid rgba(0,0,0,0.04);
    transition: var(--transition);
  }
  .about-highlight-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  .highlight-icon {
    font-size: 1.6rem;
    flex-shrink: 0;
  }
  .about-highlight-item strong {
    display: block;
    font-size: 0.85rem;
    color: var(--text);
    font-weight: 700;
  }
  .about-highlight-item span {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* ========== TESTIMONIALS ========== */
  .testimonials-section {
    background: var(--surface);
  }
  .testimonial-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    max-width: 700px;
    margin: 0 auto;
  }
  .carousel-btn {
    width: 48px; height: 48px;
    border-radius: 50%;
    border: 1.5px solid var(--bg-alt);
    background: var(--surface);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    flex-shrink: 0;
    font-size: 1rem;
  }
  .carousel-btn:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    box-shadow: 0 6px 18px rgba(255,107,53,0.25);
  }
  .carousel-viewport {
    flex: 1;
    max-width: 580px;
    min-height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .testimonial-slide {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .testimonial-image-wrapper {
    width: 100%;
    max-width: 480px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }
  .testimonial-image {
    width: 100%;
    height: auto;
    display: block;
  }
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 32px;
  }
  .carousel-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    border: none;
    background: var(--bg-alt);
    cursor: pointer;
    transition: var(--transition);
    padding: 0;
  }
  .carousel-dot.active {
    background: var(--primary);
    width: 28px;
    border-radius: 5px;
  }

  /* ========== CONTACT SECTION ========== */
  .contact-section {
    background: var(--bg-alt);
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .zomato-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 40px 32px;
    text-align: center;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  .zomato-card.pulse {
    animation: cardPulse 2s ease-in-out 2;
  }
  @keyframes cardPulse {
    0%, 100% { box-shadow: var(--shadow-md); }
    50% { box-shadow: 0 0 0 8px rgba(255,107,53,0.12), var(--shadow-lg); }
  }
  .zomato-card-glow {
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .zomato-icon-wrap {
    margin-bottom: 20px;
  }
  .zomato-icon {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    box-shadow: 0 10px 30px rgba(255,107,53,0.3);
    cursor: pointer;
    position: relative;
  }
  .zomato-icon::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px dashed rgba(255,107,53,0.2);
    animation: spinSlow 20s linear infinite;
  }
  @keyframes spinSlow { to { transform: rotate(360deg); } }
  .zomato-card h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 16px;
  }
  .zomato-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--primary);
    color: white;
    padding: 14px 32px;
    border-radius: var(--radius-full);
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    transition: var(--transition);
    box-shadow: 0 8px 25px rgba(255,107,53,0.3);
    margin-bottom: 20px;
  }
  .zomato-link:hover {
    background: var(--primary-dark);
    box-shadow: 0 12px 35px rgba(255,107,53,0.45);
    transform: translateY(-2px) scale(1.02);
  }
  .zomato-hours {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.88rem;
    background: var(--bg-alt);
    padding: 8px 18px;
    border-radius: var(--radius-full);
  }
  .zomato-hours svg { color: var(--accent); }

  .steps-card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(0,0,0,0.04);
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .steps-card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 24px;
    text-align: center;
  }
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .step-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: var(--bg);
    border-radius: var(--radius);
    transition: var(--transition);
    cursor: default;
  }
  .step-row:hover {
    background: var(--bg-alt);
    box-shadow: var(--shadow-sm);
  }
  .step-num {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 800;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .step-info {
    display: flex;
    flex-direction: column;
  }
  .step-info strong {
    font-size: 0.95rem;
    color: var(--text);
    font-weight: 700;
  }
  .step-info span {
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .location-card {
    grid-column: 1 / -1;
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(0,0,0,0.04);
  }
  .location-info {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }
  .location-icon-wrap {
    width: 48px; height: 48px;
    background: rgba(46,196,182,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .location-info h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }
  .location-info p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
  }
  .contact-map {
    border-radius: var(--radius);
    overflow: hidden;
    height: 260px;
    box-shadow: var(--shadow-sm);
  }
  .contact-map iframe {
    width: 100%; height: 100%;
    display: block;
    border: none;
  }

  /* ========== FOOTER ========== */
  .footer {
    background: #121220;
    color: white;
  }
  .footer-top {
    padding: 64px 0 40px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
    gap: 40px;
  }
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .footer-logo-icon {
    color: var(--primary);
    font-size: 1.4rem;
  }
  .footer-logo h3 {
    font-size: 1.3rem;
    font-weight: 800;
  }
  .footer-brand p {
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 20px;
  }
  .social-links {
    display: flex;
    gap: 10px;
  }
  .social-btn {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 0.9rem;
    transition: var(--transition);
  }
  .social-btn:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  .footer-col h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 12px;
  }
  .footer-col h4::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 30px; height: 3px;
    background: var(--primary);
    border-radius: 2px;
  }
  .footer-col ul {
    list-style: none;
  }
  .footer-col ul li {
    margin-bottom: 10px;
  }
  .footer-col ul li a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 0.9rem;
    transition: var(--transition);
  }
  .footer-col ul li a:hover {
    color: var(--primary);
    padding-left: 6px;
  }
  .footer-col p {
    color: rgba(255,255,255,0.5);
    font-size: 0.88rem;
    margin-bottom: 16px;
  }
  .timing-list li {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: rgba(255,255,255,0.5);
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .subscribe-box {
    display: flex;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .subscribe-box input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: none;
    padding: 12px 14px;
    color: white;
    font-size: 0.85rem;
    outline: none;
  }
  .subscribe-box input::placeholder {
    color: rgba(255,255,255,0.3);
  }
  .subscribe-box button {
    background: var(--primary);
    border: none;
    color: white;
    padding: 12px 18px;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .subscribe-box button:hover {
    background: var(--primary-dark);
  }

  .footer-bottom {
    background: rgba(0,0,0,0.3);
    padding: 18px 0;
  }
  .footer-bottom-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-bottom p {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.35);
  }
  .footer-bottom-links {
    display: flex;
    gap: 20px;
  }
  .footer-bottom-links a {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    transition: var(--transition);
  }
  .footer-bottom-links a:hover {
    color: var(--primary);
  }

  /* ========== BACK TO TOP ========== */
  .back-to-top {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    z-index: 900;
    box-shadow: 0 6px 20px rgba(255,107,53,0.35);
    transition: var(--transition);
  }
  .back-to-top:hover {
    background: var(--primary-dark);
    box-shadow: 0 8px 28px rgba(255,107,53,0.45);
  }

  /* ========== RESPONSIVE ========== */
  @media (max-width: 1024px) {
    .about-grid {
      gap: 40px;
    }
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .desktop-nav, .order-btn-header { display: none; }
    .mobile-menu-toggle { display: block; }

    .section { padding: 72px 0; }

    .hero-stats {
      gap: 20px;
      padding: 16px 24px;
    }
    .hero-stat strong { font-size: 1.3rem; }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .about-img-accent { display: none; }
    .about-highlights {
      grid-template-columns: 1fr;
    }

    .menu-grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }

    .contact-grid {
      grid-template-columns: 1fr;
    }
    .zomato-card, .steps-card, .location-card {
      grid-column: auto;
      grid-row: auto;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .footer-bottom-inner {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }

    .carousel-viewport {
      min-height: 380px;
    }
    .testimonial-image-wrapper {
      max-width: 400px;
    }
  }

  @media (max-width: 480px) {
    .container { padding: 0 16px; }
    .section { padding: 56px 0; }

    .section-header h2 { font-size: 1.7rem; }
    .hero h1 { font-size: 1.9rem; }
    .hero p { font-size: 0.95rem; }

    .hero-stats {
      flex-wrap: wrap;
      gap: 12px;
      padding: 16px;
    }
    .hero-stat-divider { display: none; }

    .hero-actions {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .btn-primary, .btn-outline {
      width: 100%;
      justify-content: center;
    }

    .menu-grid {
      grid-template-columns: 1fr;
    }

    .category-tabs {
      justify-content: flex-start;
      overflow-x: auto;
      flex-wrap: nowrap;
      gap: 8px;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }
    .category-tab {
      flex: 0 0 auto;
      white-space: nowrap;
      padding: 8px 16px;
      font-size: 0.8rem;
    }

    .about-exp-badge {
      bottom: -16px; left: 16px;
      padding: 12px 18px;
    }
    .about-exp-badge strong { font-size: 1.4rem; }

    .carousel-viewport {
      min-height: 300px;
    }
    .carousel-btn {
      width: 38px; height: 38px;
      font-size: 0.85rem;
    }
    .testimonial-image-wrapper {
      max-width: 320px;
    }

    .zomato-card { padding: 28px 20px; }
    .steps-card { padding: 24px 18px; }
    .location-card { padding: 24px 18px; }

    .scroll-indicator { bottom: 16px; }

    .back-to-top {
      bottom: 18px; right: 18px;
      width: 42px; height: 42px;
    }
  }
`;

export default App;

