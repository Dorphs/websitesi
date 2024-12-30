import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const navigation = {
  main: [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Kurumsal', href: '/kurumsal' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Projeler', href: '/projeler' },
    { name: 'Duyurular', href: '/duyurular' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: FaFacebook },
    { name: 'Twitter', href: '#', icon: FaTwitter },
    { name: 'Instagram', href: '#', icon: FaInstagram },
    { name: 'YouTube', href: '#', icon: FaYoutube },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="text-sm leading-6 text-gray-300">
            <Link to="/iletisim" className="hover:text-white">
              İletişim: Devlet Mahallesi İnönü Bulvarı No:16 06100 Çankaya/ANKARA
            </Link>
          </div>
          <div className="mt-2 text-sm leading-6 text-gray-300">
            <Link to="/tel:+903125551234" className="hover:text-white">
              Tel: (0312) 555 12 34
            </Link>
            {' | '}
            <Link to="/fax:+903125551235" className="hover:text-white">
              Faks: (0312) 555 12 35
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} T.C. Devlet Su İşleri Genel Müdürlüğü. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
