import { useState, Fragment } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

const pages = [
  {
    id: 1,
    title: 'Hakkımızda',
    slug: 'hakkimizda',
    status: 'Yayında',
    lastModified: '2024-01-15',
  },
  {
    id: 2,
    title: 'Misyon ve Vizyon',
    slug: 'misyon-vizyon',
    status: 'Yayında',
    lastModified: '2024-01-10',
  },
  {
    id: 3,
    title: 'İletişim',
    slug: 'iletisim',
    status: 'Taslak',
    lastModified: '2024-01-05',
  },
]

const statuses = [
  { id: 1, name: 'Yayında' },
  { id: 2, name: 'Taslak' },
]

export default function Pages() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form verilerini işle
    console.log({ ...formData, status: selectedStatus.name })
    setIsModalOpen(false)
    setFormData({ title: '', slug: '', content: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sayfalar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Web sitenizdeki tüm sayfaları buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedPage(null)
              setIsModalOpen(true)
            }}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Yeni Sayfa
          </button>
        </div>
      </div>

      {/* Sayfa Listesi */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Başlık
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      URL
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Durum
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Son Güncelleme
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">İşlemler</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {page.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.slug}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={classNames(
                            page.status === 'Yayında'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800',
                            'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                          )}
                        >
                          {page.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.lastModified}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedPage(page)
                            setFormData({
                              title: page.title,
                              slug: page.slug,
                              content: ''
                            })
                            setSelectedStatus(statuses.find(s => s.name === page.status) || statuses[0])
                            setIsModalOpen(true)
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">Düzenle</span>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
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

      {/* Sayfa Ekleme/Düzenleme Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="mt-3 sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                          {selectedPage ? 'Sayfayı Düzenle' : 'Yeni Sayfa Ekle'}
                        </Dialog.Title>
                        <div className="mt-6 space-y-6">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                              Başlık
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                              URL
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                              İçerik
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="content"
                                name="content"
                                rows={10}
                                value={formData.content}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Durum
                            </label>
                            <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
                                  <span className="block truncate">{selectedStatus.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {statuses.map((status) => (
                                      <Listbox.Option
                                        key={status.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'text-white bg-blue-600' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={status}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selected ? 'font-semibold' : 'font-normal',
                                                'block truncate'
                                              )}
                                            >
                                              {status.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-blue-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                      >
                        {selectedPage ? 'Güncelle' : 'Kaydet'}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
