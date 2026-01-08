import mysql from 'mysql2/promise';

// Membuat koneksi ke database Railway menggunakan Environment Variables dari Vercel
const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Baris ini penting agar koneksi tidak gampang putus di Vercel
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Tes koneksi saat pertama kali dijalankan (opsional, muncul di log Vercel)
try {
    const connection = await db.getConnection();
    console.log("✅ Berhasil terhubung ke Database Railway!");
    connection.release();
} catch (error) {
    console.error("❌ Gagal koneksi database:", error.message);
}

export default db;