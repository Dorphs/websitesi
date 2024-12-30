import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  DocumentTextIcon,
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const services = [
  {
    category: "Ödeme İşlemleri",
    items: [
      {
        name: "Online Ödeme",
        description: "Ziraat Bankası sanal POS ile güvenli ödeme yapın",
        icon: CreditCardIcon,
        url: "/e-hizmetler/odeme",
        isExternal: false
      }
    ]
  },
  {
    category: "Başvuru İşlemleri",
    items: [
      {
        name: "Su Yapıları Denetim ve Yönetim Hizmeti",
        description: "Su yapılarının denetimi ve yönetimi için başvuru yapın",
        icon: BuildingOfficeIcon,
        url: "https://suder.dsi.gov.tr",
        isExternal: true
      },
      {
        name: "Yeraltı Suyu Başvuruları",
        description: "Kuyu açma ve kullanma başvurularınızı yapın",
        icon: DocumentTextIcon,
        url: "/e-hizmetler/yeralti-suyu",
        isExternal: false
      },
      {
        name: "İçmesuyu Başvuruları",
        description: "İçmesuyu temini için başvuru yapın",
        icon: DocumentDuplicateIcon,
        url: "/e-hizmetler/icmesuyu",
        isExternal: false
      }
    ]
  },
  {
    category: "Sorgulama İşlemleri",
    items: [
      {
        name: "Belge Doğrulama",
        description: "DSİ tarafından verilen belgelerin doğruluğunu sorgulayın",
        icon: DocumentMagnifyingGlassIcon,
        url: "/e-hizmetler/belge-dogrulama",
        isExternal: false
      },
      {
        name: "Başvuru Takibi",
        description: "Mevcut başvurularınızın durumunu sorgulayın",
        icon: ClipboardDocumentCheckIcon,
        url: "/e-hizmetler/basvuru-takip",
        isExternal: false
      }
    ]
  },
  {
    category: "Personel İşlemleri",
    items: [
      {
        name: "DSİ Personel Portalı",
        description: "DSİ personeli için özel hizmetler ve bilgiler",
        icon: UserGroupIcon,
        url: "https://personel.dsi.gov.tr",
        isExternal: true
      }
    ]
  }
];

export default function EServices() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            E-Hizmetler
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            DSİ elektronik hizmetlerine buradan erişebilirsiniz
          </p>
        </div>

        <div className="mt-12">
          <Tab.Group selectedIndex={selectedCategory} onChange={setSelectedCategory}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {services.map((category) => (
                <Tab
                  key={category.category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {category.category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-8">
              {services.map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((service) => (
                      <div
                        key={service.name}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <service.icon className="h-10 w-10 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <a
                              href={service.url}
                              target={service.isExternal ? "_blank" : undefined}
                              rel={service.isExternal ? "noopener noreferrer" : undefined}
                              className="focus:outline-none"
                            >
                              <div className="flex items-center justify-between">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-900">
                                  {service.name}
                                </p>
                                {service.isExternal && (
                                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{service.description}</p>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Sık Kullanılan Hizmetler */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Sık Kullanılan Hizmetler
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="/e-hizmetler/yeralti-suyu" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Yeraltı Suyu Başvurusu</p>
                    <p className="text-xs text-gray-500">En çok kullanılan hizmet</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <DocumentMagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="/e-hizmetler/belge-dogrulama" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Belge Doğrulama</p>
                    <p className="text-xs text-gray-500">Hızlı doğrulama</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="/e-hizmetler/basvuru-takip" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Başvuru Takibi</p>
                    <p className="text-xs text-gray-500">Durum sorgulama</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href="https://personel.dsi.gov.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Personel Portalı</p>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500">Personel işlemleri</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
