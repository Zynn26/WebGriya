import { useState } from "react";
import {
  Home,
  LogIn,
  UserPlus,
  MessageSquare,
  Settings,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import {
  RoomDetailPage,
  Room,
} from "./components/RoomDetailPage";
import { KelolaKamarPage } from "./components/KelolaKamarPage";

interface UserState {
  isLoggedIn: boolean;
  email: string;
  name: string;
  rentedRoomId: string | null;
}

// ------------------- Login Page -------------------
function LoginPage({
  onNavigateToRegister,
  onLoginSuccess,
}: {
  onNavigateToRegister?: () => void;
  onLoginSuccess?: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login validation
    if (email && password) {
      toast.success("Login berhasil!", {
        description: `Selamat datang kembali, ${email}`,
      });

      const userEmail = email;

      // Reset form
      setEmail("");
      setPassword("");
      // Navigate to home after successful login
      if (onLoginSuccess) {
        setTimeout(() => onLoginSuccess(userEmail), 500);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-[#3E2C22] mb-4">
        Masuk ke MyGriya
      </h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full p-3 rounded-full bg-[#A47551] text-white font-semibold hover:bg-[#8d5f3f] transition-colors"
        >
          Masuk
        </button>
      </form>

      <p className="text-sm text-center text-[#3E2C22]">
        Belum punya akun?{" "}
        <button
          onClick={onNavigateToRegister}
          className="text-[#A47551] font-semibold hover:underline"
        >
          Daftar di sini
        </button>
      </p>
    </div>
  );
}

// ------------------- Registration Page -------------------
function RegistrationPage({
  onRegisterSuccess,
}: {
  onRegisterSuccess?: () => void;
}) {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate registration validation
    if (
      formData.namaLengkap &&
      formData.email &&
      formData.password
    ) {
      toast.success("Registrasi berhasil!", {
        description: `Akun untuk ${formData.namaLengkap} telah dibuat. Silakan login.`,
      });
      // Reset form
      setFormData({
        namaLengkap: "",
        email: "",
        password: "",
      });
      // Navigate to login after successful registration
      if (onRegisterSuccess) {
        setTimeout(() => onRegisterSuccess(), 1000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-[#3E2C22] mb-4">
        Daftar Akun MyGriya
      </h2>

      <form onSubmit={handleRegistration} className="space-y-3">
        <input
          type="text"
          name="namaLengkap"
          placeholder="Nama Lengkap"
          value={formData.namaLengkap}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full p-3 rounded-full bg-[#A47551] text-white font-semibold hover:bg-[#8d5f3f] transition-colors"
        >
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}

// ------------------- Home Page -------------------
const roomsData: Room[] = [
  {
    id: "1",
    name: "Kamar A1",
    price: 1000000,
    size: 12,
    floor: 1,
    description:
      "Kamar nyaman dengan ventilasi baik, lokasi strategis di lantai 1. Cocok untuk mahasiswa atau pekerja profesional. Dekat dengan area parkir dan akses mudah ke fasilitas umum.",
    facilities: [
      "AC",
      "WiFi",
      "Kamar Mandi",
      "Kasur",
      "Lemari",
    ],
    available: true,
  },
  {
    id: "2",
    name: "Kamar B2",
    price: 1200000,
    size: 15,
    floor: 2,
    description:
      "Kamar luas dengan pemandangan taman, dilengkapi AC dan WiFi berkecepatan tinggi. Suasana tenang dan nyaman untuk bekerja atau belajar.",
    facilities: [
      "AC",
      "WiFi",
      "Kamar Mandi",
      "TV",
      "Kasur",
      "Lemari",
      "Meja Kerja",
    ],
    available: true,
  },
  {
    id: "3",
    name: "Kamar C3",
    price: 1500000,
    size: 18,
    floor: 3,
    description:
      "Kamar premium dengan fasilitas lengkap dan view terbaik. Dilengkapi dengan kamar mandi dalam, AC, TV, dan area kerja yang luas. Termasuk akses dapur bersama.",
    facilities: [
      "AC",
      "WiFi",
      "Kamar Mandi",
      "TV",
      "Kasur",
      "Lemari",
      "Meja Kerja",
      "Dapur Bersama",
    ],
    available: false,
  },
];

function HomePage({
  onRoomClick,
}: {
  onRoomClick?: (room: Room) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#3E2C22]">
        Daftar Kamar
      </h2>

      <div className="grid gap-4">
        {roomsData.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl shadow p-5 border border-[#C19A6B] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#3E2C22]">
                  {room.name}
                </h3>
                <p className="text-sm text-[#3E2C22]">
                  Rp {room.price.toLocaleString("id-ID")} /
                  bulan
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  room.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.available ? "Tersedia" : "Penuh"}
              </span>
            </div>
            <p className="text-sm text-[#3E2C22]/70 mb-3 line-clamp-2">
              {room.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onRoomClick?.(room)}
                className="flex-1 bg-[#A47551] text-white px-5 py-2 rounded-full hover:bg-[#8d5f3f] transition-colors"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------- Feedback Page -------------------
function FeedbackPage() {
  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-[#3E2C22] mb-4">
        Kritik & Saran
      </h2>

      <textarea
        placeholder="Tulis kritik dan saran Anda..."
        className="w-full h-40 p-3 rounded-xl border border-[#C19A6B] focus:outline-none"
      ></textarea>

      <button className="w-full p-3 rounded-full bg-[#A47551] text-white font-semibold hover:bg-[#8d5f3f] transition-colors">
        Kirim Feedback
      </button>
    </div>
  );
}

// ------------------- Main App Desktop -------------------
export default function AppDesktop() {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "login"
    | "registrasi"
    | "feedback"
    | "kelola-kamar"
  >("home");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(
    null,
  );
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    email: "",
    name: "",
    rentedRoomId: null,
  });

  const navigateTo = (
    page:
      | "home"
      | "login"
      | "registrasi"
      | "feedback"
      | "kelola-kamar",
  ) => {
    setCurrentPage(page);
    setSelectedRoom(null); // Reset room selection when navigating
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBackFromRoomDetail = () => {
    setSelectedRoom(null);
  };

  const handleLoginSuccess = (email: string) => {
    setUser({
      ...user,
      isLoggedIn: true,
      email: email,
      name: email.split("@")[0],
    });
    navigateTo("home");
  };

  const handlePaymentSuccess = (roomId: string) => {
    setUser({
      ...user,
      rentedRoomId: roomId,
    });
    navigateTo("kelola-kamar");
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      email: "",
      name: "",
      rentedRoomId: null,
    });
    navigateTo("home");
    toast.success("Logout berhasil");
  };

  // Get rented room details
  const rentedRoom = user.rentedRoomId
    ? roomsData.find((r) => r.id === user.rentedRoomId)
    : null;

  return (
    <>
      <Toaster position="top-right" />
      <div
        className="min-h-screen flex"
        style={{
          backgroundColor: "#FDFBF8",
          fontFamily: "Nunito Sans, sans-serif",
        }}
      >
        {/* Sidebar */}
        <aside
          className="w-[260px] flex flex-col justify-between py-6 shadow-xl"
          style={{ backgroundColor: "#A47551" }}
        >
          <div>
            <h1 className="text-2xl font-semibold text-white px-6 mb-8">
              MyGriya
            </h1>

            {/* User Info */}
            {user.isLoggedIn && (
              <div className="px-6 mb-4 pb-4 border-b border-white/20">
                <p className="text-white text-sm opacity-90">
                  Halo,
                </p>
                <p className="text-white truncate">
                  {user.name}
                </p>
              </div>
            )}

            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => navigateTo("home")}
                className={`flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                  currentPage === "home" ? "bg-white/20" : ""
                }`}
              >
                <Home size={18} />
                Home
              </button>

              {!user.isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigateTo("login")}
                    className={`flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                      currentPage === "login"
                        ? "bg-white/20"
                        : ""
                    }`}
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                  <button
                    onClick={() => navigateTo("registrasi")}
                    className={`flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                      currentPage === "registrasi"
                        ? "bg-white/20"
                        : ""
                    }`}
                  >
                    <UserPlus size={18} />
                    Registrasi
                  </button>
                </>
              ) : (
                user.rentedRoomId && (
                  <button
                    onClick={() => navigateTo("kelola-kamar")}
                    className={`flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                      currentPage === "kelola-kamar"
                        ? "bg-white/20"
                        : ""
                    }`}
                  >
                    <Settings size={18} />
                    Kelola Kamar
                  </button>
                )
              )}

              <button
                onClick={() => navigateTo("feedback")}
                className={`flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                  currentPage === "feedback"
                    ? "bg-white/20"
                    : ""
                }`}
              >
                <MessageSquare size={18} />
                Feedback
              </button>

              {user.isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-3 text-left text-white hover:bg-white/10 transition-colors mt-4 border-t border-white/20"
                >
                  <LogIn size={18} className="rotate-180" />
                  Logout
                </button>
              )}
            </nav>
          </div>

          {/* Footer */}
          <div className="px-6 text-white text-sm opacity-70">
            © 2025 MyGriya
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
            <h1
              className="text-xl font-semibold"
              style={{ color: "#3E2C22" }}
            >
              {selectedRoom ? (
                selectedRoom.name
              ) : (
                <>
                  {currentPage === "home" && "Beranda"}
                  {currentPage === "login" && "Login Penghuni"}
                  {currentPage === "registrasi" &&
                    "Registrasi Akun"}
                  {currentPage === "feedback" &&
                    "Kritik & Saran"}
                  {currentPage === "kelola-kamar" &&
                    "Kelola Kamar"}
                </>
              )}
            </h1>
          </header>

          <section className="max-w-4xl mx-auto">
            {selectedRoom ? (
              <RoomDetailPage
                room={selectedRoom}
                onBack={handleBackFromRoomDetail}
                onPaymentSuccess={handlePaymentSuccess}
              />
            ) : (
              <>
                {currentPage === "home" && (
                  <HomePage onRoomClick={handleRoomClick} />
                )}
                {currentPage === "login" && (
                  <LoginPage
                    onNavigateToRegister={() =>
                      navigateTo("registrasi")
                    }
                    onLoginSuccess={handleLoginSuccess}
                  />
                )}
                {currentPage === "registrasi" && (
                  <RegistrationPage
                    onRegisterSuccess={() =>
                      navigateTo("login")
                    }
                  />
                )}
                {currentPage === "feedback" && <FeedbackPage />}
                {currentPage === "kelola-kamar" &&
                  rentedRoom && (
                    <KelolaKamarPage
                      room={rentedRoom}
                      userEmail={user.email}
                    />
                  )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}