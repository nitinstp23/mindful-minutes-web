'use client';

import { useState } from 'react';

const testimonials = [
  {
    name: "Sarah Chen",
    text: "Mindful Minutes transformed my daily routine. I've been consistent with meditation for 6 months now!",
    role: "Software Engineer"
  },
  {
    name: "Michael Torres",
    text: "The simple logging feature keeps me accountable. Love seeing my progress over time.",
    role: "Teacher"
  },
  {
    name: "Emma Williams",
    text: "Finally found a meditation app that's not overwhelming. Clean, simple, and effective.",
    role: "Designer"
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white rounded-3xl p-12 shadow-sm border border-emerald-100">
      <h2 className="text-3xl font-bold text-slate-700 text-center mb-12">
        What Our Users Say
      </h2>
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <blockquote className="text-xl text-slate-700 mb-6 leading-relaxed">
            &ldquo;{testimonials[currentTestimonial].text}&rdquo;
          </blockquote>
          <div className="mb-8">
            <p className="font-semibold text-slate-700">
              {testimonials[currentTestimonial].name}
            </p>
            <p className="text-slate-600">
              {testimonials[currentTestimonial].role}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-emerald-600' : 'bg-emerald-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}