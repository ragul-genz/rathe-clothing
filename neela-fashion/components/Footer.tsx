import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const Footer: React.FC = () => {
  const { contactContent, globalSettings } = useCMS();

  return (
    <footer className="bg-krishna-900 text-white pt-16 pb-24 md:pb-8 border-t border-krishna-800"> 
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              {globalSettings.logoUrl && (
                <img src={globalSettings.logoUrl} alt="Logo" className="h-16 w-auto object-contain bg-white/90 p-1 rounded-md" />
              )}
              <span className="ml-3 font-serif font-bold text-2xl tracking-wider text-white">{globalSettings.siteName || "Radhe Clothing"}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              At Radhe Clothing, we redefine divine grace and contemporary style. Premium handlooms, royal silk sarees, and handcrafted ethnic wear made with love.
            </p>
            <div className="flex space-x-4">
              {globalSettings.instagramUrl && (
                  <a href={globalSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-peacock-400 transition-colors"><Instagram size={20} /></a>
              )}
              {globalSettings.youtubeUrl && (
                  <a href={globalSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-peacock-400 transition-colors"><Youtube size={20} /></a>
              )}
            </div>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gold-400">Links & Policies</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-300 hover:text-peacock-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-slate-300 hover:text-peacock-400 text-sm transition-colors">Shop Collection</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-peacock-400 text-sm transition-colors">Our Story</Link></li>
              <li><Link to="/admin" className="text-gold-400 hover:text-peacock-300 text-sm font-semibold transition-colors flex items-center gap-1.5">🔑 Admin Portal</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-peacock-400 text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-300 hover:text-peacock-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns" className="text-slate-300 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">Refund & Return Policy <span className="text-[9px] bg-peacock-500/20 text-peacock-300 px-1.5 py-0.5 rounded border border-peacock-400/30">Info</span></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gold-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-slate-300 text-sm">
                <MapPin size={18} className="mr-3 mt-0.5 shrink-0 text-peacock-400" />
                <span className="whitespace-pre-wrap">{contactContent.address}</span>
              </li>
              <li className="flex items-center text-slate-300 text-sm">
                <Phone size={18} className="mr-3 shrink-0 text-peacock-400" />
                <span>{contactContent.phone}</span>
              </li>
              <li className="flex items-center text-slate-300 text-sm">
                <Mail size={18} className="mr-3 shrink-0 text-peacock-400" />
                <span>{contactContent.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Updated Copyright */}
        <div className="border-t border-krishna-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center text-center text-slate-400 text-sm gap-4 md:gap-8">
          <p>
            &copy; {new Date().getFullYear()} {globalSettings.siteName || "Radhe Clothing"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
