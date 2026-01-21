export default function NotFound() {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-6xl font-bold text-red-800 mb-4">HTTP ERROR - 404</h1>
            <p className="text-xl text-red-600 mb-8">Página não encontrada</p>
            <a href="/" className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">Voltar ao início</a>
        </div>
    )
}