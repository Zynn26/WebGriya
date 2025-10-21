import { useState } from 'react';
import { ArrowLeft, Bed, Maximize, Wifi, Wind, Droplet, Tv, UtensilsCrossed } from 'lucide-react';
import { ContactAdminDialog } from './ContactAdminDialog';
import { PaymentFlow } from './PaymentFlow';

export interface Room {
  id: string;
  name: string;
  price: number;
  size: number;
  floor: number;
  description: string;
  facilities: string[];
  available: boolean;
  imageUrl?: string;
}

interface RoomDetailPageProps {
  room: Room;
  onBack: () => void;
  onPaymentSuccess: (roomId: string) => void;
}

export function RoomDetailPage({ room, onBack, onPaymentSuccess }: RoomDetailPageProps) {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const facilityIcons: Record<string, any> = {
    'AC': Wind,
    'WiFi': Wifi,
    'Kamar Mandi': Droplet,
    'TV': Tv,
    'Kasur': Bed,
    'Dapur Bersama': UtensilsCrossed,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#A47551] hover:text-[#8d5f3f] transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Kembali ke Daftar Kamar</span>
      </button>

      {/* Room Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#C19A6B] overflow-hidden">
        {/* Room Image */}
        <div className="w-full h-64 bg-gradient-to-br from-[#E5D4C1] to-[#D4C4B0] flex items-center justify-center">
          <div className="text-center">
            <Bed size={64} className="mx-auto mb-2 text-[#A47551]" />
            <p className="text-[#3E2C22]">Foto Kamar</p>
          </div>
        </div>

        {/* Room Info */}
        <div className="p-8 space-y-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[#3E2C22] mb-2">{room.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-[#A47551]">
                  Rp {room.price.toLocaleString('id-ID')} / bulan
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {room.available ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-[#E5D4C1]">
            <div className="flex items-center gap-3">
              <Maximize size={20} className="text-[#A47551]" />
              <div>
                <p className="text-sm text-[#3E2C22]/60">Luas Kamar</p>
                <p className="text-[#3E2C22]">{room.size} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bed size={20} className="text-[#A47551]" />
              <div>
                <p className="text-sm text-[#3E2C22]/60">Lantai</p>
                <p className="text-[#3E2C22]">Lantai {room.floor}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[#3E2C22] mb-3">Deskripsi</h3>
            <p className="text-[#3E2C22]/80 leading-relaxed">{room.description}</p>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-[#3E2C22] mb-4">Fasilitas</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {room.facilities.map((facility) => {
                const Icon = facilityIcons[facility] || Bed;
                return (
                  <div
                    key={facility}
                    className="flex items-center gap-2 p-3 bg-[#E5D4C1]/30 rounded-lg"
                  >
                    <Icon size={18} className="text-[#A47551]" />
                    <span className="text-sm text-[#3E2C22]">{facility}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowPaymentFlow(true)}
              className="flex-1 py-3 rounded-full bg-[#A47551] text-white hover:bg-[#8d5f3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!room.available}
            >
              {room.available ? 'Pesan Kamar' : 'Kamar Tidak Tersedia'}
            </button>
            <button 
              onClick={() => setShowContactDialog(true)}
              className="px-6 py-3 rounded-full border-2 border-[#A47551] text-[#A47551] hover:bg-[#A47551] hover:text-white transition-colors"
            >
              Hubungi Admin
            </button>
          </div>
        </div>
      </div>

      {/* Contact Admin Dialog */}
      <ContactAdminDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        roomName={room.name}
      />

      {/* Payment Flow */}
      <PaymentFlow
        isOpen={showPaymentFlow}
        onClose={() => setShowPaymentFlow(false)}
        room={room}
        onPaymentSuccess={onPaymentSuccess}
      />
    </div>
  );
}
