import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
// import './fonts.css';

const App = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [scrollY, setScrollY] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  // Add a state to track if the phone number has been emphasized
  const [phoneHighlighted, setPhoneHighlighted] = useState(false);
  const [callOnlyMode, setCallOnlyMode] = useState(true); // New state to indicate call-only mode
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
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
  
  // Show menu with animation after page loads
  useEffect(() => {
    setTimeout(() => setMenuVisible(true), 500);
  }, []);
  
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
      description: 'Deep-fried  Mysore touch',
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

  // Scroll to section function with improved order handling
  const scrollToSection = (sectionId, orderDetails = null) => {
    // Use scrollIntoView for smooth scrolling to the top of the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveNav(sectionId);
    setShowMobileMenu(false);

    // If orderDetails is provided, pre-fill contact form with order information
    if (orderDetails) {
      setContactForm(prevForm => ({
        ...prevForm,
        message: `Hi, I would like to order ${orderDetails.quantity || 1} ${orderDetails.name} (₹${orderDetails.price}). Please contact me for delivery details.`
      }));

      // Highlight the phone number section to emphasize calling as the preferred option
      setPhoneHighlighted(true);
      setTimeout(() => setPhoneHighlighted(false), 3000);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  // Menu reveal animation
  const staggerMenuItems = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const menuItemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  // Fix jsx-a11y/anchor-is-valid warnings by using proper href values
  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Carousel navigation handlers
  const testimonialCount = 5;
  const handleTestimonialDotClick = (idx) => setCurrentTestimonial(idx);
  const handlePrevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonialCount) % testimonialCount);
  const handleNextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonialCount);

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className={`header ${scrollY > 50 ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <h1>Neelakantam Tiffins</h1>
          </motion.div>
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${showMobileMenu ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav 
        className={`navigation ${showMobileMenu ? 'show' : ''} ${scrollY > 50 ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container">
          <motion.ul 
            className="nav-list"
            variants={staggerMenuItems}
            initial="hidden"
            animate="show"
          >
            {['home', 'menu', 'about', 'testimonials', 'contact'].map((item) => (
              <motion.li 
                key={item}
                className={activeNav === item ? 'active' : ''}
                variants={menuItemAnimation}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={`#${item}`}
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  style={{ color: 'inherit', textDecoration: 'none', display: 'block', width: '100%' }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >Experience Authentic South Indian Flavors</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >Serving the finest South Indian delicacies with traditional recipes passed down through generations</motion.p>
          <motion.button 
            className="btn-primary"
            onClick={() => scrollToSection('menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Explore Our Menu
          </motion.button>
        </motion.div>
        <div className="hero-scroll-indicator">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span></span>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu section">
        <div className="container">
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Special Tiffin Menu</h2>
            <div className="underline"></div>
            <p className="section-subtitle">Authentic flavors that tell our story</p>
          </motion.div>
        
          <div className="menu-categories">
            <motion.button className="menu-category active">All Items</motion.button>
            <motion.button className="menu-category">Dosas</motion.button>
            <motion.button className="menu-category">Breakfast</motion.button>
            <motion.button className="menu-category">Snacks</motion.button>
          </div>
          
          <motion.div 
            className="menu-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {menuItems.map((item) => (
              <motion.div 
                className="menu-card" 
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="menu-card-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="menu-card-price">₹{item.price}</div>
                </div>
                <div className="menu-card-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <motion.button 
                    className="menu-card-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('contact', { name: item.name, price: item.price })}
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="about-bg-pattern"></div>
        <div className="container">
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>About Us</h2>
            <div className="underline"></div>
            <p className="section-subtitle">Our journey of flavors and tradition</p>
          </motion.div>
          
          <div className="about-content">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3>Our Story</h3>
              <p>Started in Mahbubnagar 35 years ago, Neelakantam Tiffins has been proudly serving delicious and authentic South Indian tiffins ever since. We've stayed true to traditional recipes, bringing the real taste of South India to every plate.</p>
              <p>Our food is prepared using fresh, high-quality ingredients, and we serve it on natural banana leaves to give our customers a truly traditional Indian experience. This small detail reflects our big commitment to culture and authenticity.</p>
              <p>What began as a small tiffin center has now become a trusted name in Mahbubnagar, loved for its homely flavors, simple charm, and warm hospitality.</p>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="center.jpg" alt="Restaurant" />
              <div className="about-image-accent"></div>
            </motion.div>
          </div>

          <div className="features">
            {[
              { icon: "🍲", title: "Fresh Ingredients", desc: "We use only the freshest and highest quality ingredients in all our dishes." },
              { icon: "👨‍🍳", title: "Expert Chefs", desc: "Our experienced chefs are masters in preparing authentic South Indian cuisine." },
              { icon: "🌿", title: "Vegetarian Friendly", desc: "Wide range of vegetarian options to satisfy all preferences." },
              { icon: "🔄", title: "Daily Fresh", desc: "All our items are prepared fresh every day for maximum taste and quality." }
            ].map((feature, index) => (
              <motion.div 
                className="feature" 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials section">
        <div className="container">
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>What Our Customers Say</h2>
            <div className="underline"></div>
            <p className="section-subtitle">The experiences shared by our valued customers</p>
          </motion.div>
          
          <div className="testimonials-container">
            <div className="testimonial-slider">
              <button
                className="testimonial-arrow left"
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
              >
                <FaChevronLeft />
              </button>
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  rating: 5,
                  comment: "This product exceeded all my expectations. The customer service team was incredibly helpful throughout the entire process.",
                  image: './ratings/one.jpg',
                  designation: "Food Blogger"
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  rating: 4,
                  comment: "Great value for the price. I've been visiting for 3 months now and the quality has remained consistently excellent.",
                  image: './ratings/two.jpg',
                  designation: "Regular Customer"
                },
                {
                  id: 3,
                  name: "Jessica Williams",
                  rating: 5,
                  comment: "Absolutely love this place! The authentic flavors solved all my cravings for South Indian cuisine. Highly recommended!",
                  image: './ratings/three.jpg',
                  designation: "Food Critic"
                },
                {
                  id: 4,
                  name: "David Rodriguez",
                  rating: 4,
                  comment: "The quality is outstanding. Would definitely visit again and recommend to friends and colleagues.",
                  image: './ratings/four.jpg',
                  designation: "First-time Visitor"
                }
                // Removed Emma Thompson card
              ].map((testimonial, index) => (
                index === currentTestimonial && (
                  <motion.div 
                    className="testimonial-card testimonial-slide-image"
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-slide-img"
                    />
                  </motion.div>
                )
              ))}
              <button
                className="testimonial-arrow right"
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="testimonial-dots">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentTestimonial ? 'active' : ''}`}
                  onClick={() => handleTestimonialDotClick(i)}
                  style={{ cursor: 'pointer' }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="contact-bg-pattern"></div>
        <div className="container">
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Order Now</h2>
            <div className="underline"></div>
            <p className="section-subtitle">Call us to place your order</p>
          </motion.div>
          <div className="contact-container">
            <motion.div 
              className="contact-info call-only"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className={`contact-item phone-highlight ${phoneHighlighted ? 'pulse-animation' : ''}`}
                animate={phoneHighlighted ? 
                  { scale: [1, 1.02, 1], boxShadow: ['0 10px 25px rgba(255,107,53,0.1)', '0 15px 30px rgba(255,107,53,0.3)', '0 10px 25px rgba(255,107,53,0.1)'] } : 
                  {}
                }
                transition={{ duration: 2.5, ease: "easeInOut", repeat: phoneHighlighted ? 2 : 0 }}
              >
                <div className="phone-order-container">
                  <motion.div 
                    className="phone-order-icon"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaPhoneAlt />
                  </motion.div>
                  
                  <div className="phone-order-content">
                    <a
                      href="https://zomato.onelink.me/xqzv/8lsrun22"
                      className="phone-link-large"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak: 'break-word' }}
                    >
                      Now in Zomato
                      <div className="call-now-badge">
                        <span>Zomato</span>
                      </div>
                    </a>
                    <div className="phone-hours">
                      <FaClock className="hours-icon" />
                      <span>Available: 7:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="order-instructions">
                <div className="order-steps">
                  <h4>How to Order:</h4>
                  <div className="steps-container">
                    {[
                      {
                        number: 1,
                        title: "View in Zomato app",
                        desc: "Our team is ready to take your order"
                      },
                      {
                        number: 2,
                        title: "Place your order",
                        desc: "Tell us what you'd like from our menu"
                      },
                      {
                        number: 3,
                        title: "Provide delivery details",
                        desc: "take away is available, or you can order in zomato"
                      }
                    ].map((step, index) => (
                      <motion.div 
                        className="step-item"
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="step-number">{step.number}</div>
                        <div className="step-content">
                          <h5>{step.title}</h5>
                          <p>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="restaurant-info">
                <div className="info-card">
                  <div className="info-icon"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Our Location</h4>
                    <p>railway gate, 1-2-1/1ca, Nawabpet Rd, New Gunj, Subhash Nagar, Mahbubnagar, Telangana 509001</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-map">
                <iframe 
                  title="Restaurant Location" 
                  src="https://www.google.com/maps?q=railway+gate,+1-2-1%2F1ca,+Nawabpet+Rd,+New+Gunj,+Subhash+Nagar,+Mahbubnagar,+Telangana+509001&output=embed"
                  frameBorder="0" 
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
            
            {/* Hide the form in call-only mode */}
            {!callOnlyMode && (
              <motion.div 
                className="contact-form"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3>{contactForm.message.includes('order') ? 'Complete Your Order' : 'Send us a message'}</h3>
                <div className="form-container">
                  {contactForm.message.includes('order') && (
                    <div className="order-notice">
                      <p>For faster service, please call us directly at <a href="tel:+919876543210" className="phone-link-inline">+91 98765 43210</a></p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Your Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number for delivery"
                      required
                    />
                    <small className="form-hint">* Required for order delivery</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                      id="message"
                      rows="5" 
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="Your message or special instructions for your order"
                      required
                    ></textarea>
                  </div>
                  <motion.button 
                    type="button" 
                    className="btn-primary"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {contactForm.message.includes('order') ? 'Place Order' : 'Send Message'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Neelakantam Tiffins</h3>
                <p>Serving authentic South Indian cuisine since 1990.</p>
                <div className="social-links">
                  <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" whileHover={{ y: -5, scale: 1.1 }}>
                    <FaFacebookF />
                  </motion.a>
                  <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" whileHover={{ y: -5, scale: 1.1 }}>
                    <FaInstagram />
                  </motion.a>
                  <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" whileHover={{ y: -5, scale: 1.1 }}>
                    <FaTwitter />
                  </motion.a>
                  <motion.a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" whileHover={{ y: -5, scale: 1.1 }}>
                    <FaYoutube />
                  </motion.a>
                </div>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  {['home', 'menu', 'about', 'testimonials', 'contact'].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }}>
                      <a href={`#${item}`} onClick={(e) => {e.preventDefault(); scrollToSection(item);}}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="footer-section">
                <h3>Our Locations</h3>
                <ul>
                  <motion.li whileHover={{ x: 5 }}>Mahbubnagar Main Road</motion.li>
                  {/* Removed Hyderabad City Center and Warangal Plaza */}
                </ul>
              </div>
              <div className="footer-section">
                <h3>Subscribe</h3>
                <p>Subscribe to our newsletter for updates and special offers</p>
                <div className="subscribe-form">
                  <input type="email" placeholder="Your Email Address" aria-label="Email address for newsletter" />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Neelakantam Tiffins. All rights reserved.</p>
            <div className="footer-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        :root {
          --primary-color: #FF6B35;
          --primary-light: #FF8B5C;
          --primary-dark: #E84A00;
          --secondary-color: #2EC4B6;
          --background-color: #FDFDFD;
          --text-color: #1A1A2E;
          --text-light: #4A4A6A;
          --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          --transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
          --border-radius: 8px;
        }
        
        body {
          background-color: var(--background-color);
          color: var(--text-color);
          line-height: 1.7;
          overflow-x: hidden;
          font-weight: 400;
        }
        
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        
        .section {
          padding: 120px 0;
          position: relative;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title h2 {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: var(--text-color);
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-top: 1rem;
          font-weight: 300;
        }
        
        .underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, var(--secondary-color), var(--primary-color));
          margin: 0 auto;
          border-radius: 2px;
        }
        
        .btn-primary {
          display: inline-block;
          background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: var(--transition);
          box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);
          position: relative;
          z-index: 1;
          overflow: hidden;
          letter-spacing: 1px;
        }
        
        .btn-primary:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(45deg, var(--primary-light), var(--primary-color));
          transition: var(--transition);
          z-index: -1;
        }
        
        .btn-primary:hover:before {
          width: 100%;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(255, 107, 53, 0.3);
        }
        
        .btn-secondary {
          display: inline-block;
          background: transparent;
          color: var(--primary-color);
          padding: 0.8rem 2rem;
          border: 2px solid var(--primary-color);
          border-radius: var(--border-radius);
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: var(--transition);
          position: relative;
          z-index: 1;
          overflow: hidden;
          margin-top: 1.5rem;
        }
        
        .btn-secondary:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: var(--primary-color);
          transition: var(--transition);
          z-index: -1;
        }
        
        .btn-secondary:hover:before {
          width: 100%;
        }
        
        .btn-secondary:hover {
          color: white;
        }
        
        /* Header Styles */
        .header {
          background-color: transparent;
          color: var(--light-text);
          padding: 1.5rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          transition: var(--transition);
        }
        
        .header.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 1rem 0;
        }
        
        .header.scrolled .logo h1 {
          color: var(--text-color);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo h1 {
          font-size: 2rem;
          margin-bottom: 0;
          font-weight: 700;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: var(--transition);
        }
        
        .mobile-menu-toggle {
          display: none;
          cursor: pointer;
          z-index: 10;
        }
        
        /* Navigation Styles */
        .navigation {
          background-color: transparent;
          padding: 0.5rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 999;
          transition: var(--transition);
        }
        
        .navigation.scrolled {
          background-color: transparent;
        }
        
        .nav-list {
          display: flex;
          justify-content: flex-end;
          list-style: none;
          padding: 1.5rem 0;
        }
        
        .nav-list li {
          margin: 0 1.2rem;
          padding: 0.5rem 0;
          color: white;
          cursor: pointer;
          position: relative;
          font-weight: 500;
          transition: var(--transition);
        }
        
        .navigation.scrolled .nav-list li {
          color: var(--text-color);
        }
        
        .nav-list li:hover, .nav-list li.active {
          color: var(--primary-color);
        }
        
        .nav-list li:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: var(--transition);
          transform: translateX(-50%);
        }
        
        .nav-list li.active:after,
        .nav-list li:hover:after {
          width: 100%;
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          background: url('/hero-bg.jpg') center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 0 1rem;
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(26, 26, 46, 0.8), rgba(46, 196, 182, 0.5));
          z-index: 1;
        }
        
        .hero-content {
          max-width: 800px;
          position: relative;
          z-index: 2;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          font-weight: 800;
          line-height: 1.2;
        }
        
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 300;
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        
        .hero-scroll-indicator span {
          display: block;
          width: 30px;
          height: 50px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          border-radius: 15px;
          position: relative;
        }
        
        .hero-scroll-indicator span:before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          transform: translateX(-50%);
        }
        
        /* Menu Section */
        .menu {
          background-color: #fff;
          position: relative;
          overflow: hidden;
        }
        
        .menu:before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background-color: rgba(255, 107, 53, 0.05);
          z-index: 1;
        }
        
        .menu:after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background-color: rgba(46, 196, 182, 0.05);
          z-index: 1;
        }
        
        .menu-categories {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .menu-category {
          padding: 0.5rem 1.5rem;
          background-color: #f5f5f5;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition);
          color: var(--text-light);
        }
        
        .menu-category.active,
        .menu-category:hover {
          background-color: var(--primary-color);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.2);
        }
        
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        
        .menu-card {
          background-color: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--card-shadow);
          transition: var(--transition);
          height: 100%;
        }
        
        .menu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08);
        }
        
        .menu-card-image {
          position: relative;
          overflow: hidden;
          height: 220px;
        }
        
        .menu-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }
        
        .menu-card:hover .menu-card-image img {
          transform: scale(1.1);
        }
        
        .menu-card-price {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .menu-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: calc(100% - 220px);
        }
        
        .menu-card-content h3 {
          margin-bottom: 0.8rem;
          color: var(--text-color);
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .menu-card-content p {
          margin-bottom: 1.5rem;
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
          flex-grow: 1;
        }
        
        .menu-card-button {
          background-color: transparent;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
          padding: 0.6rem 1.2rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          align-self: flex-start;
        }
        
        .menu-card-button:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        /* About Section */
        .about {
          background-color: #fafafa;
          position: relative;
          overflow: hidden;
        }
        
        .about-bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(46, 196, 182, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 20%);
          z-index: 1;
        }
        
        .about-content {
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
          margin-bottom: 5rem;
          position: relative;
          z-index: 2;
        }
        
        .about-text {
          flex: 1;
          min-width: 300px;
        }
        
        .about-text h3 {
          margin-bottom: 2rem;
          font-size: 2rem;
          color: var(--text-color);
          font-weight: 600;
          position: relative;
          padding-left: 15px;
        }
        
        .about-text h3:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 5px;
          background-color: var(--primary-color);
          border-radius: 3px;
        }
        
        .about-text p {
          margin-bottom: 1.5rem;
          color: var(--text-light);
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .about-image {
          flex: 1;
          min-width: 300px;
          position: relative;
          z-index: 2;
        }
        
        .about-image img {
          width: 100%;
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
          position: relative;
          z-index: 2;
        }
        
        .about-image-accent {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 5px solid var(--secondary-color);
          border-radius: var(--border-radius);
          z-index: 1;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }
        
        .feature {
          background-color: white;
          padding: 2.5rem 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
          transition: var(--transition);
          text-align: center;
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          background-color: rgba(46, 196, 182, 0.1);
          width: 80px;
          height: 80px;
          line-height: 80px;
          border-radius: 50%;
          color: var(--secondary-color);
        }
        
        .feature h3 {
          margin-bottom: 1rem;
          color: var(--text-color);
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .feature p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.7;
        }
        
        /* Testimonials Section */
        .testimonials {
          background-color: #fff;
          position: relative;
          overflow: hidden;
        }
        
        .testimonials:before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 300px;
          height: 300px;
          background-color: rgba(46, 196, 182, 0.05);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
        
        .testimonials-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        
        .testimonial-slider {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 450px;
          position: relative;
        }
        .testimonial-card.testimonial-slide-image {
          background: none;
          box-shadow: none;
          border-radius: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 450px;
          max-width: 350px;
          position: relative;
        }
        .testimonial-slide-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          border: none;
          display: block;
          background: #fff;
        }
        .testimonial-arrow {
          background: rgba(255,255,255,0.85);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 1.5rem;
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
        }
        .testimonial-arrow.left {
          left: 0;
        }
        .testimonial-arrow.right {
          right: 0;
        }
        .testimonial-arrow:hover {
          background: var(--primary-color);
          color: #fff;
        }
        @media (max-width: 900px) {
          .testimonial-card.testimonial-slide-image {
            height: 250px;
            max-width: 98vw;
          }
        }
        @media (max-width: 600px) {
          .testimonial-card.testimonial-slide-image {
            height: 160px;
            max-width: 98vw;
          }
          .testimonial-slide-img {
            height: 100%;
            width: 100%;
          }
          .testimonial-arrow {
            width: 36px;
            height: 36px;
            font-size: 1.2rem;
          }
        }
        
        /* Contact Section */
        .contact {
          background-color: #fafafa;
          position: relative;
          overflow: hidden;
        }
        
        .contact-bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-image: url('/pattern-bg.png');
          opacity: 0.05;
          z-index: 1;
        }
        
        .contact-container {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          position: relative;
          z-index: 2;
        }
        
        .contact-info {
          flex: 1;
          min-width: 300px;
        }
        
        .contact-title {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          color: var(--text-color);
          font-weight: 600;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        
        .contact-icon {
          width: 50px;
          height: 50px;
          background-color: rgba(46, 196, 182, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 1.5rem;
          color: var(--secondary-color);
          font-size: 1.2rem;
        }
        
        .contact-item h3 {
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-size: 1.2rem;
          font-weight: 500;
        }
        
        .contact-item p {
          color: var(--text-light);
        }
        
        .contact-map {
          margin-top: 3rem;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }
        
        .contact-map iframe {
          width: 100%;
          height: 250px;
        }
        
        .contact-form {
          flex: 1;
          min-width: 300px;
          background-color: white;
          padding: 3rem;
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
        }
        
        .contact-form h3 {
          margin-bottom: 2rem;
          color: var(--text-color);
          font-size: 1.8rem;
          text-align: center;
          font-weight: 600;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: var(--border-radius);
          font-size: 1rem;
          color: var(--text-color);
          transition: var(--transition);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--secondary-color);
          outline: none;
          box-shadow: 0 0 0 3px rgba(46, 196, 182, 0.1);
        }
        
        .form-group textarea {
          resize: vertical;
        }
        
        /* Footer */
        .footer {
          background-color: #1A1A2E;
          color: #fff;
          overflow: hidden;
        }
        
        .footer-top {
          padding: 5rem 0 3rem;
          background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 3rem;
        }
        
        .footer-section {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-section h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          font-weight: 600;
          color: #fff;
          padding-bottom: 0.8rem;
        }
        
        .footer-section h3:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          border-radius: 3px;
        }
        
        .footer-section p {
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
          border-radius: 50%;
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          transition: var(--transition);
        }
        
        .footer-section ul {
          list-style: none;
        }
        
        .footer-section ul li {
          margin-bottom: 0.8rem;
          transition: var(--transition);
        }
        
        .footer-section ul li a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: var(--transition);
        }
        
        .footer-section ul li a:hover {
          color: var(--primary-color);
        }
        
        .subscribe-form {
          display: flex;
          margin-top: 1rem;
          position: relative;
        }
        
        .subscribe-form input {
          flex-grow: 1;
          padding: 0.8rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
          border-radius: var(--border-radius) 0 0 var(--border-radius);
          outline: none;
        }
        
        .subscribe-form button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0 1.5rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
          transition: var(--transition);
        }
        
        .subscribe-form button:hover {
          background: var(--primary-dark);
        }
        
        .footer-bottom {
          background-color: #0F0F1A;
          padding: 1.5rem 0;
        }
        
        .footer-bottom .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .footer-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: var(--transition);
        }
        
        .footer-links a:hover {
          color: var(--primary-color);
        }
        
        /* Phone Link Styles */
        .phone-link {
          display: block;
          color: var(--text-light);
          text-decoration: none;
          transition: var(--transition);
        }
        
        .phone-link:hover {
          color: var(--primary-color);
        }
        
        .phone-link:hover p {
          font-weight: 600;
        }
        
        .phone-icon {
          color: var(--primary-color);
          background-color: rgba(255, 107, 53, 0.1);
        }
        
        .call-to-action {
          display: inline-block;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        .highlight-phone {
          background-color: rgba(255, 107, 53, 0.05);
          border-radius: var(--border-radius);
          padding: 1rem;
        }
        
        .phone-link-inline {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition);
        }
        
        .phone-link-inline:hover {
          text-decoration: underline;
        }
        
        .order-instructions {
          margin: 2rem 0;
        }
        
        .order-callout {
          background-color: rgba(46, 196, 182, 0.05);
          border-left: 4px solid var(--secondary-color);
          padding: 1rem 1.5rem;
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
        
        .order-callout h4 {
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }
        
        .order-callout ol {
          padding-left: 1.5rem;
          margin-bottom: 0;
        }
        
        .order-callout li {
          margin-bottom: 0.5rem;
        }
        
        .order-callout li:last-child {
          margin-bottom: 0;
        }
        
        .order-notice {
          background-color: rgba(255, 107, 53, 0.1);
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .order-notice p {
          margin: 0;
          color: var(--primary-dark);
        }
        
        /* Mobile optimization for phone links */
        @media screen and (max-width: 768px) {
          .call-to-action {
            display: block;
            padding: 0.5rem 0;
          }
          
          .phone-link, .phone-link-inline {
            font-size: 1.1rem;
          }
        }
        
        /* Responsive Styles */
        @media screen and (max-width: 1024px) {
          .nav-list {
            padding: 1rem 0;
          }
          
          .logo h1 {
            font-size: 1.8rem;
          }
          
          .section {
            padding: 100px 0;
          }
        }
        
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
            background-color: var(--text-color);
            transition: var(--transition);
          }
          
          .header:not(.scrolled) .hamburger span {
            background-color: white;
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
            background-color: rgba(255, 255, 255, 0.95);
          }
          
          .navigation.show {
            height: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          }
          
          .nav-list {
            flex-direction: column;
            padding: 2rem 0;
          }
          
          .nav-list li {
            margin: 0.8rem 0;
            text-align: center;
            color: var(--text-color);
          }
          
          .section-title h2 {
            font-size: 2.2rem;
          }
          
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .about-image-accent {
            display: none;
          }
          
          .contact-form {
            padding: 2rem;
          }
          
          .footer-bottom .container {
            flex-direction: column;
            gap: 1rem;
          }
        }
        
        @media screen and (max-width: 480px) {
          .hero h1 {
            font-size: 2rem;
          }
          
          .section {
            padding: 80px 0;
          }
          
          .testimonial-slider {
            padding: 0;
          }
          
          .testimonial-card {
            flex: 0 0 100%;
          }
          
          .menu-categories {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 0.5rem 0;
          }
          
          .menu-category {
            flex: 0 0 auto;
            white-space: nowrap;
          }
        }
        
        /* Enhanced Order Now Section Styles */
        .contact-info.call-only {
          flex: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .phone-highlight {
          background: linear-gradient(120deg, #ffffff, #f9f9f9);
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          margin-bottom: 3rem;
          overflow: hidden;
          border: 1px solid rgba(255, 107, 53, 0.15);
          position: relative;
        }
        
        .phone-highlight:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 107, 53, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
          }
        }
        
        .phone-order-container {
          display: flex;
          align-items: center;
          padding: 2.5rem;
          position: relative;
        }
        
        .phone-order-icon {
          width: 90px;
          height: 90px;
          background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 2.5rem;
          color: white;
          font-size: 2.2rem;
          flex-shrink: 0;
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3), inset 0 -3px 10px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          position: relative;
        }
        
        .phone-order-icon:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          background: transparent;
          animation: ripple 2s infinite;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.5);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(255, 107, 53, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
          }
        }
        
        .phone-order-content {
          flex-grow: 1;
        }
        
        .phone-order-content h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--text-color);
          font-weight: 600;
          position: relative;
          display: inline-block;
        }
        
        .phone-link-large {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          text-decoration: none;
          transition: var(--transition);
          margin-bottom: 1.2rem;
          position: relative;
        }
        
        .phone-link-large:hover {
          text-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
          transform: translateY(-2px);
        }
        
        .phone-hours {
          display: flex;
          align-items: center;
          color: var(--text-light);
          font-size: 0.95rem;
          background-color: rgba(46, 196, 182, 0.08);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          display: inline-flex;
        }
        
        .hours-icon {
          margin-right: 0.5rem;
          color: var(--secondary-color);
        }
        
        .call-now-badge {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-left: 1rem;
          vertical-align: middle;
          box-shadow: 0 4px 10px rgba(255, 107, 53, 0.3);
          animation: bounce 2s infinite;
          position: relative;
          top: -5px;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
        
        /* Enhanced Order Steps */
        .order-steps {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          margin-bottom: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .order-steps:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(46, 196, 182, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .order-steps:after {
                   content: '';
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .order-steps h4 {
          color: var(--text-color);
          font-size: 1.6rem;
          margin-bottom:  1.8rem;
          text-align: center;
                   font-weight: 600;
        }
        
        .steps-container {
          position: relative;
          z-index: 2;
        }
        
        .step-item {
                   display: flex;
          align-items: flex-start;
          background: #f9f9f9;
                   padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          transition: var(--transition);
          border-left: 4px solid;
          border-color: var(--secondary-color);
               }
        
               
        .step-item:last-child {
          margin-bottom: 0;
          border-color: var(--primary-color);
        }
        
        .step-item:nth-child(2) {
          border-color: #6A9BD8;
        }
        
        .step-number {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.3rem;
          margin-right: 1.2rem;
          flex-shrink: 0;
          color: white;
        }
        
        .step-item:first-child .step-number {
          background: var(--secondary-color);
          box-shadow: 0 5px 15px rgba(46, 196, 182, 0.3);
        }
        
        .step-item:nth-child(2) .step-number {
          background: #6A9BD8;
          box-shadow: 0 5px 15px rgba(106, 155,216, 0.3);
        }
        
        .step-item:last-child .step-number {
          background: var(--primary-color);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        }
        
        .step-content h5 {
          font-size: 1.2rem;
          margin-bottom: 0.4rem;
          color: var(--text-color);
          font-weight: 600;
        }
        
        .step-content p {
          color: var(--text-light);
          margin: 0;
          font-size: 1rem;
        }
        
        .restaurant-info {
          margin-bottom: 2.5rem;
        }
        
        .info-card {
          display: flex;
          align-items: center;
          background-color: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          transition: var(--transition);
        }
        
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }
        
        .info-icon {
          width: 50px;
          height: 50px;
          background-color: rgba(46, 196, 182, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 1.5rem;
          color: var(--secondary-color);
          font-size: 1.2rem;
          flex-shrink: 0;
          transition: var(--transition);
        }
        
        .info-card:hover .info-icon {
          background-color: var(--secondary-color);
          color: white;
        }
        
        .info-card h4 {
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
          color: var(--text-color);
        }
        
        .info-card p {
          margin: 0;
          color: var(--text-light);
        }
        
        .contact-map {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          border: 6px solid white;
          height: 300px;
        }
        
        .contact-map iframe {
          width: 100%;
          height: 100%;
          display: block;
        }
        
        /* Mobile optimizations */
        @media screen and (max-width: 768px) {
          .phone-order-container {
            flex-direction: column;
            text-align: center;
            padding: 1.8rem 1.5rem;
          }
          
          .phone-order-icon {
            margin-right: 0;
            margin-bottom: 1.5rem;
            width: 80px;
            height: 80px;
            font-size: 1.8rem;
          }
          
          .phone-link-large {
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }
          
          .call-now-badge {
            display: block;
            margin: 0.8rem auto 0;
            width: max-content;
          }
          
          .phone-hours {
            justify-content: center;
            width: max-content;
            margin: 0 auto;
          }
          
          .order-steps {
            padding: 1.5rem;
          }
          
          .step-item {
            padding: 1rem;
          }
          
          .step-number {
            width: 35px;
            height: 35px;
            font-size: 1.1rem;
          }
          
          .step-content h5 {
            font-size: 1rem;
          }
          
          .step-content p {
            font-size: 0.9rem;
          }
        }
        
        @media screen and (max-width: 480px) {
          .phone-link-large {
            font-size: 1.5rem;
          }
          
          .step-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .step-number {
            margin-bottom: 0.8rem;
          }
          
          .info-card {
            flex-direction: column;
            text-align: center;
            padding: 1.2rem;
          }
          
          .info-icon {
            margin: 0 0 1rem 0;
          }
          
          .contact-map {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;