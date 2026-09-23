import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Clock, MoveRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCMS } from '../context/CMSContext';
import { Product } from '../types';

// Marquee Component
const LuxuryMarquee = ({ texts }: { texts: string[] }) => {
    const items = [...texts, "•"];
    
    return (
        <div className="bg-krishna-900 text-peacock-300 py-4 overflow-hidden border-y border-krishna-800 relative z-20 shadow-2xl">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...items, ...items, ...items, ...items].map((text, index) => (
                    <span key={index} className="mx-10 text-xs uppercase tracking-[0.4em] font-bold text-peacock-300">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

const TestimonialSlider = () => {
  const { homeContent } = useCMS();
  const { testimonials } = homeContent;
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) setVisibleCount(1);
          else setVisibleCount(3);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [];
  if (testimonials.length > 0) {
      for (let i = 0; i < visibleCount; i++) {
          visibleTestimonials.push(testimonials[(startIndex + i) % testimonials.length]);
      }
  }

  return (
    <div className="relative w-full">
      {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="bg-white p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center h-full rounded-sm">
                    <div className="flex justify-center mb-4 text-peacock-500">
                        {[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" className="mx-0.5" />)}
                    </div>
                    <div className="mb-6 flex-grow">
                        <p className="font-serif text-krishna-900 italic leading-relaxed">
                            "{t.text}"
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-peacock-100 mb-3 flex items-center justify-center text-xl font-serif text-peacock-700 font-bold">
                        {t.author.charAt(0)}
                    </div>
                    <h4 className="text-xs font-bold text-krishna-900 uppercase tracking-wider">{t.author}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{t.role}</p>
                </div>
            ))}
          </div>
      ) : (
          <div className="text-center text-gray-400">No testimonials available.</div>
      )}

      {testimonials.length > 3 && (
        <div className="flex justify-center mt-12 gap-4">
            <button 
                onClick={prevSlide}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-krishna-800 hover:text-white hover:border-krishna-800 transition-all duration-300"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={nextSlide}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-krishna-800 hover:text-white hover:border-krishna-800 transition-all duration-300"
            >
                <ChevronRight size={20} />
            </button>
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const { products, homeContent } = useCMS();
  const latestProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* Krishna Theme Split Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row pt-24 md:pt-0 bg-white">
         {/* Left Content */}
         <div className="md:w-1/2 bg-gradient-to-br from-krishna-50/80 via-white to-peacock-50/50 flex flex-col justify-center px-8 md:px-20 py-20 relative order-2 md:order-1 z-10">
             <div className="animate-fade-in-up">
                 <span className="text-peacock-700 uppercase tracking-[0.4em] text-xs font-bold mb-6 block relative pl-12">
                    <span className="absolute left-0 top-1/2 h-px w-8 bg-peacock-600"></span>
                    Krishna Grace Collection
                 </span>
                 <h1 className="text-5xl md:text-7xl font-serif text-krishna-900 leading-[1.1] mb-6 font-bold whitespace-pre-line">
                     {homeContent.heroTitle}
                 </h1>
                 <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-md mb-10 border-l-4 border-peacock-500 pl-6">
                     {homeContent.heroSubtitle}
                 </p>
                 
                 <div className="flex flex-wrap gap-5">
                     <Link 
                        to="/shop" 
                        className="bg-krishna-800 text-white border border-krishna-800 px-9 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:bg-peacock-600 hover:border-peacock-600 shadow-md hover:shadow-xl rounded-sm"
                     >
                        Shop Collection
                     </Link>
                     <Link 
                        to="/about" 
                        className="border border-krishna-800 text-krishna-900 px-9 py-4 uppercase tracking-widest text-xs font-bold hover:bg-krishna-800 hover:text-white transition-all duration-300 rounded-sm"
                     >
                        Discover Our Story
                     </Link>
                 </div>
             </div>
         </div>
         
         {/* Right Image */}
         <div className="md:w-1/2 relative h-[50vh] md:h-auto order-1 md:order-2 overflow-hidden group clip-path-slant">
             <img 
                src={homeContent.heroImage}
                alt="Radhe Clothing Hero" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-krishna-900/40 via-transparent to-transparent"></div>
         </div>
      </section>

      <LuxuryMarquee texts={homeContent.marqueeText} />

      {/* Curated Trends - Bento Style */}
      <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-krishna-900 mb-4 font-bold">{homeContent.sectionTitleTrends || "Curated Collections"}</h2>
              <div className="w-24 h-1 bg-peacock-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
              {/* Large Feature */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group rounded-sm cursor-pointer shadow-md">
                  <img src={homeContent.trendImages.large || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000"} alt="Royal Edit" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-krishna-900/90 via-krishna-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                  <div className="absolute bottom-12 left-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-4xl font-serif italic mb-3">The Royal Edit</h3>
                      <Link to="/shop" className="inline-flex items-center text-peacock-300 uppercase tracking-widest text-xs font-bold hover:text-white transition-colors border-b border-peacock-400 pb-1">
                          Explore Collection <MoveRight className="ml-2 w-4 h-4" />
                      </Link>
                  </div>
              </div>

              {/* Top Right */}
              <div className="md:col-span-2 bg-gradient-to-br from-krishna-50 to-peacock-50/30 p-10 flex flex-col justify-center items-start border border-krishna-100 hover:shadow-xl transition-all duration-500 group relative overflow-hidden rounded-sm">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-peacock-100 rounded-full filter blur-3xl opacity-50 -mr-10 -mt-10"></div>
                   <h3 className="text-3xl font-serif text-krishna-900 mb-3 relative z-10 font-bold">Everyday Grace</h3>
                   <p className="text-slate-600 mb-8 text-sm leading-relaxed max-w-xs relative z-10">Comfortable fabrics crafted for casual and festive occasions.</p>
                   <div className="flex gap-4 w-full overflow-hidden relative z-10">
                      <img src={homeContent.trendImages.topRight || "https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=600&q=80"} className="w-24 h-32 object-cover rounded-sm shadow-md transform group-hover:-translate-y-2 transition-transform duration-500" alt="thumb" />
                      <img src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=200&q=80" className="w-24 h-32 object-cover rounded-sm shadow-md transform group-hover:-translate-y-4 transition-transform duration-500 delay-100" alt="thumb" />
                   </div>
              </div>

              {/* Bottom Right */}
              <div className="md:col-span-2 relative overflow-hidden group rounded-sm shadow-md">
                   <img src={homeContent.trendImages.bottomRight || "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800"} alt="Silk" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                   <div className="absolute inset-0 bg-krishna-900/40 group-hover:bg-krishna-900/20 transition-colors duration-500"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                       <div className="border-2 border-white/40 backdrop-blur-md px-8 py-6 text-center transform transition-transform duration-500 group-hover:scale-105 rounded-sm">
                           <h3 className="text-white font-serif text-3xl uppercase tracking-widest font-bold">Silk & Grace</h3>
                           <p className="text-peacock-300 text-xs mt-2 font-bold tracking-[0.2em]">HERITAGE EDITION</p>
                       </div>
                   </div>
              </div>
          </div>
      </section>

      {/* Featured Stripe */}
      <section className="py-24 bg-white relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-krishna-900/20 to-transparent"></div>
          <div className="container mx-auto px-6">
             <div className="flex justify-between items-end mb-12">
                 <h2 className="text-4xl font-serif text-krishna-900">{homeContent.sectionTitleFeatured || "Trending Grace"}</h2>
                 <Link to="/shop" className="text-sm uppercase tracking-widest text-gold-600 hover:text-navy-900 transition-colors flex items-center font-bold">
                    View All <ArrowRight size={16} className="ml-2" />
                 </Link>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                 {latestProducts.map((product, idx) => (
                     <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                        <ProductCard product={product} />
                     </div>
                 ))}
             </div>
          </div>
      </section>

      {/* Luxury Video/Parallax Banner */}
      <section className="relative h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550614000-4b9519e021b9?q=80&w=2000")' }}>
          <div className="absolute inset-0 bg-navy-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900 opacity-80"></div>
          
          <div className="relative z-10 text-center text-white max-w-5xl px-4">
              <div className="mb-6 animate-float">
                <Quote size={40} className="mx-auto text-gold-500 opacity-80" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">"Fashion is the armor to survive the reality of everyday life."</h2>
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm font-bold">— Bill Cunningham</p>
          </div>
      </section>

      {/* Testimonials Section (Carousel) */}
      <section className="py-24 bg-sand-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif text-navy-900">{homeContent.sectionTitleTestimonials || "Voices of Elegance"}</h2>
              <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4"></div>
            </div>
            <TestimonialSlider />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-32 text-center">
            <div className="group cursor-pointer">
               <div className="w-20 h-20 mx-auto rounded-full bg-sand-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <Truck size={28} strokeWidth={1} />
               </div>
               <h4 className="uppercase tracking-widest text-xs font-bold text-navy-900 mb-2">Global Shipping</h4>
               <p className="text-xs text-gray-500">Free over ₹5000</p>
            </div>
            <div className="group cursor-pointer">
               <div className="w-20 h-20 mx-auto rounded-full bg-sand-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <ShieldCheck size={28} strokeWidth={1} />
               </div>
               <h4 className="uppercase tracking-widest text-xs font-bold text-navy-900 mb-2">Secure Checkout</h4>
               <p className="text-xs text-gray-500">256-bit Encryption</p>
            </div>
            <div className="group cursor-pointer">
               <div className="w-20 h-20 mx-auto rounded-full bg-sand-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <Clock size={28} strokeWidth={1} />
               </div>
               <h4 className="uppercase tracking-widest text-xs font-bold text-navy-900 mb-2">24/7 Support</h4>
               <p className="text-xs text-gray-500">Always here for you</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
