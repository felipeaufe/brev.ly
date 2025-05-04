import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="bg-white self-center md:px-12 px-5 py-12 md:py-16 text-center max-w-[580px] rounded-[.5rem]">
      <img className="mx-auto mb-6" src="/assets/404.svg" alt="404" />
      <p className="text-xl text-gray-600 mb-6">Link não encontrado</p>
      <p className="text-md text-gray-500">
        O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba
        mais em{' '}
        <Link to="/" className="underline text-blue-base">
          brev.ly
        </Link>
        .
      </p>
    </div>
  )
}
