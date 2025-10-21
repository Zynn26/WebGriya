import { Calendar, CreditCard, Home, Receipt } from 'lucide-react';
import { Room } from './RoomDetailPage';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  method: string;
}

interface KelolaKamarPageProps {
  room: Room;
  userEmail: string;
}

export function KelolaKamarPage({ room, userEmail }: KelolaKamarPageProps) {
  // Mock payment history
  const paymentHistory: Payment[] = [
    {
      id: '1',
      date: '2025-01-15',
      amount: room.price,
      status: 'paid',
      method: 'QRIS',
    },
    {
      id: '2',
      date: '2024-12-15',
      amount: room.price,
      status: 'paid',
      method: 'Transfer Bank',
    },
    {
      id: '3',
      date: '2024-11-15',
      amount: room.price,
      status: 'paid',
      method: 'Virtual Account',
    },
  ];

  // Current month's bill
  const currentBill = {
    dueDate: '2025-02-15',
    amount: room.price,
    status: 'pending' as const,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#A47551] to-[#8d5f3f] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90">Kamar Anda</p>
            <h2 className="text-2xl mb-2">{room.name}</h2>
            <p className="text-sm opacity-90">{userEmail}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <Home size={32} />
          </div>
        </div>
      </div>

      {/* Tagihan Bulan Ini */}
      <div className="bg-white rounded-2xl p-6 shadow border border-[#C19A6B]">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="text-[#A47551]" size={20} />
          <h3 className="text-[#3E2C22]">Tagihan Bulan Ini</h3>
        </div>

        <div className="bg-[#E5D4C1]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#3E2C22]/70">Jatuh Tempo</p>
              <p className="text-[#3E2C22]">{formatDate(currentBill.dueDate)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#3E2C22]/70">Total Tagihan</p>
              <p className="text-2xl text-[#A47551]">
                Rp {currentBill.amount.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-[#3E2C22]/70" />
            <p className="text-sm text-[#3E2C22]/70">
              {new Date(currentBill.dueDate) > new Date()
                ? `${Math.ceil((new Date(currentBill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi`
                : 'Jatuh tempo terlewat'}
            </p>
          </div>

          <button className="w-full py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors">
            Bayar Sekarang
          </button>
        </div>
      </div>

      {/* Fasilitas yang Tersedia */}
      <div className="bg-white rounded-2xl p-6 shadow border border-[#C19A6B]">
        <div className="flex items-center gap-2 mb-4">
          <Home className="text-[#A47551]" size={20} />
          <h3 className="text-[#3E2C22]">Fasilitas yang Tersedia</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {room.facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-[#E5D4C1]/30 rounded-lg"
            >
              <div className="w-2 h-2 bg-[#A47551] rounded-full"></div>
              <span className="text-sm text-[#3E2C22]">{facility}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            ℹ️ Jika ada fasilitas yang rusak atau perlu perbaikan, silakan hubungi admin melalui halaman Feedback
          </p>
        </div>
      </div>

      {/* Riwayat Pembayaran */}
      <div className="bg-white rounded-2xl p-6 shadow border border-[#C19A6B]">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="text-[#A47551]" size={20} />
          <h3 className="text-[#3E2C22]">Riwayat Pembayaran</h3>
        </div>

        <div className="space-y-3">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-[#E5D4C1]/20 rounded-lg hover:bg-[#E5D4C1]/30 transition-colors"
            >
              <div>
                <p className="text-[#3E2C22]">{formatDate(payment.date)}</p>
                <p className="text-sm text-[#3E2C22]/70">{payment.method}</p>
              </div>
              <div className="text-right">
                <p className="text-[#3E2C22]">
                  Rp {payment.amount.toLocaleString('id-ID')}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {payment.status === 'paid' && 'Lunas'}
                  {payment.status === 'pending' && 'Pending'}
                  {payment.status === 'overdue' && 'Terlambat'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {paymentHistory.length === 0 && (
          <div className="text-center py-8 text-[#3E2C22]/60">
            <CreditCard size={48} className="mx-auto mb-2 opacity-30" />
            <p>Belum ada riwayat pembayaran</p>
          </div>
        )}
      </div>
    </div>
  );
}
