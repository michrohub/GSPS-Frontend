import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Careers", path: "#" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Savings Calculator", path: "/calculator" },
        { name: "Tuition Payments", path: "#" },
        { name: "Student Wallet", path: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/support" },
        { name: "Contact Us", path: "#" },
        { name: "Security", path: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "#" },
        { name: "Terms of Service", path: "#" },
        { name: "Cookie Policy", path: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-gsps-blue text-white pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gsps-green/10 rounded-full blur-[100px] -mt-32 -mr-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img
                src="/logo2.png"
                alt="GSPS Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-blue-100/70 text-lg leading-relaxed max-w-sm">
              Empowering international students with transparent, fast, and secure tuition payment solutions globally.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gsps-green transition-colors group">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/50 group-hover:bg-white mask-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-lg mb-6 text-white">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="text-blue-100/60 hover:text-gsps-green transition-colors text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-100/40 text-sm font-medium">
            © {currentYear} Global Students Payment Service (GSPS). All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs font-bold uppercase tracking-widest text-blue-100/40">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gsps-green mr-2 animate-pulse"></span>
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
