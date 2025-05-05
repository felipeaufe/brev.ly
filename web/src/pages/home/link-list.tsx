import { Button } from '@/components/ui/button'
import { DownloadSimple, Link } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { ShortLink } from './short-link'
import { http } from '@/api/api'
import { toast } from 'sonner'
import { useLinkStore } from '@/store/links.store'

const LinkList = () => {
  const [loading, setLoading ] = useState(false);
  const { links, setLinks } = useLinkStore();

  useEffect(() => {
    http.shortLink.fetch().then((links) => {
      setLinks(links)
    })
  }, [setLinks])
  
  const handleOnDownload = () => {
    setLoading(true)

    http.shortLink.export().then(({ url }) => {

      window.open(url, '_blank');

      toast.success("Links exportados com sucesso!")
    })
    .catch(error => {
      console.error(error);
      toast.error("Ocorreu um erro ao tentar exportar os links.")
    })
    .finally(() => {
      setLoading(false)
    });

  }

  return (
    <div className="card w-full md:max-w-[580px] md:mt-14">
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg">Meus links</p>
        <Button variant="secondary" onClick={handleOnDownload} disabled={loading}>
          <DownloadSimple /> { loading ? 'Baixando...' : 'Baixar CSV'}
        </Button>
      </div>

      <div>
        {links.map(link => (
          <React.Fragment key={link.code}>
            <hr className="border-gray-200 my-4" />
            <ShortLink {...link} />
          </React.Fragment>
        ))}

        {links.length === 0 && (
          <div className="flex flex-col items-center py-6">
            <p className="text-gray-500 text-center text-xs">
              <Link size={32} className='text-gray-400 mx-auto mb-3' />
              ainda não existem links cadastrados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LinkList
