import { http } from '@/api/api'
import { ButtonIcon } from '@/components/ui/button-icon'
import { env } from '@/env'
import { cn } from '@/lib/utils'
import { useLinkStore, Link as LinkStore } from '@/store/links.store'
import { Copy, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from "sonner"


type ShortLinkProps = LinkStore;

export const ShortLink = ({ code, link, accessCount }: ShortLinkProps) => {

  const [loading, setLoading] = useState(false);
  const { remoteLink } = useLinkStore();

  const handleOnClipboard = () => {
    navigator.clipboard.writeText(`${env.VITE_APP_URL}/${code}`);
    toast.success("Link copiado com sucesso!")
  }

  const handleOnRemove = () => {
    setLoading(true);
    http.shortLink.delete(code)
    .then(() => {
      toast.success("Link removido com sucesso!")
      remoteLink(code)
    })
    .catch((error) => {
      console.error(error);
      toast.error("Ocorreu um erro ao tentar remover o link.")
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className={cn("flex justify-between items-center py-0.5", loading && "opacity-50")}>
      <Link to={`/${code}`} className='truncate'>
        <p className="text-md text-blue-base mb-1 truncate">brev.ly/{code}</p>
        <p className="text-sm text-gray-500 truncate">{link}</p>
      </Link>

      <div className="flex items-center">
        <p className="text-sm mx-5 text-gray-500">
          {accessCount} acesso{accessCount > 1 && 's'}
        </p>

        <div className="flex gap-1">
          <ButtonIcon onClick={handleOnClipboard}>
            <Copy />
          </ButtonIcon>
          <ButtonIcon onClick={handleOnRemove}>
            <Trash />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}