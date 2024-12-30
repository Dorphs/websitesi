import { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Users() {
  const { users, roles, permissions, addUser, updateUser, deleteUser, updateRole } = useAuth();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    isActive: true,
  });

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser(selectedUser.id, userFormData);
    } else {
      addUser(userFormData);
    }
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setUserFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      isActive: true,
    });
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
    });
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      deleteUser(id);
    }
  };

  const handleRolePermissionChange = (roleId: string, permissionId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role) {
      const newPermissions = role.permissions.includes(permissionId)
        ? role.permissions.filter(p => p !== permissionId)
        : [...role.permissions, permissionId];
      updateRole(roleId, { permissions: newPermissions });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Tab.Group>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Kullanıcı Yönetimi</h1>
            <p className="mt-2 text-sm text-gray-700">
              Kullanıcıları ve rollerini buradan yönetebilirsiniz.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsUserModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Yeni Kullanıcı
            </button>
          </div>
        </div>

        <Tab.List className="mt-8 flex space-x-8 border-b border-gray-200">
          <Tab
            className={({ selected }) =>
              classNames(
                selected
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              )
            }
          >
            Kullanıcılar
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              )
            }
          >
            Yetki Matrisi
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-8">
          <Tab.Panel>
            {/* Kullanıcılar Tablosu */}
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Ad Soyad
                          </th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            E-posta
                          </th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Rol
                          </th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Birim
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
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                              {user.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {roles.find(r => r.id === user.role)?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {user.department}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span
                                className={classNames(
                                  user.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800',
                                  'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                                )}
                              >
                                {user.isActive ? 'Aktif' : 'Pasif'}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                <PencilIcon className="h-5 w-5" />
                                <span className="sr-only">Düzenle</span>
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
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
          </Tab.Panel>

          <Tab.Panel>
            {/* Yetki Matrisi */}
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Yetki / Rol
                          </th>
                          {roles.map((role) => (
                            <th
                              key={role.id}
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                              {role.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {permissions.map((permission) => (
                          <tr key={permission.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                              <div className="font-medium">{permission.name}</div>
                              <div className="text-gray-500">
                                {permission.description}
                              </div>
                            </td>
                            {roles.map((role) => (
                              <td
                                key={role.id}
                                className="whitespace-nowrap px-3 py-4 text-sm text-center"
                              >
                                <button
                                  onClick={() =>
                                    handleRolePermissionChange(role.id, permission.id)
                                  }
                                  className={classNames(
                                    role.permissions.includes(permission.id)
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                                    'inline-flex items-center rounded-full p-1'
                                  )}
                                >
                                  {role.permissions.includes(permission.id) ? (
                                    <CheckIcon className="h-5 w-5" />
                                  ) : (
                                    <XMarkIcon className="h-5 w-5" />
                                  )}
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Kullanıcı Ekleme/Düzenleme Modalı */}
      <Transition.Root show={isUserModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setIsUserModalOpen}
        >
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
                  <form onSubmit={handleUserSubmit}>
                    <div>
                      <div className="mt-3 sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
                        </Dialog.Title>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Ad Soyad
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={userFormData.name}
                                onChange={(e) =>
                                  setUserFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              E-posta
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={userFormData.email}
                                onChange={(e) =>
                                  setUserFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Rol
                            </label>
                            <div className="mt-1">
                              <select
                                id="role"
                                name="role"
                                value={userFormData.role}
                                onChange={(e) =>
                                  setUserFormData((prev) => ({
                                    ...prev,
                                    role: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              >
                                <option value="">Rol Seçin</option>
                                {roles.map((role) => (
                                  <option key={role.id} value={role.id}>
                                    {role.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Birim
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="department"
                                id="department"
                                value={userFormData.department}
                                onChange={(e) =>
                                  setUserFormData((prev) => ({
                                    ...prev,
                                    department: e.target.value,
                                  }))
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <div className="flex items-center">
                              <input
                                id="isActive"
                                name="isActive"
                                type="checkbox"
                                checked={userFormData.isActive}
                                onChange={(e) =>
                                  setUserFormData((prev) => ({
                                    ...prev,
                                    isActive: e.target.checked,
                                  }))
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                htmlFor="isActive"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Aktif
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
                        {selectedUser ? 'Güncelle' : 'Ekle'}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setIsUserModalOpen(false)}
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
