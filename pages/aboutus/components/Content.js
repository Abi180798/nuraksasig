export default function Content() {
  return (
    <header className="masthead">
      <div className="pl-5 pr-5">
        <div className="mt-5 card card-body" style={{ height: "75vh" }}>
          <div className="card-header">
            <b style={{ fontSize: 40 }}>About Us</b>
          </div>
          <div className="card-body">
            <p>
              Taman Hutan Raya (TAHURA) Nuraksa merupakan satu-satunya Kawasan
              Konservasi di Nusa Tenggara Barat (NTB) yang memiliki potensi
              wisata alam yang menarik untuk dikunjungi dan dinikmati sebagai
              ajang rekreasi. Namun belum banyak wisatawan yang mengetahui
              adanya berbagai wisata yang ada pada TAHURA Nuraksa ini. Sehingga
              perlu adanya sebuah sistem informasi geografis yang memberikan
              informasi terkait wisata-wisata yang ada pada TAHURA Nuraksa.
            </p>
            <p>
              Sistem ini dibangun berupa aplikasi web dan android. Sistem ini
              dirancang agar dapat dikembangkan secara berkelanjutan dan cepat
              dalam menanggapi adanya perubahan dari permintaan user sehingga
              arsitektur yang dipakai yaitu arsitektur microservice dan metode
              pengembangan yang digunakan yaitu extreme programming.
            </p>
            <br />
            <p style={{ textAlign: "right" }}>Sistem Informasi Geografis v1</p>
          </div>
        </div>
      </div>
    </header>
  );
}
