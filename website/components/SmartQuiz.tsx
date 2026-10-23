'use client';

import React, { useState } from 'react';
import {
  Bed,
  MapPin,
  Clock,
  DollarSign,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';

interface QuizProps {
  quizData: any;
  transitionData: any;
  lang: 'ru' | 'en' | 'es';
}

export default function SmartQuiz({ quizData, transitionData, lang }: QuizProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    bedrooms: '',
    area: '',
    timeline: '',
    budget: '',
    name: '',
    phone: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.phone && !formData.email)) {
      setErrorMessage(
        lang === 'ru'
          ? 'Пожалуйста, укажите имя и телефон или email для связи'
          : lang === 'es'
          ? 'Por favor ingrese su nombre y teléfono o email'
          : 'Please provide your name and either phone or email'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lang,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to submit form');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = (step / totalSteps) * 100;

  return (
    <section id="findmyhome" className="py-20 bg-[#f7fbfc] border-y border-gray-100 scroll-mt-16 relative">
      <span id="quiz" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transition Text & Button from Original WP */}
        <div className="text-center mb-12 space-y-6">
          <p className="text-[17px] sm:text-[19px] text-[#000000] font-light max-w-2xl mx-auto leading-relaxed">
            {transitionData.text}
          </p>
          <div>
            <a
              href="#quiz-box"
              className="inline-block px-8 py-3.5 bg-[#31312c] hover:bg-[#20c063] text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-md transition-all"
            >
              {transitionData.button}
            </a>
          </div>
        </div>

        {/* Quiz Container with original border-radius: 30px & border-color: #D3D7DA */}
        <div
          id="quiz-box"
          className="bg-white rounded-[30px] p-6 sm:p-12 border border-[#D3D7DA] shadow-xl relative overflow-hidden"
        >
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>
                  {lang === 'ru'
                    ? `Шаг ${step} из ${totalSteps}`
                    : lang === 'es'
                    ? `Paso ${step} de ${totalSteps}`
                    : `Step ${step} of ${totalSteps}`}
                </span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#20c063] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-[#20c063] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#31312c]">
                {quizData.success_title}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {quizData.success_desc}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/13475154087?text=${encodeURIComponent(
                    `Hello Elena, I just submitted the property search request for ${formData.area || 'Miami'}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {lang === 'ru'
                      ? 'Написать в WhatsApp'
                      : lang === 'es'
                      ? 'Contactar por WhatsApp'
                      : 'Chat on WhatsApp'}
                  </span>
                </a>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setFormData({
                      bedrooms: '',
                      area: '',
                      timeline: '',
                      budget: '',
                      name: '',
                      phone: '',
                      email: '',
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 text-gray-600 hover:text-black font-medium text-sm"
                >
                  {lang === 'ru' ? 'Заполнить заново' : lang === 'es' ? 'Comenzar de nuevo' : 'Start over'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Bedrooms */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                      <Bed className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#31312c]">
                      {quizData.step1_title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {quizData.step1_options.map((opt: string, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption('bedrooms', opt)}
                        className={`p-4 rounded-2xl text-left border text-base font-medium transition-all ${
                          formData.bedrooms === opt
                            ? 'bg-emerald-50 border-[#20c063] text-emerald-900 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-gray-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Area */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#31312c]">
                      {quizData.step2_title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {quizData.step2_options.map((opt: string, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption('area', opt)}
                        className={`p-4 rounded-2xl text-left border text-base font-medium transition-all ${
                          formData.area === opt
                            ? 'bg-emerald-50 border-[#20c063] text-emerald-900 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-gray-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Timeline */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#31312c]">
                      {quizData.step3_title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {quizData.step3_options.map((opt: string, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption('timeline', opt)}
                        className={`p-4 rounded-2xl text-left border text-base font-medium transition-all ${
                          formData.timeline === opt
                            ? 'bg-emerald-50 border-[#20c063] text-emerald-900 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-gray-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#31312c]">
                      {quizData.step4_title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {quizData.step4_options.map((opt: string, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption('budget', opt)}
                        className={`p-4 rounded-2xl text-left border text-base font-medium transition-all ${
                          formData.budget === opt
                            ? 'bg-emerald-50 border-[#20c063] text-emerald-900 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-gray-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                      <Send className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#31312c]">
                      {quizData.step5_title}
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {quizData.name_label} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#20c063] focus:bg-white text-gray-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {quizData.phone_label} *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (305) ..."
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#20c063] focus:bg-white text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          {quizData.email_label}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#20c063] focus:bg-white text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#20c063] hover:bg-[#1aa654] disabled:opacity-50 text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>{quizData.submit_button}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'ru' ? 'Назад' : lang === 'es' ? 'Atrás' : 'Back'}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#20c063] hover:text-[#1aa654] transition-colors"
                  >
                    <span>{lang === 'ru' ? 'Далее' : lang === 'es' ? 'Siguiente' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
