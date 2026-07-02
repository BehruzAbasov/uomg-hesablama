export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 grid grid-cols-12 gap-6">

      {/* LEFT SIDEBAR */}
      <aside className="col-span-3 bg-gray-900 rounded-2xl p-4">
        <h1 className="text-xl font-bold mb-6">🎓 GPA Platform</h1>

        <nav className="space-y-3 text-gray-300">
          <p>Dashboard</p>
          <p>Submit GPA</p>
          <p>Leaderboard</p>
          <p>Group Stats</p>
        </nav>
      </aside>

      {/* CENTER */}
      <main className="col-span-6 space-y-6">

        {/* GPA INPUT CARD */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">GPA qeyd et</h2>

          <input
            placeholder="Ad Soyad"
            className="w-full p-3 mb-3 rounded-lg bg-gray-800"
          />

          <input
            placeholder="Qrup (məs: CS-101)"
            className="w-full p-3 mb-3 rounded-lg bg-gray-800"
          />

          <input
            placeholder="GPA (0 - 4.0)"
            type="number"
            className="w-full p-3 mb-3 rounded-lg bg-gray-800"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg">
            Submit GPA
          </button>
        </div>

        {/* GROUP STATS */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h2 className="font-semibold mb-2">📊 Qrup ortalaması</h2>
          <p className="text-3xl font-bold text-green-400">3.42</p>
        </div>

      </main>

      {/* RIGHT LEADERBOARD */}
      <aside className="col-span-3 bg-gray-900 rounded-2xl p-4">
        <h2 className="font-semibold mb-4">🏆 Live Ranking</h2>

        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>1. Ali</span>
            <span>3.95</span>
          </li>
          <li className="flex justify-between">
            <span>2. Aysel</span>
            <span>3.82</span>
          </li>
          <li className="flex justify-between">
            <span>3. Murad</span>
            <span>3.70</span>
          </li>
        </ul>
      </aside>

    </div>
  );
}