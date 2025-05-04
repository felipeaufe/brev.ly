import { http } from '@/api/api'
import { ButtonIcon } from '@/components/ui/button-icon'
import { useLinkStore } from '@/store/links.store'
import { Copy, Trash } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { toast } from "sonner"

export interface ShortLinkProps {
  shortLink: string
  originalLink: string
  accessCount: number
}

export const ShortLink = ({ shortLink, originalLink, accessCount }: ShortLinkProps) => {

  const { remoteLink } = useLinkStore();

  const handleOnClipboard = () => {
    navigator.clipboard.writeText(`https://brev.ly/${shortLink}`);
    toast.success("Link copiado com sucesso!")
  }

  const handleOnRemove = () => {
    http.shortLink.delete(shortLink).then(() => {
      toast.success("Link removido com sucesso!")
      remoteLink(shortLink)
    }).catch((error) => {
      console.error(error);
      toast.error("Ocorreu um erro ao tentar remover o link.")
    })
  }

  return (
    <div className="flex justify-between items-center py-0.5">
      <Link to={`/${shortLink}`} className='truncate'>
        <p className="text-md text-blue-base mb-1 truncate">brev.ly/{shortLink}</p>
        <p className="text-sm text-gray-500 truncate">{originalLink}</p>
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