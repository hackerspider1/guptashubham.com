"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Section, SectionHeader, SectionTitle } from '@/components/ui/section';
import { Card } from '@/components/ui/card';

interface Testimonial {
  message: string;
  avatar: string;
  name: string;
  position: string;
}

interface LazyTestimonialsProps {
  testimonials: Testimonial[];
}

const LazyTestimonials = ({ testimonials }: LazyTestimonialsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load the testimonials when they become visible
  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={containerRef}>
      <Section paddingY="none" className="mb-0">
        <div className="py-2 pb-0 sm:pb-4 md:py-8">
          <SectionHeader>
            <SectionTitle>Testimonials</SectionTitle>
          </SectionHeader>
          
          {isLoaded ? (
            <div className='relative'>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                navigation={true}
                speed={1000}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className='testimonials-swiper'
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <Card variant="glass" className="h-auto sm:h-full max-h-[250px] sm:max-h-none overflow-y-auto">
                      <div className="flex flex-col h-full">
                        <p className="text-gray-300 italic mb-4 sm:mb-6 text-sm">{testimonial.message}</p>
                        <div className="flex items-center mt-auto">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px] sm:h-[300px]">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="ml-2">Loading testimonials...</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default LazyTestimonials; 