import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNews } from '../context/NewsContext';

const slides = [
  {
    id: 1,
    title: 'Türkiye\'nin Su Geleceği',
    description: 'Sürdürülebilir su yönetimi için çalışıyoruz',
    image: '/slides/slide1.jpg',
  },
  {
    id: 2,
    title: 'Modern Sulama Projeleri',
    description: 'Tarımda verimlilik için modern sulama sistemleri',
    image: '/slides/slide2.jpg',
  },
  {
    id: 3,
    title: 'Enerji Üretimi',
    description: 'Temiz enerji için hidroelektrik santralleri',
    image: '/slides/slide3.jpg',
  },
];

const announcements = [
  {
    id: 1,
    title: 'İçme Suyu Projesi İhalesi',
    date: '2024-01-15',
    category: 'İhale',
  },
  {
    id: 2,
    title: 'Sulama Sistemleri Bakım Çalışması',
    date: '2024-01-10',
    category: 'Duyuru',
  },
  {
    id: 3,
    title: 'Yeni HES Projesi Başlatıldı',
    date: '2024-01-05',
    category: 'Haber',
  },
];

const services = [
  {
    id: 1,
    title: 'Su Yönetimi',
    description: 'Sürdürülebilir su kaynakları yönetimi ve planlama',
    icon: '💧',
  },
  {
    id: 2,
    title: 'Sulama Sistemleri',
    description: 'Modern sulama sistemleri kurulumu ve bakımı',
    icon: '🌱',
  },
  {
    id: 3,
    title: 'Enerji Üretimi',
    description: 'Hidroelektrik santralleri ile temiz enerji üretimi',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'İçme Suyu',
    description: 'Kaliteli içme suyu temini ve altyapı çalışmaları',
    icon: '🚰',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const { news } = useNews();

  return (
    <div className="bg-white">
      {/* Hero Section with Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[600px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-xl sm:text-2xl">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Haberler Section */}
      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Haberler ve Duyurular
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Kurumumuzdan en güncel haberler ve duyurular
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {news.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <Link to={`/haber/${item.id}`} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {item.content.length > 150
                          ? `${item.content.substring(0, 150)}...`
                          : item.content}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">DSİ</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/dsi-logo.png"
                        alt="DSİ Logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">DSİ</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString('tr-TR')}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/haberler"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Tüm Haberleri Gör
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Türkiye'nin su kaynaklarını en verimli şekilde kullanmak için çalışıyoruz
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Duyurular ve Haberler
            </h2>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setActiveTab('ihale')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'ihale'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              İhaleler
            </button>
            <button
              onClick={() => setActiveTab('duyuru')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'duyuru'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Duyurular
            </button>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {announcement.category}
                  </span>
                  <time className="text-sm text-gray-500">{announcement.date}</time>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {announcement.title}
                </h3>
                <Link
                  to={`/duyurular/${announcement.id}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Devamını Oku
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
