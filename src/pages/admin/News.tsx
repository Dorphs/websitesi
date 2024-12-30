import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  isPublished: boolean;
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: 'Su Tasarrufu Kampanyası Başlatıldı',
    content: 'DSİ olarak su tasarrufuna dikkat çekmek için yeni bir kampanya başlattık...',
    image: 'https://example.com/image1.jpg',
    date: '2024-01-01',
    isPublished: true,
  },
  {
    id: 2,
    title: 'Yeni Baraj Projesi Onaylandı',
    content: 'X ilinde yapılacak olan yeni baraj projemiz Çevre Bakanlığı tarafından onaylandı...',
    image: 'https://example.com/image2.jpg',
    date: '2024-01-15',
    isPublished: false,
  },
];

export default function News() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    date: '',
    isPublished: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNews) {
      // Güncelleme işlemi
      setNews(prev =>
        prev.map(item =>
          item.id === selectedNews.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      // Yeni haber ekleme
      const newId = Math.max(...news.map(item => item.id), 0) + 1;
      setNews(prev => [...prev, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
    setSelectedNews(null);
    setFormData({
      title: '',
      content: '',
      image: '',
      date: '',
      isPublished: false,
    });
  };

  const handleEdit = (item: NewsItem) => {
    setSelectedNews(item);
    setFormData({
      title: item.title,
      content: item.content,
      image: item.image,
      date: item.date,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu haberi silmek istediğinize emin misiniz?')) {
      setNews(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Haberler</h1>
          <p className="mt-2 text-sm text-gray-700">
            Kurumsal haberleri buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Yeni Haber
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Başlık
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tarih
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Durum
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">İşlemler</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {news.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            item.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.isPublished ? 'Yayında' : 'Taslak'}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">Düzenle</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                          <span className="sr-only">Sil</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="mt-3 sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {selectedNews ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}
                        </Dialog.Title>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Başlık
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="content"
                              className="block text-sm font-medium text-gray-700"
                            >
                              İçerik
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="content"
                                name="content"
                                rows={4}
                                value={formData.content}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    content: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="image"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Görsel URL
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="image"
                                id="image"
                                value={formData.image}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    image: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Tarih
                            </label>
                            <div className="mt-1">
                              <input
                                type="date"
                                name="date"
                                id="date"
                                value={formData.date}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    date: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="flex items-center h-full">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.isPublished}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      isPublished: e.target.checked,
                                    }))
                                  }
                                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  Yayınla
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        {selectedNews ? 'Güncelle' : 'Ekle'}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setIsModalOpen(false)}
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
