import { useState } from 'react';
import {
  CreditCardIcon,
  CalendarIcon,
  LockClosedIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  amount: string;
  description: string;
  referenceNumber: string;
}

export default function Payment() {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    amount: '',
    description: '',
    referenceNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Kart numarası formatlaması (4 haneli gruplar)
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    // Son kullanma tarihi formatlaması (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
    }

    // CVV formatlaması (maksimum 3 hane)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    // Tutar formatlaması (maksimum 2 ondalık)
    if (name === 'amount') {
      formattedValue = value.replace(/[^\d.]/g, '');
      const parts = formattedValue.split('.');
      if (parts[1]?.length > 2) {
        parts[1] = parts[1].slice(0, 2);
        formattedValue = parts.join('.');
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Burada Ziraat Bankası Sanal POS API'sine istek atılacak
    console.log('Ödeme işlemi başlatılıyor:', formData);
    // API entegrasyonu eklenecek
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <BuildingLibraryIcon className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Ziraat Bankası Sanal POS</h2>
          </div>
          
          <div className="mt-8">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    Güvenli ödeme sayfasındasınız. Bilgileriniz SSL ile korunmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">
                  Referans Numarası
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="referenceNumber"
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Ödeme Tutarı (TL)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Açıklama
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-md bg-gray-50 p-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <CreditCardIcon className="mr-2 h-5 w-5 text-gray-400" />
                      Kart Numarası
                    </div>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                        Son Kullanma Tarihi
                      </div>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiryDate"
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="AA/YY"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <LockClosedIcon className="mr-2 h-5 w-5 text-gray-400" />
                        CVV
                      </div>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="000"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                    Kart Üzerindeki İsim
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cardHolderName"
                      id="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Ödemeyi Tamamla
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-2">
              <img src="/ziraat-logo.png" alt="Ziraat Bankası" className="h-8" />
              <img src="/ssl-secure.png" alt="SSL Secure" className="h-8" />
              <img src="/3d-secure.png" alt="3D Secure" className="h-8" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
