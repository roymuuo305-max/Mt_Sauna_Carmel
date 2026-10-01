import { ServiceItem, BenefitItem, GalleryItem, Booking, BotanicalHerb, Testimonial, FaqItem } from '../types';
import herbalBoilerImg from '../assets/images/herbal_steam_boiler_1790008606767.jpg';
import therapeuticSessionImg from '../assets/images/therapeutic_session_1790008623323.jpg';

export const BOTANICAL_HERBS: BotanicalHerb[] = [
  {
    id: 'herb-eucalyptus',
    name: 'Blue Eucalyptus',
    botanicalName: 'Eucalyptus globulus',
    localName: 'Mubau',
    aroma: 'Crisp, Camphorous & Invigorating',
    primaryBenefits: ['Opens congested airways', 'Natural antibacterial', 'Mental clarity & alertness'],
    description: 'Fresh organic eucalyptus leaves steam-distilled into our boiler chambers. The active eucalyptol compound acts as a powerful bronchodilator, clearing chest tightness and sinuses instantly.',
    origin: 'Locally cultivated in the high-altitude volcanic soils of Mt. Kenya & Machakos foothills.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-sage',
    name: 'Wild African Sage',
    botanicalName: 'Salvia nilotica',
    localName: 'Muvatha',
    aroma: 'Earthy, Herbaceous & Warm',
    primaryBenefits: ['Anti-inflammatory', 'Soothes sore joints', 'Traditional soothing tonic'],
    description: 'A revered indigenous healing botanical in Kamba and Kikuyu traditions. Inhaling hot vaporized wild sage relaxes constricted smooth muscles and alleviates deep inflammatory aches.',
    origin: 'Wildcrafted from indigenous woodlands bordering Machakos and Eastern Kenya.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-lemongrass',
    name: 'Organic Lemongrass',
    botanicalName: 'Cymbopogon citratus',
    localName: 'Majani Chai',
    aroma: 'Bright Citrus, Sweet & Uplifting',
    primaryBenefits: ['Pore toning & purifying', 'Stress reduction', 'Natural lymph stimulation'],
    description: 'Rich in citral and limonene, fresh crushed lemongrass revitalizes fatigued spirits, calms nervous anxiety, and tones the skin during thermal perspiration.',
    origin: 'Organic organic garden plots harvested daily at sunrise.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-rosemary',
    name: 'Highland Rosemary',
    botanicalName: 'Salvia rosmarinus',
    localName: 'Rosemary',
    aroma: 'Woody, Pine-like & Refreshing',
    primaryBenefits: ['Boosts capillary circulation', 'Eases cognitive fatigue', 'Skin antioxidant'],
    description: 'Fresh sprigs of rosemary stimulate microcirculation throughout peripheral capillaries, aiding muscle recovery while sharpening mental focus and memory.',
    origin: 'Sourced from organic culinary & medicinal farms in Machakos County.',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-mint',
    name: 'Spearmint & Peppermint',
    botanicalName: 'Mentha spicata / piperita',
    localName: 'Nanaa',
    aroma: 'Cooling, Minty & Energizing',
    primaryBenefits: ['Headache & sinus relief', 'Thermal cooling contrast', 'Digestive comfort'],
    description: 'Natural menthol creates a sensational thermal breathing sensation, clearing nasal passages while cooling irritated mucosal membranes inside the warm steam chamber.',
    origin: 'Grown organically beside fresh spring irrigation channels.',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-neem',
    name: 'Sacred Neem Leaves',
    botanicalName: 'Azadirachta indica',
    localName: 'Muwarubaini',
    aroma: 'Earthy, Pungent & Medicinal',
    primaryBenefits: ['Skin detox & anti-acne', 'Immune stimulant', 'Natural antimicrobial'],
    description: 'Known as the "tree of 40 cures" (Muwarubaini), neem vapor purifies the skin dermal layer, drawing out impurities, environmental pollutants, and blemishes.',
    origin: 'Harvested from established indigenous neem trees in Machakos region.',
    image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'herb-lavender',
    name: 'Highland French Lavender',
    botanicalName: 'Lavandula angustifolia',
    localName: 'Lavender',
    aroma: 'Floral, Soothing & Sweet',
    primaryBenefits: ['Induces deep restorative sleep', 'Reduces heart rate & cortisol', 'Tension headache relief'],
    description: 'Linalool compounds in lavender vapor calm the sympathetic nervous system, helping clients release pent-up emotional stress and transition into tranquil slumber.',
    origin: 'Sourced from specialty organic highland flower growers in Kenya.',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'herbal-sauna',
    name: 'Herbal Sauna Session',
    price: 500,
    duration: '45 - 60 mins',
    category: 'sauna',
    tagline: 'Traditional Herbal Detoxification',
    description: 'Authentic Kenyan herbal steam session infused with hand-selected local eucalyptus, wild sage, and mint botanicals to cleanse pores, open airways, and restore vitality.',
    included: [
      'Pure organic herbal steam bath',
      'Fresh spring water hydration',
      'Locker & fresh clean towels',
      'Cool-down lounge relaxation'
    ],
    popular: true,
    image: herbalBoilerImg
  },
  {
    id: 'therapeutic-massage',
    name: 'Therapeutic Session',
    price: 1000,
    duration: '60 mins',
    category: 'massage',
    tagline: 'Deep Muscle & Tension Release',
    description: 'Focused full-body therapeutic session targeting muscular aches, joint stiffness, and physical fatigue administered by experienced local therapists with warm botanical oils.',
    included: [
      'Full body therapeutic session & muscle release',
      'Warm natural essential botanical oils',
      'Targeted pressure point therapy',
      'Post-session herbal tea service'
    ],
    popular: false,
    image: therapeuticSessionImg
  }
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: 'relaxation',
    title: 'Deep Relaxation',
    icon: '🧘',
    shortDesc: 'Relieves chronic stress and calms the central nervous system through natural thermal heat.',
    fullDesc: 'Thermal heat therapy promotes the release of endorphins, our natural "feel-good" hormones. The serene ambient warmth soothes sensory overload, reducing cortisol levels and guiding mind and body into profound meditative calm.',
    keyBenefits: [
      'Lowers cortisol (stress hormone) levels',
      'Alleviates mental fatigue and anxiety',
      'Promotes deeper, higher-quality REM sleep',
      'Calms heart rate and eases breathing'
    ]
  },
  {
    id: 'muscle-recovery',
    title: 'Muscle Recovery',
    icon: '💪',
    shortDesc: 'Soothes sore joints and muscle fatigue, speeding up physical recovery after exercise.',
    fullDesc: 'The penetrating warmth of herbal steam dilates blood vessels, delivering oxygen-rich blood and essential nutrients to tired, inflamed muscle tissues while aiding the rapid clearance of lactic acid build-up.',
    keyBenefits: [
      'Accelerates post-workout muscle repair',
      'Relieves chronic back, neck, and joint pain',
      'Increases muscle elasticity and flexibility',
      'Reduces arthritic stiffness naturally'
    ]
  },
  {
    id: 'detoxification',
    title: 'Detoxification',
    icon: '🌿',
    shortDesc: 'Flushes out skin impurities and promotes healthy skin rejuvenation using organic herbal blends.',
    fullDesc: 'Profuse perspiration opens up congested pores, expelling environmental pollutants, heavy metals, and dead skin cells. Infused indigenous herbs provide antimicrobial and antioxidant benefits directly to the skin.',
    keyBenefits: [
      'Cleanses pores and enhances skin clarity',
      'Extracts built-up toxins through natural perspiration',
      'Stimulates cellular turnover and collagen vitality',
      'Leaves skin glowing, soft, and refreshed'
    ]
  },
  {
    id: 'circulation',
    title: 'Improved Circulation',
    icon: '❤️',
    shortDesc: 'Stimulates blood flow throughout the body to enhance oxygen delivery and cellular vitality.',
    fullDesc: 'As your core temperature rises slightly in the sauna, peripheral blood vessels expand, mimicking the cardiovascular conditioning effect of moderate exercise while gently regulating systemic blood flow.',
    keyBenefits: [
      'Enhances oxygen supply to vital organs',
      'Supports healthy blood pressure balance',
      'Strengthens immune system response',
      'Fosters healthy vascular resilience'
    ]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g-therapeutic',
    title: 'Therapeutic Session',
    category: 'massage',
    categoryLabel: 'Therapeutic Session',
    imageUrl: therapeuticSessionImg,
    caption: 'Authentic therapeutic bodywork and muscle relief session administered with warm botanical oils in our serene Machakos sanctuary.'
  },
  {
    id: 'g-steam-boiler',
    title: 'Herbal Infusion Steam Boiler System',
    category: 'steam',
    categoryLabel: 'Herbal Boiler System',
    imageUrl: herbalBoilerImg,
    caption: 'Our authentic herbal infusion boiler system vaporizing fresh eucalyptus, African wild sage, and mint for deep natural respiratory and skin cleansing.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    author: 'Eng. Patrick Kilonzo',
    location: 'Machakos Town',
    rating: 5,
    comment: 'The herbal steam here is unlike any regular hotel sauna in Nairobi. You can genuinely smell and feel the eucalyptus and traditional herbs opening up your lungs. Highly recommended after a busy week!',
    serviceUsed: 'Herbal Sauna Session',
    date: 'August 2026'
  },
  {
    id: 't-2',
    author: 'Dr. Caroline Mwende',
    location: 'Nairobi (Commuter)',
    rating: 5,
    comment: 'I drive down from Nairobi specifically for the Therapeutic Session. The serenity, clean rooms, and the therapist’s deep tissue work sorted out my chronic lower back stiffness completely.',
    serviceUsed: 'Therapeutic Session',
    date: 'July 2026'
  },
  {
    id: 't-3',
    author: 'Sammy & Joyce Muthama',
    location: 'Kangundo',
    rating: 5,
    comment: 'We booked the herbal sauna for our weekend outing. The genuine eucalyptus steam, peaceful atmosphere, and fresh Eden Springs water made it a truly memorable and relaxing escape.',
    serviceUsed: 'Herbal Sauna Session',
    date: 'August 2026'
  },
  {
    id: 't-4',
    author: 'Brenda Mutisya',
    location: 'Syokimau / Athi River',
    rating: 5,
    comment: 'Affordable, clean, hygienic, and authentic. The staff is polite, and the direct WhatsApp booking was effortless. My skin is still glowing 3 days later!',
    serviceUsed: 'Herbal Sauna Session',
    date: 'August 2026'
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Therapeutic Medium',
    mtCarmel: '100% Organic Medicinal Herb Steam (Eucalyptus, Sage, Mint, Neem)',
    drySauna: 'Dry, arid hot air (No humidity or herb infusion)',
    infrared: 'Infrared electromagnetic light rays (Dry)',
    turkishHammam: 'Hot stone & soapy water scrubbing'
  },
  {
    feature: 'Respiratory Benefits',
    mtCarmel: 'Exceptional (Vaporized botanicals soothe bronchi & sinuses)',
    drySauna: 'Can feel harsh or dry on irritated airways',
    infrared: 'Minimal respiratory clearing',
    turkishHammam: 'Moderate steam'
  },
  {
    feature: 'Skin Hydration & Glow',
    mtCarmel: 'Deep hydration & herbal pore purification',
    drySauna: 'Can dry out sensitive or mature skin',
    infrared: 'Mild surface sweating',
    turkishHammam: 'High exfoliation, soap-based'
  },
  {
    feature: 'Operating Temperature',
    mtCarmel: '45°C – 52°C (Optimal moist comfort)',
    drySauna: '80°C – 100°C (Intense dry heat)',
    infrared: '48°C – 60°C',
    turkishHammam: '40°C – 50°C'
  },
  {
    feature: 'Natural Spring Plunge',
    mtCarmel: 'Pure Eden Springs mineral water contrast',
    drySauna: 'Standard chlorinated cold shower',
    infrared: 'No cooling contrast provided',
    turkishHammam: 'Warm/cool water basins'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'How do I prepare for my first herbal sauna session?',
    answer: 'Drink plenty of water before your arrival. Avoid eating heavy meals within 1 hour of your session. We provide clean towels, private lockers, and pure spring water upon your arrival.',
    category: 'preparation'
  },
  {
    question: 'What is the difference between herbal steam and standard dry sauna?',
    answer: 'Standard dry saunas use arid heat between 80°C–100°C. Mt. Carmel utilizes gentle moist steam (45°C–52°C) continuously infused with fresh medicinal botanicals (Eucalyptus, African Sage, Neem, Lemongrass) that penetrate deeply into the lungs and skin without scorching the airways.',
    category: 'health'
  },
  {
    question: 'Can I walk in or do I need an advance appointment?',
    answer: 'We welcome both walk-in guests and advance online bookings 7 days a week (7:00 AM – 8:00 PM). However, booking in advance ensures your preferred private therapy suite and massage therapist are reserved with zero waiting time.',
    category: 'booking'
  },
  {
    question: 'How often should I undergo herbal steam therapy?',
    answer: 'For general detoxification and stress management, 1 to 2 sessions per week is optimal. Athletes and those seeking recovery from intense physical fatigue or respiratory congestion often benefit from 2 to 3 sessions weekly.',
    category: 'health'
  },
  {
    question: 'Where exactly are you located and is there parking?',
    answer: 'We are situated just 3 km from Machakos Town along the Machakos–Kangundo Road, Kenya. We offer free, secure private on-site parking with 24/7 security.',
    category: 'general'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa (Till / Paybill), Cash, and all major debit/credit cards upon arrival. No advance online payment is required when submitting your reservation.',
    category: 'booking'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    full_name: 'David Mwangi',
    phone: '0712345678',
    email: 'david.mwangi@gmail.com',
    service: 'Therapeutic Session',
    serviceId: 'therapeutic-massage',
    booking_date: '2026-08-21',
    booking_time: '10:00',
    guests: 2,
    special_requests: 'Focus on shoulder and lower back tension.',
    status: 'Confirmed',
    created_at: '2026-08-20T08:15:00Z',
    total_price: 2000
  },
  {
    id: 'BK-1002',
    full_name: 'Faith Mutua',
    phone: '0722998877',
    email: 'faith.mutua@outlook.com',
    service: 'Herbal Sauna Session',
    serviceId: 'herbal-sauna',
    booking_date: '2026-08-21',
    booking_time: '14:30',
    guests: 1,
    special_requests: 'Mild eucalyptus steam preference.',
    status: 'Pending',
    created_at: '2026-08-20T07:45:00Z',
    total_price: 500
  },
  {
    id: 'BK-1003',
    full_name: 'Kevin Mutiso',
    phone: '0704415761',
    email: 'kmutiso@yahoo.com',
    service: 'Therapeutic Session',
    serviceId: 'therapeutic-massage',
    booking_date: '2026-08-20',
    booking_time: '16:00',
    guests: 1,
    special_requests: 'Deep tissue recovery.',
    status: 'Confirmed',
    created_at: '2026-08-19T14:20:00Z',
    total_price: 1000
  },
  {
    id: 'BK-1004',
    full_name: 'Grace Wambua',
    phone: '0727430345',
    email: 'grace.w@gmail.com',
    service: 'Herbal Sauna Session',
    serviceId: 'herbal-sauna',
    booking_date: '2026-08-22',
    booking_time: '11:00',
    guests: 2,
    special_requests: 'Relaxing herbal session for two.',
    status: 'Confirmed',
    created_at: '2026-08-19T11:00:00Z',
    total_price: 1000
  }
];

export const CONTACT_INFO = {
  name: 'Mt. Carmel Herbal Sauna',
  tagline: 'An Oasis of Renewal',
  location: '3 km from Machakos Town along Machakos–Kangundo Road, Kenya',
  phones: ['0704 415 761', '0710 170 316', '0727 430 345'],
  primaryPhoneRaw: '+254704415761',
  email: 'info@mtcarmelsauna.co.ke',
  hours: 'Monday – Sunday: 7:00 AM – 8:00 PM',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.518174545582!2d37.2558!3d-1.5177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f5b66d4999999%3A0x1!2sMachakos!5e0!3m2!1sen!2ske!4v1680000000000'
};
