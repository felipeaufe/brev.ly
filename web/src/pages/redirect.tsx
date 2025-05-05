import { http } from '@/api/api'
import { useLinkStore } from '@/store/links.store';
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation} from 'react-router'

export function Redirect() {
  const pathName = useLocation().pathname.replace("/", "")
  const { updateCount } = useLinkStore();
  const [ link, setLink ] = useState('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (pathName && !hasFetched.current) {
      hasFetched.current = true;
      updateCount(pathName);

      http.originalLink.get(pathName).then((link) => {
      setLink(link);
      window.location.href = link
     })
    }
  }, [pathName, updateCount])

  return (
    <div className="bg-white self-center md:px-12 px-5 py-12 md:py-16 text-center max-w-[580px] rounded-[.5rem]">
      <img className="mx-auto mb-6" src="/assets/logo-Icon.svg" alt="Logo da brev.ly" />
      <p className="text-xl text-gray-600 mb-6">Redirecionando...</p>
      <p className="text-md text-gray-500 mb-1">
        O link será aberto automaticamente em alguns instantes.
      </p>
      <p className="text-md text-gray-500">
        Não foi redirecionado?{' '}
        <Link to={link} className="underline text-blue-base">
          Acesse aqui
        </Link>
        .
      </p>
    </div>
  )
}
