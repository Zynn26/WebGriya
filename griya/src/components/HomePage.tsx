export function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
        <h2 className="mb-4" style={{ color: '#3E2C22' }}>Selamat Datang di MyGriya</h2>
        <p style={{ color: '#5C4A3A' }}>
          MyGriya adalah platform manajemen properti yang memudahkan pengelolaan hunian Anda.
          Dengan sistem terintegrasi, Anda dapat mengakses berbagai layanan dengan mudah dan efisien.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
          <h3 className="mb-3" style={{ color: '#3E2C22' }}>Fitur Utama</h3>
          <ul className="space-y-2" style={{ color: '#5C4A3A' }}>
            <li>• Manajemen akun penghuni</li>
            <li>• Sistem pembayaran terintegrasi</li>
            <li>• Pelaporan dan feedback</li>
            <li>• Notifikasi real-time</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6" style={{ borderColor: '#E5D4C1', borderWidth: '1px' }}>
          <h3 className="mb-3" style={{ color: '#3E2C22' }}>Informasi</h3>
          <p style={{ color: '#5C4A3A' }}>
            Untuk mulai menggunakan layanan, silakan login atau daftar akun baru melalui menu navigasi di sebelah kiri.
          </p>
        </div>
      </div>
    </div>
  );
}
