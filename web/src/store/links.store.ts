import { create } from 'zustand'

export interface Link {
  shortLink: string
  originalLink: string
  accessCount: number
}

type State = {
 links: Link[]
}

type Actions = {
  setLinks: (links: Link[]) => void
  remoteLink: (shortLink: string) => void
  updateCount: (shortLink: string) => void
}

export const useLinkStore = create<State & Actions>((set) => ({
  links: [
    {
      shortLink: 'Portfolio-Dev',
      originalLink: 'devsite.portfolio.com.br/devname-123456',
      accessCount: 30,
    },
    {
      shortLink: 'Linkedin-Profile',
      originalLink: 'linkedin.com/in/myprofile',
      accessCount: 15,
    },
    {
      shortLink: 'Github-Project',
      originalLink: 'github.com/devname/project-name-v2',
      accessCount: 34,
    },
    {
      shortLink: 'Figma-Encurtador-de-Links',
      originalLink: 'figma.com/design/file/Encurtador-de-Links',
      accessCount: 53,
    },
  ],
  setLinks: (links: Link[]) => set({ links }),
  remoteLink: (shortLink: string) => set((state) => ({
    links: state.links.filter(link => link.shortLink !== shortLink)
  })),
  updateCount: (shortLink: string) => set((state) => ({
    links: state.links.map(link => link.shortLink === shortLink ? { ...link, accessCount: link.accessCount + 1 } : link)
  }))
}))